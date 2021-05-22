import {Service} from '../Service'

declare interface Cache extends Service {
  /**
   * ## cache.cacheFiles
   *
   * Additional files to use for webpack cache vaidation.
   *
   * Intended for extensions to register cache stores
   * (babel cache, eslint cache, etc.)
   */
  cacheFiles: string[]

  /**
   * ## cache.buildDependencies
   *
   * Dependencies which should be checked to determine cache
   * validity.
   */
  buildDependencies(): string[]

  /**
   * ## cache.cacheLocation
   */
  directory(): string

  /**
   * ## cache.hash
   */
  hash(): string

  /**
   * ## cache.version
   *
   * A hash created from the stringified contents of the project config files
   * and its dependencies.
   */
  version(): string
}

export {Cache}
