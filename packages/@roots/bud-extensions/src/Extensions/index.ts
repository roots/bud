import {
  Extensions as Contract,
  Framework,
  Module,
  Service,
} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isEqual, isUndefined} from 'lodash'

import {Extension} from '../Extension'

class Extensions
  extends Service<Partial<Framework.Extensions>>
  implements Contract
{
  public name = 'extensions'

  public register(): void {
    this.every((_name: string, extension: Module) => {
      return this.add(extension)
    })
  }

  public boot(): void {
    this.every((_name: string, extension: Module) => {
      return this.bootExtension(extension)
    })
  }

  /**
   * Add a module to the repository, transforming it into an {@link Extension} instance
   * in the process.
   */
  @bind
  public add(extension: Module): void {
    this.set(extension.name, new Extension(this.app, extension))
    this.registerExtension(extension)
    this.bootExtension(extension)
  }

  /**
   * Returns webpack configuration values for extensions instances
   * which produce a Webpack plugin and are set to be used in the next compilation
   *
   * @decorator `@bind`
   */
  @bind
  public make(): Contract.PluginOutput[] {
    const pluginMap = (extension: Module) => {
      const isPlugin =
        !isEqual(extension.when, false) && extension.apply

      return isPlugin ? extension : extension.make
    }

    const filterUndefined = (
      ext: Module | Plugin | undefined,
    ): boolean => !isUndefined(ext)

    return this.getValues()
      .map(pluginMap)
      .filter(filterUndefined) as Contract.PluginOutput[]
  }

  /**
   * Returns extension instances which produce a Webpack plugin and are
   * set to be used in the next compilation
   *
   * @decorator `@bind`
   */
  @bind
  public getEligibleWebpackModules(): Extension[] {
    return this.getValues().filter(
      (extension: Extension): boolean => {
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
   * Register an extension and set in the container
   *
   * @decorator `@bind`
   */
  @bind
  public registerExtension(extension: Module): void {
    this.set(extension.name, this.get(extension.name).register())
  }

  /**
   * Boot a registered extension
   *
   * @decorator `@bind`
   */
  @bind
  public bootExtension(extension: Module): void {
    this.set(extension.name, this.get(extension.name).boot())
  }
}

export {Extensions}
