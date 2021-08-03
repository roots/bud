import {
  Extensions as Contract,
  Framework,
  Module,
  Service,
} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isEqual, isUndefined} from 'lodash'

import {Extension} from '../Extension'

/**
 * {@inheritDoc Contract}
 *
 * @public
 * @sealed
 */
class Extensions
  extends Service<Framework.Extensions>
  implements Contract
{
  /** {@inheritDoc Contract.name} */
  public name = 'extensions'

  /** {@inheritDoc Contract.repository} */
  public repository: Framework.Extensions

  /** {@inheritDoc Contract.register} */
  public register(): void {
    this.every((_name: string, extension: Module) => {
      return this.add(extension)
    })
  }

  /** {@inheritDoc Contract.boot} */
  public boot(): void {
    this.every((_name: string, extension: Module) => {
      return this.bootExtension(extension)
    })
  }

  /** {@inheritDoc Contract.add} */
  @bind
  public add(extension: Module): void {
    this.set(extension.name, new Extension(this.app, extension))
    this.registerExtension(extension)
    this.bootExtension(extension)
  }

  /** {@inheritDoc Contract.make} */
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

  /** {@inheritDoc Contract.getEligibleWebpackModules} */
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
   * @internal
   */
  @bind
  public registerExtension(extension: Module): void {
    this.set(extension.name, this.get(extension.name).register())
  }

  /**
   * Boot a registered extension
   *
   * @internal
   */
  @bind
  public bootExtension(extension: Module): void {
    this.set(extension.name, this.get(extension.name).boot())
  }
}

export {Extensions}
