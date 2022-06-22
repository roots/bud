import {Extension} from '@roots/bud-framework/extension'
import {dependsOn, label} from '@roots/bud-framework/extension/decorators'

@label('@roots/bud-preset-recommend')
@dependsOn(['@roots/bud-entrypoints', '@roots/bud-postcss'])
export default class BudPresetRecommend extends Extension {
  public async register() {
    if (!this.app.extensions.has('@roots/bud-esbuild')) {
      const {default: babel} = await import('@roots/bud-babel')
      await this.app.extensions.add(babel)
    }
  }
}
