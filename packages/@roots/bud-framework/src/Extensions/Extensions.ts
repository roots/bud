import {Modules, Plugins, Service} from '../'
import {ApplyPlugin, Extension} from './Extension'

/**
 * Extensions Service interface
 *
 * @core @public @container
 */
export interface Extensions
  extends Service<Partial<Plugins | Modules>> {
  /**
   * Add an extension
   *
   * @public
   */
  add(extension: Extension): void

  /**
   * Get {@link ApplyPlugin} instances to be included in compilation
   *
   * @public
   */
  make(): ApplyPlugin[]

  /**
   * Get {@link Extension} instances slated for inclusion in compilation
   *
   * @public
   */
  getEligibleWebpackModules(): Extension[]
}
