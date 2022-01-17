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
  public queue = []

  public repository = {}

  /**
   * Controller factory
   *
   * @public
   */
  @bind
  public makeController(
    extension: Extension.Module | Promise<Extension.Module>,
  ): Controller {
    const controller = new Controller(this.app, extension)
    return controller
  }

  /**
   * @override
   * @public
   */
  @bind
  public async boot(): Promise<void> {
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

    if (this.app.project.peers.hasMissingDependencies) {
      this.log(
        'error',
        'missing dependencies in project. not booting extensions.',
      )
      return
    }

    try {
      const modules = this.app.project.peers.adjacents
        .fromRoot('root')
        .filter(Boolean)
        .filter(({bud}) => bud?.type === 'extension')
        .map(({name}) => name)

      await Promise.all(
        modules.map(async name => {
          await this.importExtension(name)
        }),
      )

      await modules.reduce(async (promised, name) => {
        await promised
        await this.registerExtension(this.get(name))
      }, Promise.resolve())

      await modules.reduce(async (promised, name) => {
        await promised
        await this.bootExtension(this.get(name))
      }, Promise.resolve())
    } catch (e) {
      this.app.error(e)
    }
  }

  @bind
  public async importExtension(extension: string): Promise<void> {
    this.log('log', `importing ${extension}`)
    const importedExt = await import(extension)

    if (this.has(importedExt)) return
    await this.setController(importedExt)
    return this.get(importedExt.name)
  }

  @bind
  public async setController(extension): Promise<void> {
    const controller = this.makeController(extension)
    this.set(controller.name, controller)
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

    await this.getEntries().reduce(async (promised, [key, controller]) => {
      await promised
      await this.registerExtension(controller)
    }, Promise.resolve())

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
