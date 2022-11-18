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
export class BudImagemin extends Extension {
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
    key: `${keyof GeneratorMap & string}`,
    generator: Generator<any>,
  ): this {
    this.generators.set(key, generator)
    return this
  }

  /**
   * Get generators as an array
   *
   * @returns Array of {@link Generator}
   * @public
   */
  @bind
  public getGenerators(): Array<Generator<any>> {
    return Array.from(this.generators.values())
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
    this.generators = new Map([
      [
        `webp`,
        {
          preset: `webp`,
          implementation: ImageMinimizerPlugin.squooshGenerate,
          options: undefined,
        },
      ],
    ])
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
        generator: this.getGenerators().map(generator => {
          this.logger.log(`instantiating ${generator.preset} generator `)

          return {
            ...generator,
            options: generator.options
              ? generator.options
              : {
                  encodeOptions: {
                    [generator.preset]: this.encodeOptions.get(
                      generator.preset,
                    ),
                  },
                },
          }
        }),
      }),
    ])
  }
}
