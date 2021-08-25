import {
  Extensions as Contract,
  Framework,
  Module,
  Service,
} from '@roots/bud-framework'
import {Extension} from '../Extension'
declare class Extensions
  extends Service<Framework.Extensions>
  implements Contract
{
  name: string
  repository: Framework.Extensions
  register(): void
  boot(): void
  /**
   * Add a module to the repository, transforming it into an {@link Extension} instance
   * in the process.
   */
  add(extension: Module): void
  /**
   * Returns webpack configuration values for extensions instances
   * which produce a Webpack plugin and are set to be used in the next compilation
   *
   * @decorator `@bind`
   */
  make(): Contract.PluginOutput[]
  /**
   * Returns extension instances which produce a Webpack plugin and are
   * set to be used in the next compilation
   *
   * @decorator `@bind`
   */
  getEligibleWebpackModules(): Extension[]
  /**
   * Register an extension and set in the container
   *
   * @internal
   * @decorator `@bind`
   */
  registerExtension(extension: Module): void
  /**
   * Boot a registered extension
   *
   * @internal
   * @decorator `@bind`
   */
  bootExtension(extension: Module): void
}
export {Extensions}
//# sourceMappingURL=index.d.ts.map
