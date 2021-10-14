import {
  Extension as Definition,
  Extensions as Contract,
  Modules,
  Plugins,
  Service,
} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isEqual, isString, isUndefined} from 'lodash'

import Controller from '../controller'

/**
 * Extensions Service
 *
 * @remarks
 * This class is a {@link @roots/bud-framework#Service | Service instance} for
 * managing {@link @roots/bud-framework#Framework | Framework} extensions
 *
 * A {@link @roots/bud-framework#Framework | Framework} extension is defined
 * as a {@link @roots/bud-framework#Module | Module} and is instantiated in
 * the container as an instance of the {@link Extension} class
 *
 * @core @public @container
 */
export class Extensions
  extends Service<Partial<Plugins | Modules>>
  implements Contract
{
  /**
   * {@inheritDoc @roots/bud-framework#Service.register}
   *
   * @override @public
   */
  public name = 'extensions'

  /**
   * {@inheritDoc @roots/bud-framework#Service.register}
   *
   * @override @public
   */
  public register(): void {
    this.every((_name: string, extension: Definition.Module) => {
      return this.add(extension)
    })
  }

  /**
   * {@inheritDoc @roots/bud-framework#Service.boot}
   *
   * @override @public
   */
  public boot(): void {
    this.every((_name: string, extension: Definition.Module) => {
      return this.bootExtension(extension)
    })
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
    this.registerExtension(extension)
    this.bootExtension(extension)
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

  /**
   * Registers an extension
   *
   * @remarks
   * Can be booted from its {@link @roots/bud-framework#Service.repository | Service.repository} key or
   * with the literal {@link @roots/bud-framework#Module | Module}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public registerExtension(
    extension:
      | Definition.Module
      | Definition.CompilerPlugin
      | `${
          | (keyof Definition.Module & string)
          | (Definition.CompilerPlugin & string)}`,
  ): void {
    isString(extension)
      ? this.set(extension, this.get(extension).register())
      : this.set(
          extension.name,
          this.get(extension.name).register(),
        )
  }

  /**
   * Boots a registered {@link Extension} instance
   *
   * @remarks
   * Can be booted from its {@link @roots/bud-framework#Service.repository | Service.repository} key or
   * with the literal {@link @roots/bud-framework#Definition.Module | Module}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public bootExtension(
    extension:
      | Definition.Module
      | Definition.CompilerPlugin
      | `${
          | (keyof Definition.Module & string)
          | (Definition.CompilerPlugin & string)}`,
  ): void {
    isString(extension)
      ? this.set(extension, this.get(extension).boot())
      : this.set(extension.name, this.get(extension.name).boot())
  }
}
