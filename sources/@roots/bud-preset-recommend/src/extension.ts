import {Extension} from '@roots/bud-framework/extension'
import {dependsOn, label} from '@roots/bud-framework/extension/decorators'

/**
 * Recommended preset
 *
 * @public
 * @decorator `@label`
 * @decorator `@dependsOn`
 */
@label('@roots/bud-preset-recommend')
@dependsOn(['@roots/bud-entrypoints', '@roots/bud-postcss'])
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
  public async register() {
    if (!this.app.extensions.has('@roots/bud-esbuild')) {
      const {default: babel} = await this.import('@roots/bud-babel')
      await this.app.extensions.add(babel)
    }
  }
}
