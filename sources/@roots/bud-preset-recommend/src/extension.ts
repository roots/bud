import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  dependsOnOptional,
  label,
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
 * @decorator `@dependsOnOptional`
 */
@label(`@roots/bud-preset-recommend`)
@dependsOn([`@roots/bud-postcss`])
@dependsOnOptional([`@roots/bud-esbuild`, `@roots/bud-swc`])
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
  public override async register(bud: Bud) {
    if (
      !bud.extensions.has(`@roots/bud-esbuild`) &&
      !bud.extensions.has(`@roots/bud-swc`) &&
      !bud.extensions.has(`@roots/bud-babel`)
    ) {
      const babel = await bud.module.import(`@roots/bud-babel`)
      this.logger.log(babel)
      await bud.extensions.add(babel)
    }
  }
}
