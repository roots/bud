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
        this.log('success', `${key} instantiated`)
      }),
    )

    this.log('timeEnd', 'instantiating built-ins')
  }

  /**
   * @override @public
   */
  @bind
  public async boot(): Promise<void> {
    if (!this.app.isRoot) return
    if (this.app.store.is('inject', false)) {
      this.log('info', 'injection disabled')
      return
    } else {
      this.log('info', `extension injection enabled`)
    }

    this.log('time', 'injecting project extensions')
    await Promise.all(
      this.app.project.getKeys('extensions').map(async pkg => {
        const importResult = await import(pkg)

        this.log('success', `${importResult.name} resolved`)
        const tuples = Object.entries(importResult)

        tuples.forEach(([key, value], i) => {
          this.log(
            'info',
            `[${i + 1}/${tuples.length}]`,
            `${key}`,
            value,
          )
        })

        const controller = await this.makeController(
          importResult,
        )
        if (this.get(importResult) instanceof Controller)
          this.log(
            'success',
            `${importResult.name} added to container`,
          )

        this.set(controller.name, controller)
      }),
    )

    this.log('timeEnd', 'injecting project extensions')
  }

  @bind
  public async booted(_app: Framework.Framework): Promise<void> {
    await this.registerExtensions()
    await this.bootExtensions()
  }

  @bind
  public async registerExtension(key: string): Promise<void> {
    try {
      const controller = this.get<Controller>(key)
      await controller.register()

      this.log('success', `${key} registered`)
    } catch (err) {
      this.log('error', key, err)
    }
  }

  @bind
  public async bootExtension(key: string): Promise<void> {
    try {
      const controller = this.get<Controller>(key)
      await controller.boot()
      this.log('success', `${key} booted`)
    } catch (err) {
      this.log('error', err, key)
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
   * Add a {@link Controller} to the container
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async add(
    extension: Framework.Extension.Module,
  ): Promise<void> {
    if (this.has(extension.name)) {
      this.log(
        'warn',
        `${extension.name} already added. skipping.`,
      )
      return
    }

    const controller = await this.makeController(extension)
    this.log('await', '[1/3]', controller.name, 'instantiated')
    await controller.register()
    this.log('await', '[2/3]', controller.name, 'registered')
    await controller.boot()
    this.log('await', '[3/3]', controller.name, 'booted')

    this.set(controller.name, controller)

    this.log(
      'success',
      controller.name,
      'added to extensions container',
    )
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
  public make(): {
    [key: string]: any
    apply: CallableFunction
  }[] {
    this.log('time', 'extensions.make')

    const plugins = this.getValues()
      .map((controller: Controller) => {
        return controller.make()
      })
      .filter(Boolean)

    this.log('timeEnd', 'extensions.make')

    return plugins
  }
}
