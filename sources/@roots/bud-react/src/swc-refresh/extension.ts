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
  public override async buildBefore(bud: Bud) {
    this.registerTransform(bud)
  }

  /**
   * Register `react-refresh-swc` transform
   *
   * @public
   * @decorator `@bind`
   */
  public async registerTransform(bud: Bud) {
    this.logger.log(`Registering swc react-refresh transformer`)

    bud.swc.setOptions(options => ({
      ...options,
      transform: {
        react: {
          development: bud.isDevelopment,
          refresh: bud.isDevelopment,
        },
      },
    }))
  }
}
