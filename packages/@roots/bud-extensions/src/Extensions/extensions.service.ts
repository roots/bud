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
  extends Framework.Service
  implements Framework.Extensions
{
  public queue = []

  public repository = {}

  /**
   * Controller factory
   *
   * @public
   */
  @bind
  public makeController(
    extension:
      | Framework.Extension.Module
      | Promise<Framework.Extension.Module>,
  ): Controller {
    const controller = new Controller(this.app, extension)
    return controller
  }

  /**
   * @override @public
   */
  @bind
  public async registered(): Promise<void> {
    this.log('time', 'instantiating built-ins')

    await Promise.all(
      this.getEntries().map(async ([key, extension]) => {
        this.set(key, this.makeController(extension))
        this.log('success', {
          message: `${key} instantiated`,
        })
      }),
    )

    this.log('timeEnd', 'instantiating built-ins')
  }

  /**
   * @override @public
   */
  @bind
  public async boot(): Promise<void> {
    if (
      this.app.store.is('features.inject', false) ||
      !this.app.project?.has('extensions')
    ) {
      this.log('log', 'injection disabled')
      return
    } else {
      this.log('log', `extension injection enabled`)
    }

    this.log('await', 'injecting project extensions')

    await Promise.all(
      this.app.project.getKeys('extensions').map(async pkg => {
        const importResult = await import(pkg)

        this.log('success', {
          message: `${importResult.name} resolved`,
        })

        const controller = await this.makeController(
          importResult,
        )

        this.set(controller.name, controller)
      }),
    )
  }

  /**
   * @public
   */
  @bind
  public async booted(): Promise<void> {
    await this.registerExtensions()
    await this.bootExtensions()
  }

  /**
   * @public
   */
  @bind
  public async registerExtension(key: string): Promise<void> {
    try {
      const controller = this.get<Controller>(key)
      await controller.register()
    } catch (err) {
      this.log('error', key, err)
      throw new Error(err)
    }
  }

  /**
   * @public
   */
  @bind
  public async bootExtension(key: string): Promise<void> {
    try {
      const controller = this.get<Controller>(key)
      await controller.boot()
    } catch (err) {
      this.log('error', err, key)
      throw new Error(err)
    }
  }

  /**
   * @public
   */
  @bind
  public async registerExtensions(): Promise<void> {
    this.log('time', 'registering')
    await Promise.all(this.getKeys().map(this.registerExtension))
    this.log('timeEnd', 'registering')
  }

  /**
   * @public
   */
  @bind
  public async bootExtensions(): Promise<void> {
    this.log('time', 'booting')
    await Promise.all(this.getKeys().map(this.bootExtension))
    this.log('timeEnd', 'booting')
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
  public enqueue(
    extension: Framework.Extension.Module,
  ): Framework.Framework {
    if (
      this.has(extension.name) ||
      this.queue.some(queued => queued.name === extension.name)
    ) {
      this.log(
        'warn',
        `${extension.name} already added. skipping.`,
      )
      return
    }

    this.queue.push(extension)

    return this.app
  }

  /**
   * Add a {@link Controller} to the container
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async add(
    extension: Framework.Extension.Module,
  ): Promise<void> {
    if (
      this.app.project
        .get('missingExtensions')
        .includes(extension.name)
    ) {
      this.log('error', `${extension.name} is missing`)
    }

    if (this.has(extension.name)) {
      this.log('warn', {
        message: `${extension.name} already added. skipping.`,
      })
      return
    }

    const controller = this.makeController(extension)

    await controller.register()

    await controller.boot()

    this.set(controller.name, controller)
  }

  /**
   * @public
   */
  @bind
  public async processQueue(): Promise<void> {
    if (!this.queue.length) return

    this.queue = await Promise.all(
      this.queue.map(async extension => {
        await (this.app as any).use(extension)
      }),
    )

    this.queue = []
  }

  /**
   * Returns an array of plugin instances which have been registered to the
   * Extensions container and are set to be used in the compilation
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

    this.app.dump(this.getKeys())

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
