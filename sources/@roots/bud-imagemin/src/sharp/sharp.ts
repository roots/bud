import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'image-minimizer-webpack-plugin'
import type {
  AvifOptions,
  GifOptions,
  HeifOptions,
  JpegOptions,
  PngOptions,
  WebpOptions,
} from 'sharp'

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
   * {@link Extension.register}
   */
  @bind
  public override async register() {
    this.setGenerator(`webp`, {options: {encodeOptions: {webp: {}}}})
  }

  /**
   * {@link Extension.configAfter}
   */
  @bind
  public override async configAfter({hooks, imagemin}) {
    hooks.on(`build.optimization.minimizer`, (minimizers = []) => [
      ...minimizers,
      imagemin.makePluginInstance({
        test: hooks.filter(`pattern.image`),
        implementation: Plugin.sharpMinify,
        options: this.options,
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
      preset,
      implementation: Plugin.sharpGenerate,
      filename: `[path]generated.[name]@[width]x[height][ext]`,
      ...generator,
    })

    return this
  }
}
