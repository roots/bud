import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  development,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Register `react-refresh-swc` transform with TSC compiler
 *
 * @remarks
 * Used when `@roots/bud-swc` is being used with babel loader
 * disabled
 *
 * @public
 * @decorator `@label`
 * @decorator `@development`
 */
@label(`@roots/bud-react/swc-refresh`)
@development
export default class BudSWCRefresh extends Extension {
  /**
   * `init` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async init(bud: Bud) {
    bud.hooks.action(`build.before`, this.registerTransform.bind(this))
  }

  /**
   * Register `react-refresh-swc` transform
   *
   * @public
   * @decorator `@bind`
   */
  public async registerTransform() {
    this.logger.log(`Registering swc react-refresh transformer`)

    this.app.swc.setOptions(options => ({
      ...options,
      transform: {
        react: {
          development: this.app.isDevelopment,
          refresh: this.app.isDevelopment,
        },
      },
    }))
  }
}
