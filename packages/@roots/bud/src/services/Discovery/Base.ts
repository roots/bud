import {
  Discovery as Contract,
  Service,
} from '@roots/bud-framework'

export abstract class Base extends Service implements Contract {
  /**
   * Service name
   */
  public name = 'framework/discovery'

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
  abstract mapConfig(pkg: string): void

  /**
   * Install packages
   */
  abstract install(): void
}
