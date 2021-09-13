import {Service} from '../'
import {ApplyPlugin, Extension} from './Extension'

/**
 * Extensions Service interface
 *
 * @public @core
 */
export interface Extensions extends Service<Extension> {
  /**
   * Add an extension
   *
   * @public
   */
  add(extension: Extension): void

  /**
   * Get {@link PluginInstance} instances to be included in compilation
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
