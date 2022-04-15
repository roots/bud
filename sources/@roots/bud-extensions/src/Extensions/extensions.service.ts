import * as Framework from '@roots/bud-framework'

import {Controller} from '../Controller'
import {bind} from './extensions.dependencies'

/**
 * Extensions Service
 *
 * @remarks
 * Manages extension controllers
 *
 * @public
 */
export class Extensions
  extends Framework.ContainerService<Controller>
  implements Framework.Extensions.Service
{
  /**
   * Controller factory
   * @public
   */
  public makeController(
    extension:
      | Framework.Module
      | (new () => Framework.Extension.Extension),
  ): Controller {
    return new Controller(this.app, extension)
  }

  @bind
  public async setController(
    extension:
      | Framework.Module
      | (new () => Framework.Extension.Extension),
  ): Promise<Controller> {
    const controller = this.makeController(extension)
    this.set(controller.label, controller)
    return controller
  }

  /**
   * `booted` callback
   *
   * @override
   * @public
   */
  @bind
  public async booted(): Promise<void> {
    await Promise.all(this.getValues().map(this.setController))
    await this.injectExtensions()
    await this.registerAll()
    await this.bootAll()
  }

  /**
   * Inject extension modules
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async injectExtensions() {
    if (this.app.hooks.filter('feature.inject') === false) {
      this.app.log('injection disabled')
      return
    }

    try {
      await Promise.all(
        Object.values(this.app.project.peers.modules ?? {})
          .filter(Boolean)
          .filter(({bud}) => bud?.type === 'extension')
          .map(async record => {
            await this.import(record)
          }),
      )
    } catch (e) {
      this.app.error(e)
    }
  }

  @bind
  public async import(
    extension: Record<string, any> | string,
  ): Promise<void> {
    const pkgName =
      typeof extension !== 'string' ? extension.name : extension
    if (this.has(pkgName)) return
    this.app.log('importing', pkgName)

    const importedModule = await import(pkgName)
    const importedExtension: Framework.Module = importedModule.default
      ? importedModule.default
      : importedModule

    await this.setController(importedExtension)
  }

  /**
   * @public
   */
  @bind
  public async controllerRegister(controller: Controller): Promise<void> {
    if (!controller) return
    try {
      await controller.register()
    } catch (err) {
      this.app.log(controller)
      this.app.error(err)
    }
  }

  /**
   * @public
   */
  @bind
  public async controllerBoot(controller: Controller): Promise<void> {
    if (!controller) return
    try {
      await controller.boot()
    } catch (err) {
      this.app.log(controller)
      this.app.error(err)
    }
  }

  /**
   * @public
   */
  @bind
  public async registerAll(): Promise<void> {
    await this.getEntries().reduce(
      async (promised, [_key, controller]) => {
        await promised
        await this.controllerRegister(controller)
      },
      Promise.resolve(),
    )
  }

  /**
   * @public
   */
  @bind
  public async bootAll(): Promise<void> {
    await this.getEntries().reduce(async (promised, [key, controller]) => {
      await promised
      await this.controllerBoot(controller)
    }, Promise.resolve())
  }

  /**
   * Add a {@link Controller} to the container
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async add(
    extension:
      | Framework.Module
      | Array<Framework.Module | (new () => Framework.Extension.Extension)>
      | (new () => Framework.Extension.Extension),
  ): Promise<void> {
    const arrayed = Array.isArray(extension) ? extension : [extension]

    await Promise.all(
      arrayed.map(async extension => {
        try {
          if (typeof extension === 'function') {
            const controller = await this.setController(extension)
            await this.controllerRegister(this.get(controller.label))
            await this.controllerBoot(this.get(controller.label))
            return
          }

          if (this.has(extension.label)) {
            this.app.log(`${extension.label} already exists. skipping.`)
            return
          }

          await this.setController(extension)
          await this.controllerRegister(this.get(extension.label))
          await this.controllerBoot(this.get(extension.label))
        } catch (err) {
          this.app.error(err)
        }
      }),
    )
  }

  /**
   * Returns an array of plugin instances which have been registered to the
   * container and are set to be used in the compilation
   *
   * @returns An array of plugin instances
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async make(): Promise<Framework.Extension.PluginInstance[]> {
    return this.getValues()
      .filter(controller => controller._module.make)
      .map((controller: Controller) => {
        const result = controller.make()
        if (!result) return
        controller.logger.success(`will be used in the compilation`)
        return result
      })
      .filter(Boolean)
  }
}
