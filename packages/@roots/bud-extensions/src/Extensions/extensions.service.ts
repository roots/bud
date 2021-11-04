import * as Framework from '@roots/bud-framework'

import {Controller} from '../Controller'
import {bind} from './extensions.dependencies'

/**
 * Extensions Service
 *
 * @remarks
 * This class is a {@link @roots/bud-framework#Service | Service instance} for
 * managing {@link @roots/bud-framework#Framework | Framework} extensions
 *
 * @core @public @container
 */
export class Extensions
  extends Framework.Service
  implements Framework.Extensions
{
  /**
   * Extensions controller constructor
   *
   * @public
   */
  public controller = Controller

  /**
   * Controller factory
   *
   * @public
   */
  @bind
  public makeController(
    extension: Framework.Extension.Module,
  ): Controller {
    return new this.controller(this.app, extension)
  }

  /**
   * @override @public
   */
  @bind
  public async register(): Promise<void> {
    this.app.time('registering base extensions')
    this.getValues().map(extension => {
      const controller = this.makeController(extension)
      this.set(controller.name, controller)
    })
    this.app.timeEnd('registering base extensions')
  }

  /**
   * @override @public
   */
  @bind
  public async boot(app: Framework.Framework): Promise<void> {
    if (app.store.is('inject', false)) {
      app.warn('extension injection disabled')
      return
    } else {
      app.info(`extension injection enabled`)
    }

    app.time('injecting project extensions')
    await Promise.all(
      app.project.getValues('extensions').map(async pkg => {
        try {
          const resolvedPkg = await import(pkg.name)
          const controller = this.makeController(resolvedPkg)
          this.set(resolvedPkg.name, controller)
        } catch (err) {
          this.app.error(err)
        }
      }),
    )
    app.timeEnd('injecting project extensions')
  }

  @bind
  public async booted(_app: Framework.Framework): Promise<void> {
    await this.registerExtensions()
    await this.bootExtensions()
  }

  @bind
  public async registerExtension(
    key: keyof Controller,
  ): Promise<void> {
    try {
      const controller = this.get<Controller>(key)
      await controller.register()
    } catch (err) {
      this.app.error(key, err)
    }
  }

  @bind
  public async bootExtension(key: string): Promise<void> {
    try {
      const controller = this.get<Controller>(key)
      await controller.boot()
    } catch (err) {
      this.app.error(err, key)
    }
  }

  /**
   * @public
   */
  @bind
  public async registerExtensions(): Promise<void> {
    this.app.time('registering extensions')
    await Promise.all(this.getKeys().map(this.registerExtension))
    this.app.timeEnd('registering extensions')
  }

  /**
   * @public
   */
  @bind
  public async bootExtensions(): Promise<void> {
    this.app.time('booting extensions')
    await Promise.all(this.getKeys().map(this.bootExtension))
    this.app.timeEnd('booting extensions')
  }

  /**
   * Add a {@link Controller} to the container
   *
   * @public
   */
  @bind
  public async add(
    extension: Framework.Extension.Module,
  ): Promise<void> {
    if (this.has(extension.name)) {
      this.app.warn(`${extension.name} already added. skipping.`)
      return
    }

    const controller = this.makeController(extension)

    await controller.register()
    await controller.boot()

    this.set(controller.name, controller)

    this.app.success(
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
    this.app.time('extensions.make')

    const plugins = this.getValues()
      .map((controller: Controller) => {
        return controller.make()
      })
      .filter(Boolean)

    this.app.timeEnd('extensions.make')

    return plugins
  }
}
