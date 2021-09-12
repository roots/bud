/**
 * Cache service Interface
 *
 * @public
 */
export interface Interface {
  /**
   * Dependencies which should be checked to determine cache validity.
   */
  buildDependencies(): string[]

  /**
   * Directory used to store cache files
   */
  directory(): string

  /**
   * Hash of config files and build dependencies
   */
  hash(): string

  /**
   * A short, unique string created from the hashed contents of the project
   * config files and build dependencies.
   */
  version(): string
}
