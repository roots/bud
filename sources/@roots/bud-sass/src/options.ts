import {
  Extension,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {bind, options} from '@roots/bud-framework/extension/decorators'
import type {Options as SassLoaderOptions} from 'sass-loader'

type Options = SassLoaderOptions & {
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
} & Record<string, unknown>

export type BudSassApi = StrictPublicExtensionApi<
  BudSassOptions,
  Options
> & {
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
  registerGlobal: (additionalData: string | Array<string>) => BudSassApi

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
  importGlobal(data: string | Array<string>): BudSassApi
}

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
   * {@link Options.additionalData}
   */
  public declare setAdditionalData: BudSassApi[`setAdditionalData`]

  /**
   * {@link Options.implementation}
   */
  public declare implementation: BudSassApi[`implementation`] &
    Options['implementation']
  /**
   * {@link Options.implementation}
   */
  public declare getImplementation: BudSassApi[`getImplementation`]
  /**
   * {@link Options.implementation}
   */
  public declare setImplementation: BudSassApi[`setImplementation`]

  /**
   * {@link Options.sourceMap}
   */
  public declare sourceMap: BudSassApi[`sourceMap`] & Options['sourceMap']
  /**
   * {@link Options.sourceMap}
   */
  public declare getSourceMap: BudSassApi[`getSourceMap`]
  /**
   * {@link Options.sourceMap}
   */
  public declare setSourceMap: BudSassApi[`setSourceMap`]

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
  @bind
  public registerGlobal(additionalData: string | Array<string>): this {
    this.setAdditionalData((data = ``) => {
      const processedString = (
        Array.isArray(additionalData) ? additionalData : [additionalData]
      )
        .map(str => str.trim())
        .filter(Boolean)
        .join(`\n`)

      return [data, processedString].join(``)
    })

    return this
  }

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
  @bind
  public importGlobal(data: string | Array<string>): this {
    const globals = (Array.isArray(data) ? data : [data])
      .map(str => str.trim())
      .filter(Boolean)
      .map(item => `@import "${item}";`)

    return this.registerGlobal(globals)
  }
}
