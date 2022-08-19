import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
  optIn,
} from '@roots/bud-framework/extension/decorators'

/**
 * Recommended preset configuration for `@roots/bud` projects
 *
 * @remarks
 * Will try to use faster compiler if available
 * and fallback on `@roots/bud-babel` (which comes included)
 * if esbuild extension is not available.
 *
 * @public
 * @decorator `@label`
 * @decorator `@dependsOn`
 * @decorator `@optIn`
 */
@label(`@roots/bud-preset-recommend`)
@dependsOn([`@roots/bud-entrypoints`, `@roots/bud-postcss`])
@optIn([`@roots/bud-esbuild`, `@roots/bud-swc`])
export default class BudPresetRecommend extends Extension {
  /**
   * `register` callback
   *
   * @remarks
   * If `@roots/bud-esbuild` is not an active extension
   * the preset will register `@roots/bud-babel`
   *
   * @public
   */
  @bind
  public async register() {
    if (
      this.app.extensions.has(`@roots/bud-esbuild`) ||
      this.app.extensions.has(`@roots/bud-swc`)
    )
      return

    await this.app.extensions.add(await this.import(`@roots/bud-babel`))
  }
}
