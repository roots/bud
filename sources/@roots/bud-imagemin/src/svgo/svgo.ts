import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'image-minimizer-webpack-plugin'
import type {PluginConfig} from 'svgo'
import type {StringifyOptions} from 'svgo/lib/types.js'

export type EncodeOptions = {
  /** Pass over SVGs multiple times to ensure all optimizations are applied. */
  multipass?: boolean
  /** Precision of floating point numbers. Will be passed to each plugin that suppors this param. */
  floatPrecision?: number
  /**
   * Plugins configuration
   * ['preset-default'] is default
   * Can also specify any builtin plugin
   * ['sortAttrs', { name: 'prefixIds', params: { prefix: 'my-prefix' } }]
   * Or custom
   * [{ name: 'myPlugin', fn: () => ({}) }]
   */
  plugins?: PluginConfig[]
  /** Options for rendering optimized SVG from AST. */
  js2svg?: StringifyOptions
}
export type PathedEncodeOptions = {
  [K in keyof EncodeOptions as `encodeOptions.${K &
    string}`]?: EncodeOptions[K]
}
export type OptionsObject = {
  [`encodeOptions`]: EncodeOptions
}
export type Options = PathedEncodeOptions & OptionsObject

/**
 * `@roots/bud-imagemin/svgo`
 *
 * @see {@link https://bud.js.org/extensions/bud-imagemin}
 */
@label(`@roots/bud-imagemin/svgo`)
@options<Options>({encodeOptions: {}})
export class BudImageminSvgo extends Extension<Options> {
  public implementation: typeof Plugin.svgoMinify

  @bind
  public setEncodeOptions(value: EncodeOptions) {
    Object.entries(value).forEach(
      <K extends keyof EncodeOptions>([k, v]: [K, EncodeOptions[K]]) => {
        this.encode(k, v)
      },
    )
  }

  @bind
  public encode<K extends keyof EncodeOptions & string>(
    key: K,
    value: EncodeOptions[K],
  ) {
    this.set(`encodeOptions.${key}`, value as any)
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register() {
    this.implementation = Plugin.svgoMinify
  }

  /**
   * {@link Extension.configAfter}
   */
  @bind
  public override async configAfter({hooks}) {
    hooks.on(`build.optimization.minimizer`, (minimizer = []) => [
      ...minimizer,
      new Plugin({
        test: hooks.filter(`pattern.svg`),
        minimizer: {
          implementation: this.implementation,
          options: {
            encodeOptions: this.get(`encodeOptions`) ?? {},
          },
        },
      }),
    ])
  }
}
