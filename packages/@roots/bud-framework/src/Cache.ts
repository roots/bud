/**
 * @module @roots/bud-framework
 */

import {Service} from './Service'

/**
 * @interface Cache
 *
 * Handles cache invalidation, version generation, and build.cache config hooks.
 *
 * Interfaces with:
 *
 *  - {@link Discovery} to determine project dependencies for snapshotting/validation.
 *  - {@link Build} via {@link Hooks} to update config.
 *
 * Facades:
 *
 *  - {@link Api} can toggle cache settings with {@link Bud.Persist}
 */
declare interface Cache extends Service {
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
