import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  development,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Register `react-refresh-typescript` transform with TSC compiler
 *
 * @remarks
 * Used when `@roots/bud-typescript` is being used with babel loader
 * disabled
 *
 * @public
 * @decorator `@label`
 * @decorator `@development`
 */
@label(`@roots/bud-react/typescript-refresh`)
@development
export default class BudTypeScriptRefresh extends Extension {
  /**
   * `buildBefore` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async init() {
    this.app.hooks.action(
      `@roots/bud-typescript/buildBefore/after`,
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
    this.logger.log(`Registering react-refresh-typescript transformer`)

    const transform = await this.import(`react-refresh-typescript`)

    this.app.extensions
      .get(`@roots/bud-typescript`)
      .setOption(`loader`, options => ({
        ...(options ?? {}),
        getCustomTransformers: {before: [transform()]},
      }))
  }
}
