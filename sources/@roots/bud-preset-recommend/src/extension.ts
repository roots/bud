import {Extension} from '@roots/bud-framework/extension'
import {dependsOn, label} from '@roots/bud-framework/extension/decorators'

@label('@roots/bud-preset-recommend')
@dependsOn([
  '@roots/bud-babel',
  '@roots/bud-entrypoints',
  '@roots/bud-postcss',
])
export default class BudPresetRecommend extends Extension {}
