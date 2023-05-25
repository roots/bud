import type {Bud} from '@roots/bud-framework'
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
  public generators: GeneratorMap = new Map()

  public implementation: typeof Plugin.sharpGenerate

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
    generator: Partial<Generator>,
  ): this {
    this.generators.set(preset, {
      preset: generator?.preset ?? preset,
      filename: `[path]generated.[name]@[width]x[height][ext]`,
      implementation: generator?.implementation ?? Plugin.sharpGenerate,
      ...generator,
    })

    return this
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register() {
    this.generators = new Map()
    this.implementation = Plugin.sharpMinify

    this.setGenerator(`webp`, {
      options: {
        encodeOptions: {webp: {}},
      },
    })
  }

  /**
   * {@link Extension.configAfter}
   */
  @bind
  public override async configAfter(bud: Bud) {
    this.configureBudMinimizer(bud)
    if (this.generators.size > 0) this.configureBudGenerators(bud)
  }

  @bind
  public configureBudGenerators({hooks}: Bud) {
    hooks.on(`build.optimization.minimizer`, (minimizers = []) => [
      ...minimizers,
      new Plugin({generator: [...this.generators.values()]}),
    ])
  }

  @bind
  public configureBudMinimizer({hooks}: Bud) {
    hooks.on(`build.optimization.minimizer`, (minimizers = []) => [
      ...minimizers,
      new Plugin({
        test: hooks.filter(`pattern.image`),
        minimizer: {
          implementation: this.implementation,
          options: this.options,
        },
      }),
    ])
  }
}
