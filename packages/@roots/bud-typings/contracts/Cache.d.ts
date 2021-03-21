import {Framework} from './'

/**
 * ## bud.cache
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export interface Cache extends Framework.Service {
  /**
   * memoize-fs
   */
  memoizer

  /**
   * serialize js
   */
  serialize

  /**
   * Config
   */
  config

  /**
   * Framework lifecycle: registered
   */
  registered()

  /**
   * Deserialize
   */
  deserialize(serializedStr)

  /**
   * Memoize
   */
  memoize(fn: CallableFunction, ...args)

  /**
   * Is cache enabled?
   */
  enabled(): boolean

  /**
   * Set cache.
   */
  setCache(): void
}
