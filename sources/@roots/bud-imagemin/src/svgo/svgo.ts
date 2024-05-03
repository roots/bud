import type {PluginConfig} from 'svgo'
import type {StringifyOptions} from 'svgo/lib/types.js'

import {Extension, type Option} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'image-minimizer-webpack-plugin'

export type EncodeOptions = {
  /** Precision of floating point numbers. Will be passed to each plugin that suppors this param. */
  floatPrecision?: number
  /** Options for rendering optimized SVG from AST. */
  js2svg?: StringifyOptions
  /** Pass over SVGs multiple times to ensure all optimizations are applied. */
  multipass?: boolean
  /**
   * Plugins configuration
   * ['preset-default'] is default
   * Can also specify any builtin plugin
   * ['sortAttrs', { name: 'prefixIds', params: { prefix: 'my-prefix' } }]
   * Or custom
   * [{ name: 'myPlugin', fn: () => ({}) }]
   */
  plugins?: PluginConfig[]
}
export type PathedEncodeOptions = {
  [K in keyof EncodeOptions as `encodeOptions.${K &
    string}`]?: EncodeOptions[K]
}
export type OptionsObject = {
  [`encodeOptions`]: EncodeOptions
}
export type Options = OptionsObject & PathedEncodeOptions

/**
 * `@roots/bud-imagemin/svgo`
 *
 * @see {@link https://bud.js.org/extensions/bud-imagemin}
 */
@label(`@roots/bud-imagemin/svgo`)
@options<Options>({encodeOptions: {}})
export class BudImageminSvgo extends Extension<Options> {
  /**
   * {@link EncodeOptions}
   */
  public declare encodeOptions: Option<
    BudImageminSvgo,
    Options,
    'encodeOptions'
  >['value']

  /**
   * {@link EncodeOptions}
   */
  public declare getEncodeOptions: Option<
    BudImageminSvgo,
    Options,
    'encodeOptions'
  >['get']

  /**
   * {@link EncodeOptions}
   */
  public declare setEncodeOptions: Option<
    BudImageminSvgo,
    Options,
    'encodeOptions'
  >['set']

  /**
   * {@link Extension.configAfter}
   */
  @bind
  public override async configAfter({hooks, imagemin}) {
    if (!this.isEnabled()) return

    this.encodeOptions &&
      hooks.on(`build.optimization.minimizer`, (minimizer = []) => [
        ...minimizer,
        imagemin.makePluginInstance({
          implementation: Plugin.svgoMinify,
          options: this.options,
          test: hooks.filter(`pattern.svg`),
        }),
      ])
  }

  /**
   * Set encode options
   */
  @bind
  public encode<K extends keyof EncodeOptions & string>(
    key: K,
    value: EncodeOptions[K],
  ) {
    this.setEncodeOptions(options => ({...options, [key]: value}))
  }
}
