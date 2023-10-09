import {Extension} from '@roots/bud-framework/extension'
import {dependsOn, label} from '@roots/bud-framework/extension/decorators'

/**
 * Recommended preset
 */
@label(`@roots/bud-preset-recommend`)
@dependsOn([`@roots/bud-swc`, `@roots/bud-postcss`])
export default class BudPresetRecommend extends Extension {}
