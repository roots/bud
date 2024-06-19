import type {Options as SassLoaderOptions} from 'sass-loader'

import {Extension, type ExtensionApi} from '@roots/bud-framework/extension'
import {options} from '@roots/bud-framework/extension/decorators'

type Options = {
  /**
   * {@link Options.additionalData}
   */
  additionalData: string | undefined
  /**
   * {@link Options.implementation}
   */
  implementation: SassLoaderOptions[`implementation`] | undefined
  /**
   * {@link Options.sourceMap}
   */
  sourceMap: SassLoaderOptions[`sourceMap`] | undefined
  /**
   * {@link Options.warnRuleAsWarning}
   */
  warnRuleAsWarning: SassLoaderOptions[`warnRuleAsWarning`] | undefined
} & SassLoaderOptions

export type BudSassApi = {
  /**
   * Import a partial globally
   *
   * @remarks
   * Used to import a partial globally (such as a `variables.scss` file)
   *
   * @example
   * With a single module signifier:
   * ```ts
   * bud.sass.importGlobal('styles/variables.scss')
   * ```
   *
   * @example
   * With an array of module signifiers:
   * ```ts
   * bud.sass.importGlobal([
   *  'styles/variables.scss',
   *  'styles/mixins.scss',
   * ])
   * ```
   *
   * @see {@link options.additionalData}
   */
  importGlobal(data: Array<string> | string): BudSassApi

  /**
   * Register global stylsheet
   *
   * @remarks
   * Used to register styles which are included globally
   *
   * @example
   * ```ts
   * bud.sass.registerGlobal(`$primary-color: #ff0000;`)
   * ```
   *
   * @see {@link Options.additionalData}
   */
  registerGlobal: (additionalData: Array<string> | string) => BudSassApi
} & ExtensionApi<BudSassOptions, Options>

@options<Options>({
  additionalData: undefined,
  implementation: undefined,
  sourceMap: true,
  warnRuleAsWarning: true,
})
export class BudSassOptions extends Extension<Options> {
  /**
   * {@link Options.additionalData}
   */
  public declare additionalData: BudSassApi[`additionalData`] &
    Options['additionalData']

  /**
   * {@link Options.additionalData}
   */
  public declare getAdditionalData: BudSassApi[`getAdditionalData`]
  /**
   * {@link Options.implementation}
   */
  public declare getImplementation: BudSassApi[`getImplementation`]

  /**
   * {@link Options.sourceMap}
   */
  public declare getSourceMap: BudSassApi[`getSourceMap`]
  /**
   * {@link Options.implementation}
   */
  public declare implementation: BudSassApi[`implementation`] &
    Options['implementation']

  /**
   * {@link Options.additionalData}
   */
  public declare setAdditionalData: BudSassApi[`setAdditionalData`]
  /**
   * {@link Options.implementation}
   */
  public declare setImplementation: BudSassApi[`setImplementation`]
  /**
   * {@link Options.sourceMap}
   */
  public declare setSourceMap: BudSassApi[`setSourceMap`]
  /**
   * {@link Options.sourceMap}
   */
  public declare sourceMap: BudSassApi[`sourceMap`] & Options['sourceMap']
  /**
   * {@link Options.warnRuleAsWarning}
   */
  public declare warnRuleAsWarning: BudSassApi[`warnRuleAsWarning`] &
    Options['warnRuleAsWarning']
  /**
   * {@link Options.warnRuleAsWarning}
   */
  public declare getWarnRuleAsWarning: BudSassApi[`getWarnRuleAsWarning`]
  /**
   * {@link Options.warnRuleAsWarning}
   */
  public declare setWarnRuleAsWarning: BudSassApi[`setWarnRuleAsWarning`]
}
