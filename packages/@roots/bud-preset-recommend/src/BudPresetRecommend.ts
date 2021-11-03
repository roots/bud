import * as babel from '@roots/bud-babel'
import {Extension} from '@roots/bud-framework'
import * as postcss from '@roots/bud-postcss'

export interface BudPresetRecommend extends Extension.Module {
  name: '@roots/bud-preset-recommend'
}

/**
 * Recommended preset configuration for Bud.
 *
 * @public
 */
export const BudPresetRecommend: BudPresetRecommend = {
  name: '@roots/bud-preset-recommend',

  register: app => {
    app.use([babel, postcss])
  },
}
