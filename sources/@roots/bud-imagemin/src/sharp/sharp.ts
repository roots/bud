import type {
  AvifOptions,
  GifOptions,
  HeifOptions,
  JpegOptions,
  PngOptions,
  WebpOptions,
} from 'sharp'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'image-minimizer-webpack-plugin'

import type {Generator, GeneratorMap} from '../index.js'

export type EncodeOptions = {
  avif?: AvifOptions
  gif?: GifOptions
  heif?: HeifOptions
  jpeg?: JpegOptions
  jpg?: JpegOptions
  png?: PngOptions
  webp?: WebpOptions
}

export type PathedEncodeOptions = {
  [K in keyof EncodeOptions as `encodeOptions.${K &
    string}`]?: EncodeOptions[K]
}

export interface OptionsObject {
  [`encodeOptions`]?: EncodeOptions
}

export type Options = OptionsObject & PathedEncodeOptions

/**
 * `@roots/bud-imagemin/sharp`
 *
 * @see {@link https://bud.js.org/extensions/bud-imagemin}
 */
@label(`@roots/bud-imagemin/sharp`)
@options<Options>({encodeOptions: {}})
export class BudImageminSharp extends Extension<Options> {
  /**
   * Configured generators
   */
  public generators: GeneratorMap

  /**
   * {@link Extension.configAfter}
   */
  @bind
  public override async configAfter({hooks, imagemin}) {
    if (!this.isEnabled()) return

    hooks.on(`build.optimization.minimizer`, (minimizers = []) => [
      ...minimizers,
      imagemin.makePluginInstance({
        implementation: Plugin.sharpMinify,
        options: this.options,
        test: hooks.filter(`pattern.image`),
      }),
    ])

    this.generators.size &&
      hooks.on(`build.optimization.minimizer`, (minimizers = []) => [
        ...minimizers,
        imagemin.makePluginInstance({
          generator: [...this.generators.values()],
        }),
      ])
  }

  /**
   * Set encode options
   */
  @bind
  public encode<K extends `${keyof EncodeOptions & string}`>(
    key: K,
    value: EncodeOptions[K],
  ) {
    this.set(`encodeOptions.${key}`, value)
    return this
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register() {
    this.setGenerator(`webp`, {options: {encodeOptions: {webp: {}}}})
  }

  /**
   * Set encode options
   */
  @bind
  public setEncodeOptions(value: EncodeOptions) {
    Object.entries(value).forEach(
      <K extends `${keyof EncodeOptions & string}`>([key, value]: [
        K,
        EncodeOptions[K],
      ]) => {
        this.encode(key, value)
      },
    )

    return this
  }

  /**
   * Set generator
   */
  @bind
  public setGenerator(
    preset: string,
    generator: Omit<Generator, 'implementation'>,
  ): this {
    if (!this.generators) this.generators = new Map()

    this.generators.set(preset, {
      filename: `[path]generated.[name]@[width]x[height][ext]`,
      implementation: Plugin.sharpGenerate,
      preset,
      ...generator,
    })

    return this
  }
}
