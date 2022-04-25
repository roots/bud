import {
  Extension,
  Extensions as Contract,
  Modules,
  Service,
} from '@roots/bud-framework'
import {Controllers} from '@roots/bud-framework/types/registry'
import {bind} from '@roots/bud-support'

import {Controller} from '../Controller'

/**
 * Extensions Service
 *
 * @remarks
 * Manages extension controllers
 *
 * @public
 */
export class Extensions extends Service implements Contract.Service {
  public repository: Controllers = {}

  @bind
  public has<K extends keyof Controllers & string>(
    key: K & string,
  ): boolean {
    return this.repository[key] ? true : false
  }

  @bind
  public get<K extends keyof Controllers & string>(
    key: K,
  ): Controllers[K] {
    return this.repository[key]
  }

  @bind
  public remove<K extends keyof Controllers & string>(key: K): this {
    delete this.repository[key]
    return this
  }

  @bind
  public set<K extends keyof Controllers & string>(
    key: K & string,
    value: Controllers[K],
  ): this {
    this.app.log(`setting controller: ${key}`, value.module)
    this.repository[key] = value
    return this
  }

  @bind
  public makeController<K extends keyof Controllers & string>(
    extension: Modules[K],
  ): Controller {
    return new Controller(this.app).setModule(extension)
  }

  @bind
  public setController<K extends keyof Controllers & string>(
    controller: Controllers[K],
  ): this {
    if (this.has(controller.module.label)) {
      this.get(controller.module.label)
        .get('logger')
        .info(`this controller has already been set`)
    } else this.set(controller.module.label, controller)

    return this
  }

  @bind
  public async booted(): Promise<void> {
    this.app.options.extensions
      .map(this.makeController)
      .map(this.setController)

    await this.injectExtensions()
    await this.withAllControllers('init')
    await this.withAllControllers('register')
    await this.withAllControllers('boot')
  }

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
          .map(this.import),
      )
    } catch (e) {
      this.app.error(e)
    }
  }

  @bind
  public async import(
    input: Record<string, any> | string,
  ): Promise<Controller> {
    const pkgName = typeof input !== 'string' ? input.name : input
    if (this.has(pkgName)) return
    this.app.log('importing', pkgName)

    const imported = await import(pkgName)
    const extension: Extension = imported.default
      ? imported.default
      : imported

    const controller = this.makeController(extension)
    if (this.has(controller.module.label)) return
    this.set(controller.module.label, controller)

    return controller
  }

  @bind
  public async withController<
    K extends `${keyof Controllers & string & string}`,
  >(
    controller: Controllers[K],
    methodName: 'init' | 'register' | 'boot',
  ): Promise<this> {
    if (!controller) return

    try {
      await controller[methodName]()
      return this
    } catch (err) {
      this.app.log(controller)
      this.app.error(err)
    }
  }

  /**
   * @public
   */
  @bind
  public async withAllControllers(
    methodName: 'init' | 'register' | 'boot',
  ): Promise<Array<void>> {
    return Promise.all(
      Object.values(this.repository).map(async controller => {
        await this.withController(controller, methodName)
      }),
    )
  }

  /**
   * Add a {@link Controller} to the container
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async add(input: Extension | Array<Extension>): Promise<void> {
    const arrayed = Array.isArray(input) ? input : [input]

    await arrayed.reduce(async (promised, extension) => {
      await promised

      try {
        const controller = this.makeController(extension)
        this.setController(controller)

        if (controller.module.dependsOn?.size > 0) {
          for (const name in controller.module.dependsOn) {
            if (this.has(name)) {
              controller.module.logger.info({
                prefix: `skipping dependency import`,
                message: `${name} has already been imported`,
              })
              return
            }

            const dependency = await this.app.module.import(name)

            !dependency
              ? controller.module.logger.warn(`${dependency} import?`)
              : await this.add(dependency)
          }
        }

        await this.withController(controller, 'init')
        await this.withController(controller, 'register')
        await this.withController(controller, 'boot')

        return true
      } catch (err) {
        this.app.error(err)
        return false
      }
    }, Promise.resolve(true))
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
  public async make(): Promise<Extension.PluginInstance[]> {
    return await Promise.all(
      Object.values(this.repository).map(
        async (controller: Controller) => {
          const result = await controller.make()
          if (!result) return
          controller.module.logger.success(
            `will be used in the compilation`,
          )
          return result
        },
      ),
    ).then(res => res.filter(Boolean))
  }
}
