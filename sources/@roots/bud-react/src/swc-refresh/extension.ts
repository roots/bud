import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  development,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Register `react-refresh-SWC` transform with TSC compiler
 *
 * @remarks
 * Used when `@roots/bud-SWC` is being used with babel loader
 * disabled
 *
 * @public
 * @decorator `@label`
 * @decorator `@development`
 */
@label('@roots/bud-react/swc-refresh')
@development
export default class BudSWCRefresh extends Extension {
  /**
   * `beforeBuild` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async init() {
    this.app.hooks.action(
      `@roots/bud-swc/beforeBuild/after`,
      this.registerTransform,
    )
  }

  /**
   * Register tsc react-refresh transform
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async registerTransform() {
    await (this.app as any).swc.hasRC().then(hasRc => {
      if (hasRc) return

      this.logger.log('Registering swc react-refresh transformer')
      ;(this.app as any).swc.setOptions(options => ({
        ...options,
        transform: {
          react: {
            development: this.app.isDevelopment,
            refresh: this.app.isDevelopment,
          },
        },
      }))
    })
  }
}
