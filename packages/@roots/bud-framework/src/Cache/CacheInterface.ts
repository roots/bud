/**
 * Cache service Interface
 *
 * @public
 */
export interface Interface {
  /**
   * Dependencies which should be checked to determine cache validity.
   *
   * @public
   */
  buildDependencies(): string[]

  /**
   * Directory used to store cache files
   *
   * @public
   */
  directory(): string

  /**
   * Hash of config files and build dependencies
   *
   * @public
   */
  hash(): string

  /**
   * A short, unique string created from the hashed contents of the project
   * config files and build dependencies.
   *
   * @public
   */
  version(): string
}
