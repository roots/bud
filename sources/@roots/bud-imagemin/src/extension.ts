import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import ImageMinimizerPlugin, {
  Generator,
  WorkerResult,
} from 'image-minimizer-webpack-plugin'

interface Minifier {
  (
    original: WorkerResult,
    options: Record<string, any>,
  ): Promise<WorkerResult | null>
}
interface EncoderOptions extends Map<string, any> {}

type GeneratorMap = Map<string, Generator<any>>

const encoders = {
  mozjpeg: `jpg`,
  oxipng: `png`,
}

@label(`@roots/bud-imagemin`)
@expose(`imagemin`)
export class BudImageminExtension extends Extension {
  protected _minifier: Minifier = ImageMinimizerPlugin.squooshMinify
  protected _generators: GeneratorMap
  protected _encodeOptions: EncoderOptions

  public get minifier(): Minifier {
    return this._minifier
  }
  public set minifier(minifier: Minifier) {
    this._minifier = minifier
  }
  @bind
  public getMinifier(): Minifier {
    return this.minifier
  }
  @bind
  public setMinifier(minifier: Minifier): this {
    this.minifier = minifier
    return this
  }

  public get generators(): GeneratorMap {
    return this._generators
  }
  public set generators(generators: GeneratorMap) {
    this._generators = generators
  }

  /**
   * Get generator
   *
   * @param key - key of {@link GeneratorMap}
   * @returns generator - {@link Generator}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getGenerator(
    key: `${keyof GeneratorMap & string}`,
  ): Generator<any> {
    return this.generators.get(key)
  }
  /**
   * Set generator
   *
   * @param key - {@link string}
   * @param generator - {@link Generator}
   * @returns instance - {@link BudImagemin}
   *
   * @public
   */
  @bind
  public setGenerator(
    ...args:
      | [string, string, Generator<any>['options']['encodeOptions']]
      | [string, Generator<any>['options']['encodeOptions']]
  ) {
    if (args.length === 3) {
      const [key, encoder, options] = args
      this.generators.set(key, {
        preset: key,
        implementation: ImageMinimizerPlugin.squooshGenerate,
        options: {
          encodeOptions: {
            [encoder]: options,
          },
        },
      })
      return this
    }

    const [key, options] = args
    this.generators.set(key, {
      preset: key,
      implementation: ImageMinimizerPlugin.squooshGenerate,
      options: {
        encodeOptions: {
          [key]: options,
        },
      },
    })
    return this
  }
  /**
   * Get generators as an array
   *
   * @returns Array of {@link Generator}
   * @public
   */
  @bind
  public getGenerators(): Array<[string, Generator<any>]> {
    return [...this.generators.entries()]
  }

  public get encodeOptions(): EncoderOptions {
    return this._encodeOptions
  }
  public set encodeOptions(options: EncoderOptions) {
    this._encodeOptions = options
  }
  @bind
  public encode(key: string, value: any): this {
    this.encodeOptions.set(encoders[key] ?? key, value)
    return this
  }

  @bind
  public override async register(bud: Bud) {
    this.encodeOptions = new Map([
      [`mozjpeg`, {}],
      [`webp`, {quality: 100}],
      [`avif`, {}],
      [`oxipng`, {}],
    ])
    this.generators = new Map()
    this.setGenerator(`webp`, {})
  }

  /**
   * @public
   */
  @bind
  public override async configAfter(bud: Bud) {
    bud.hooks.on(`build.optimization.minimizer`, minimizer => [
      ...(minimizer ?? []),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: this.minifier,
          options: {
            encodeOptions: Object.fromEntries(this.encodeOptions),
          },
        },
        generator: this.getGenerators().map(([key, generator]) => {
          this.logger.log(`instantiating ${key} generator `)
          return generator
        }),
      }),
    ])
  }
}
