import {
  Discovery as Contract,
  Service,
} from '@roots/bud-framework'

export abstract class Base extends Service implements Contract {
  public name = 'framework/discovery'

  public resolveFrom: string[] = []

  /**
   * Collect packages.
   */
  abstract discover(
    type: 'dependencies' | 'devDependencies',
  ): void

  /**
   * Register discovered packages as extensions
   */
  abstract registerDiscovered(): void

  /**
   * Gather information on packages
   */
  abstract mapConfig(pkg: {name: string; dir: string}): void

  /**
   * Install packages
   */
  abstract install(): void
}
