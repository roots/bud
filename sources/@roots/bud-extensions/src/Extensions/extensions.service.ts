import {
  Extension,
  Extensions as Base,
  Framework,
  Service,
} from '@roots/bud-framework'

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
export class Extensions extends Service implements Base {
  /**
   * Extensions queued for registration
   *
   * @public
   */
  public queue = []

  /**
   * Controller factory
   *
   * @public
   */
  public makeController(
    extension: Extension.Module | Promise<Extension.Module>,
  ): Controller {
    const controller = new Controller(this.app, extension)
    return controller
  }

  @bind
  public async setController(extension: Extension.Module): Promise<void> {
    const controller = this.makeController(extension)
    this.set(controller.name, controller)
  }

  /**
   * @override
   * @public
   */
  @bind
  public async booted(): Promise<void> {
    /**
     * Handle in-built extensions
     */
    await Promise.all(
      this.getEntries().map(async ([key, extension]) => {
        this.setController(extension)
        this.log('success', {message: `${key} instantiated`})
      }),
    )

    await this.registerExtensions()
    await this.bootExtensions()
    await this.injectExtensions()
  }

  /**
   * Inject extension modules
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async injectExtensions() {
    if (this.app.store.is('features.inject', false)) {
      this.log('log', 'injection disabled')
      return
    }

    try {
      const modules = Object.values(this.app.project.peers.modules)
        .filter(Boolean)
        .filter(({bud}) => bud?.type === 'extension')

      await Promise.all(
        modules.map(async record => {
          await this.importExtension(record)
        }),
      )

      await modules.reduce(async (promised: Promise<void>, record) => {
        await promised
        await this.registerExtension(this.get(record.name))
      }, Promise.resolve())

      await modules.reduce(async (promised, record) => {
        await promised
        await this.bootExtension(this.get(record.name))
      }, Promise.resolve())
    } catch (e) {
      this.app.error(e)
    }
  }

  @bind
  public async importExtension(
    extension: Record<string, any>,
  ): Promise<void> {
    this.log('log', `importing ${extension.name}`)
    const importedModule = await import(extension.name)
    const importedExtension: Extension.Module = importedModule.default
      ? importedModule.default
      : importedModule

    if (this.has(importedExtension.name)) return
    await this.setController(importedExtension)
  }

  /**
   * @public
   */
  @bind
  public async registerExtension(extension: Controller): Promise<void> {
    try {
      if (!extension) return
      this.app.log('registering', extension.name)

      await extension.mixin()
      await extension.api()
      await extension.register()
    } catch (err) {
      this.app.log(extension)
      throw new Error(err)
    }
  }

  /**
   * @public
   */
  @bind
  public async bootExtension(extension: Controller): Promise<void> {
    try {
      if (!extension) return
      this.app.log('booting', extension.name)

      await extension.boot()
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * @public
   */
  @bind
  public async registerExtensions(): Promise<void> {
    this.log('time', 'registering')

    await this.getEntries().reduce(
      async (promised, [_key, controller]) => {
        await promised
        await this.registerExtension(controller)
      },
      Promise.resolve(),
    )

    this.log('timeEnd', 'registering')
  }

  /**
   * @public
   */
  @bind
  public async bootExtensions(): Promise<void> {
    this.log('time', 'booting')
    await this.getEntries().reduce(async (promised, [key, controller]) => {
      await promised
      await this.bootExtension(controller)
    }, Promise.resolve())

    this.log('timeEnd', 'booting')
  }

  /**
   * Add a {@link Controller} to the container
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async add(extension: Extension.Module): Promise<void> {
    if (this.has(extension.name)) {
      this.log('info', `${extension.name} already exists. skipping.`)
      return
    }

    await this.setController(extension)
    await this.registerExtension(this.get(extension.name))
    await this.bootExtension(this.get(extension.name))
  }

  /**
   * Queue an extension to be added to the container before the build process.
   *
   * @remarks
   * Useful for extensions which cannot be added in an awaitable context (like a user config)
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public enqueue(extension: Extension.Module): Framework {
    this.queue.push(extension)
    return this.app
  }

  /**
   * @public
   */
  @bind
  public async processQueue(): Promise<void> {
    if (!this.queue.length) return
    await Promise.all(this.queue.map(this.add))
    this.queue = []
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
  public async make(): Promise<
    {
      [key: string]: any
      apply: CallableFunction
    }[]
  > {
    this.log('time', 'extensions.make')

    await this.processQueue()

    const plugins = this.getValues()
      .filter(controller => controller._module.make)
      .map((controller: Controller) => {
        const result = controller.make()

        if (!result) {
          this.log(
            'log',
            `${controller.name} will not be used in the compilation`,
          )

          return result
        }

        this.log(
          'success',
          `${controller.name} will be used in the compilation`,
        )

        return result
      })
      .filter(Boolean)

    this.log('timeEnd', 'extensions.make')

    return plugins
  }
}
