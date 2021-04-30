import {
  Discovery as Contract,
  Framework,
  Service,
} from '@roots/bud-framework'

export abstract class Base extends Service implements Contract {
  /**
   * Service name
   */
  public name = 'framework/discovery'

  /**
   * Array of bud package paths
   */
  abstract get packagePaths(): string[]

  /**
   * Collect packages.
   */
  abstract discoverPackages(): void

  /**
   * Register discovered packages as extensions
   */
  abstract registerDiscovered(): void

  /**
   * Gather information on packages
   */
  abstract reducePackages(
    pkgs: Framework.Pkgs,
    pkg: string,
  ): void
}
