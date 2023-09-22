import type {UserDefinedOptions as Options} from '@fullhuman/postcss-purgecss'
import type {Bud} from '@roots/bud-framework'

import {DynamicOption, Extension} from '@roots/bud-framework/extension'
import {
  dependsOn,
  expose,
  label,
  options,
  production,
} from '@roots/bud-framework/extension/decorators'
import {purgecss} from '@roots/bud-purgecss/facade'

import BudPurgeCSSPublicAPI from './base.js'

/**
 * PurgeCSS configuration
 *
 * {@link Extension}
 */
@label(`@roots/bud-purgecss`)
@dependsOn([`@roots/bud-postcss`])
@expose(`purge`)
@options<Options>({
  blocklist: undefined,
  content: DynamicOption.make((bud: Bud) => [
    bud.path(`@src/*.{html,js,jsx,php,pug,rb,ts,tsx,vue}`),
    bud.path(`@src/**/*.{html,js,jsx,php,pug,rb,ts,tsx,vue}`),
  ]),
  contentFunction: undefined,
  defaultExtractor: undefined,
  dynamicAttributes: undefined,
  extractors: undefined,
  fontFace: undefined,
  keyframes: undefined,
  output: undefined,
  rejected: undefined,
  rejectedCss: undefined,
  safelist: undefined,
  skippedContentGlobs: undefined,
  sourceMap: undefined,
  stdin: undefined,
  stdout: undefined,
  variables: undefined,
})
@production
export default class BudPurgeCSS extends BudPurgeCSSPublicAPI {
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
    /**
     * Return early if purgecss is already setup
     * Which can happen if the user has called the deprecated {@link Bud.purgecss} method
     */
    if (bud.postcss.hasPlugin(`purgecss`)) return

    // Add purgecss to postcss plugins
    bud.postcss
      .setPlugin(`purgecss`, [`@fullhuman/postcss-purgecss`, this.options])
      .use(plugins => [...plugins, `purgecss`])
  }
}

export type {BudPurgeCSSPublicAPI}
