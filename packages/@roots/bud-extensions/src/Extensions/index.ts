/**
 * @module @roots/bud-extensions
 */

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
 * Service: Extensions
 *
 * @noInheritDoc
 */
class Extensions
  extends Service<Framework.Extensions>
  implements Contract
{
  /**
   * @property {string} name
   */
  public name = 'extensions'

  /**
   * @property {Contract.repository} repository
   */
  public repository: {[key: string]: Extension | Module}

  /**
   * @method register
   * {@link Contract.register}
   */
  @bind
  public register(): void {
    this.every((_name: string, extension: Module) => {
      return this.add(extension)
    })
  }

  /**
   * @method boot
   * {@link Contract.boot}
   */
  @bind
  public boot(): void {
    this.every((_name: string, extension: Module) => {
      return this.bootExtension(extension)
    })
  }

  /**
   * @method registerExtension
   */
  @bind
  public registerExtension(extension: Module): void {
    this.set(extension.name, this.get(extension.name).register())
  }

  /**
   * @method bootExtension
   */
  @bind
  public bootExtension(extension: Module): void {
    this.set(extension.name, this.get(extension.name).boot())
  }

  /**
   * @method add
   */
  @bind
  public add(extension: Module): void {
    this.set(extension.name, new Extension(this.app, extension))
    this.registerExtension(extension)
    this.bootExtension(extension)
  }

  /**
   * @method make
   */
  @bind
  public make(): Contract.PluginOutput[] {
    return this.getValues()
      .map((extension: Module) => {
        const isPlugin =
          !isEqual(extension.when, false) && extension.apply

        return isPlugin ? extension : extension.make
      })
      .filter(
        (ext: Module | undefined) => !isUndefined(ext),
      ) as Contract.PluginOutput[]
  }
}

/**
 * @exports Extensions
 */
export {Extensions}
