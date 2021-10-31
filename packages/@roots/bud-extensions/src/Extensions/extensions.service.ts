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
    this.getValues().map(extension => {
      this.add(extension)
      this.app.success(
        `base extension ${extension.name} instantiated`,
      )
    })
  }

  /**
   * @override @public
   */
  public async booted(): Promise<void> {
    this.app.time('adding extensions')

    await Promise.all(
      this.app.project
        .getValues('extensions')
        .map(async profile => {
          this.app.await(`importing ${profile.name}`)
          const extension = await import(profile.path)
          this.add(extension)
        }),
    )

    this.app.timeEnd('adding extensions')
  }

  /**
   * @public
   */
  @bind
  public async registerExtensions(): Promise<void> {
    this.app.time('registering extensions')

    await Promise.all(
      this.getValues().map(async (controller: Controller) => {
        await controller.register()
      }),
    )

    this.app.timeEnd('registering extensions')
  }

  /**
   * @public
   */
  @bind
  public async bootExtensions(): Promise<void> {
    this.app.time('booting extensions')

    await Promise.all(
      this.getValues().map(async (controller: Controller) => {
        await controller.boot()
      }),
    )

    this.app.timeEnd('booting extensions')
  }

  /**
   * Add a {@link Controller} to the container
   *
   * @public
   */
  @bind
  public add(extension: Framework.Extension.Module): void {
    this.set(extension.name, this.makeController(extension))
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
    const extensions = this.getValues()

    const plugins = [
      ...extensions
        .filter(
          (controller: Controller) => controller.module.make,
        )
        .map((controller: Controller) => {
          this.app.info(
            `utilizing adapted plugin`,
            controller.name,
          )
          return controller.make()
        }),
    ].filter(Boolean)

    this.app.timeEnd('extensions.make')

    return plugins
  }
}
