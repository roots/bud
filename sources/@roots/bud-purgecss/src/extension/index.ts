import type {UserDefinedOptions as Options} from '@fullhuman/postcss-purgecss'
import type {Bud} from '@roots/bud-framework'

import {DynamicOption, Extension} from '@roots/bud-framework/extension'
import {
  dependsOn,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {purgecss} from '@roots/bud-purgecss/facade'

/**
 * PurgeCSS configuration
 *
 * {@link Extension}
 */
@label(`@roots/bud-purgecss`)
@dependsOn([`@roots/bud-postcss`])
@options<Options>({
  content: DynamicOption.make((bud: Bud) => [
    bud.path(`@src/*.{js,jsx,ts,tsx,vue,html,php,pug,rb}`),
    bud.path(`@src/**/*.{js,jsx,ts,tsx,vue,html,php,pug,rb}`),
  ]),
})
export default class BudPurgeCSS extends Extension<Options> {
  /**
   * {@link Extension.register}
   */
  public override async register(bud: Bud) {
    bud.bindFacade(`purgecss`, purgecss)
  }

  /**
   * {@link Extension.buildBefore}
   */
  public override async buildBefore(bud: Bud) {
    // Return early if purgecss is already setup
    if (bud.postcss.hasPlugin(`purgecss`)) return

    // Set up plugin with default options
    bud.purgecss(this.getOptions())
  }
}
