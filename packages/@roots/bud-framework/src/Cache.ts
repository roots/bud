import {Service} from './Service'

/**
 * {@link Service}: Handles cache invalidation, version generation, and the setting of build.cache config hooks.
 *
 * @remarks
 * Interfaces with:
 *  - {@link Discovery} to determine project dependencies for snapshotting/validation.
 *  - {@link Build} via {@link Hooks} to update config.
 *
 * Facades:
 *  - {@link Api} can toggle cache settings with {@link Bud.Persist}
 *
 * @noInheritDoc
 */
interface Cache extends Service {
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
   * A short, unique string created from the hashed contents of the project config files and build dependencies.
   */
  version(): string
}

export {Cache}
