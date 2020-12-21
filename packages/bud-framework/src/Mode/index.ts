import type {Framework, Webpack} from '@roots/bud-typings'
import Service from './Service'

/**
 * ## bud.mode
 *
 * Utility for working with the webpack compiler's mode setting.
 *
 * [🔗 Documentation on bud.mode](#)
 */
export default class extends Service {
  /**
   * ## bud.mode.get
   *
   * Returns the currently set mode.
   *
   * ### Usage
   *
   * ```js
   * bud.mode.get()
   * ```
   */
  public get(): Webpack.Configuration['mode'] {
    return this.app.config.get('mode')
  }

  /**
   * ## bud.mode.set
   *
   * Set the mode value.
   *
   * Accepted values: `production`, `development`, `none`
   *
   * ### Usage
   *
   * ```js
   * bud.mode.set('production')
   * ```
   */
  public set(mode: Webpack.Configuration['mode']): Framework {
    this.app.config.set('mode', mode)

    return this.app
  }

  /**
   * ## bud.mode.is
   *
   * Returns `true` if webpack mode matches the mode passed to it.
   *
   * Returns `false` if it does not.
   *
   * ### Usage
   *
   * ```js
   * bud.mode.is('production')
   * // returns true if bud.mode.get() === 'production'
   * ```
   */
  public is(check: Webpack.Configuration['mode']): boolean {
    return this.app.config.is('mode', check)
  }
}
