/**
 * The {@link @roots/bud-cache#} package implements the {@link @roots/bud-framework#Cache | Cache interface}
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @core @packageDocumentation @betaDocumentation
 */

import {Cache as Cache_3} from '@roots/bud-framework'
import {Framework} from '@roots/bud-framework'

/**
 * Service class handling cache concerns
 *
 * @remarks
 * Interfaces with:
 *  - {@link @roots/bud-framework#Project} to determine project dependencies for snapshotting/validation.
 *  - {@link @roots/bud-framework#Build} via {@link @roots/bud-framework#Hooks} to update config.
 *
 * Facades:
 *  - {@link @roots/bud-framework#Api} can toggle cache settings with {@link Bud.Persist}
 *
 * @public
 */
declare class
  extends Cache_3.Abstract
  implements Cache_3.Interface
{
  /**
   * {@inheritDoc}
   */
  name: string
  /**
   * {@inheritDoc}
   *
   * @decorator `@bind`
   */
  register(app: Framework): void
  /**
   * Returns sha1 hash as a version string
   *
   * @decorator `@bind`
   */
  version(): string
  /**
   * Returns cache storage directory
   *
   * @decorator `@bind`
   */
  directory(): string
  /**
   * Returns array of build dependency paths
   *
   * @remarks
   * @see https://webpack.js.org/configuration/cache/#cachebuilddependencies
   *
   * @decorator `@bind`
   */
  buildDependencies(): string[]
  /**
   * Returns hash of all build dependencies and parsed CLI arguments
   *
   * @decorator `@bind`
   */
  hash(): string
}
export {Cache_2 as Cache}

export {}
