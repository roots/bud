import {
  Extension as Definition,
  Extensions as Contract,
  Modules,
  Plugins,
  Service,
} from '@roots/bud-framework'

import Controller from '../Controller'
import {
  bind,
  isEqual,
  isFunction,
  isUndefined,
} from './extensions.dependencies'

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
  extends Service<Partial<Plugins | Modules>>
  implements Contract
{
  /**
   * @override @public
   */
  @bind
  public async register(): Promise<void> {
    this.every((_name: string, extension: Definition.Module) => {
      this.set(
        extension.name,
        new Controller(this.app, extension),
      )
      this.app.success(
        `base extension ${extension.name} instantiated`,
      )
    })
  }

  public async boot(): Promise<void> {
    this.app.time('adding extensions')

    await Promise.all(
      this.app.project
        .getKeys('extensions')
        .map(async (name: string) => {
          this.app.time(name)

          const extension = await import(name)
          this.app.success(`import extension`, name)

          this.add(extension)

          this.app.timeEnd(extension)
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
      Object.values(this.repository).map(
        async (controller: Controller): Promise<void> => {
          this.app.time(controller.name)
          this.repository[controller.name] =
            await controller.register()
          this.app.timeEnd(controller.name)
        },
      ),
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
      Object.values(this.repository)
        .filter(
          controller =>
            !isUndefined(controller._module.boot) &&
            isFunction(controller._module.boot),
        )
        .map(async (controller: Controller) => {
          this.app.time(controller.name)

          isFunction(controller.register) &&
            isEqual(controller.registered, false) &&
            this.app.error(
              'attempting to boot function before registering even though extension has a register method',
            )

          this.repository[controller.name] =
            await controller.boot()

          this.app.timeEnd(controller.name)
        }),
    )

    this.app.timeEnd('booting extensions')
  }

  /**
   * Add a module to the repository, transforming it into an {@link Extension} instance
   * in the process.
   *
   * @override @public
   */
  @bind
  public add(extension: Definition.Module): void {
    this.set(extension.name, new Controller(this.app, extension))
    this.app.success(
      `added extension controller`,
      extension.name,
    )
  }

  /**
   * Returns an array of {@link @roots/bud-framework#PluginInstance | plugin instances}
   * which have been registered to the {@link Extensions | Extensions container} and
   * are set to be used in the compilation
   *
   * @returns An array of {@link @roots/bud-framework#PluginInstance | plugin instances}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public make(): Definition.ApplyPlugin[] {
    const pluginMap = (
      extension:
        | Definition.Module
        | Definition.CompilerPlugin
        | Definition.ApplyPlugin,
    ) => {
      const isPlugin =
        !isEqual(extension.when, false) && extension.apply

      return isPlugin ? extension : extension.make
    }

    const filterUndefined = (
      ext:
        | Definition.Module
        | Definition.CompilerPlugin
        | undefined,
    ): boolean => !isUndefined(ext)

    return this.getValues()
      .map(pluginMap)
      .filter(filterUndefined) as Definition.ApplyPlugin[]
  }

  /**
   * Returns extension instances which produce a Webpack plugin and are
   * set to be used in the next compilation
   *
   * @returns Array of {@link Extension} instances which produce Webpack plugins
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getEligibleWebpackModules(): Definition.CompilerPlugin[] {
    return this.getValues().filter(
      (extension: Controller): boolean => {
        if (
          isEqual(extension.when, false) ||
          (isUndefined(extension.make) &&
            isUndefined(extension.apply))
        ) {
          return false
        }

        return true
      },
    )
  }
}
