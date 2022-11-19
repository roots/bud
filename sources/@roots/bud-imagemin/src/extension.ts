import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import Plugin, {
  Generator as ImageminGenerator,
} from 'image-minimizer-webpack-plugin'

type Generator = ImageminGenerator<any>
type Minimizer = {
  [key: string]: any
}
type MinimizerMap = Map<string, Minimizer>
type GeneratorMap = Map<string, Generator>
type MutateMinimizerOptions<K extends `${keyof Minimizer & string}`> = (
  minimizer: Minimizer[K],
) => Minimizer[K]
type ConfigureMinimizerArgs = [
  string,
  Partial<MutateMinimizerOptions<`minimizer`>>,
]
type ConfigureMinimizerByKeyArgs<K extends `${keyof Minimizer & string}`> =
  [string, K, Minimizer[K] | Partial<MutateMinimizerOptions<K>>]

/**
 * `@roots/bud-imagemin`
 *
 * @see {@link https://bud.js.org/extensions/bud-imagemin}
 *
 * @public
 * @decorator `@label`
 * @decorator `@expose`
 */
@label(`@roots/bud-imagemin`)
@expose(`imagemin`)
export class BudImageminExtension extends Extension {
  /**
   * Encoders
   *
   * @public
   */
  public encoders: Map<string, [string, string]>

  /**
   * Minimizers
   *
   * @public
   */
  public minimizers: MinimizerMap
  /**
   * Generators
   *
   * @public
   */
  public generators: GeneratorMap

  /**
   * Get minimizer
   *
   * @param key - key of {@link BudImageminExtension.minimizers}
   * @returns minimizer - value of {@link BudImageminExtension.minimizers}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getMinimizer(key: string): Minimizer {
    return this.minimizers.get(key)
  }

  /**
   * Set minimizer
   *
   * @param label - {@link string}
   * @param options - {@link Minimizer}
   * @returns instance - {@link BudImageminExtension}
   *
   * @public
   */
  @bind
  public setMinimizer(label: string, options: Minimizer): this {
    this.minimizers.set(label, {
      ...options,
      minimizer: {
        implementation: Plugin.squooshMinify,
        ...(options?.minimizer ?? {}),
      },
    })

    return this
  }

  /**
   * Get minimizers as an array
   *
   * @returns Array of {@link Minimizer}
   * @public
   */
  @bind
  public getMinimizers(): Array<Minimizer> {
    return [...this.minimizers.values()]
  }

  /**
   * Configure minimizer
   *
   * @see {@link https://bud.js.org/extensions/bud-imagemin}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public configure<K extends `${keyof Minimizer & string}`>(
    ...args: ConfigureMinimizerByKeyArgs<K> | ConfigureMinimizerArgs
  ): this {
    const [id, key, value] =
      args.length === 3 ? args : [args[0], `minimizer`, args[1]]

    const current = this.getMinimizer(id)

    return this.setMinimizer(id, {
      ...(current ?? {}),
      [key]: typeof value === `function` ? value(current[key]) : value,
    })
  }

  /**
   * Get generator
   *
   * @param key - key of {@link BudImageminExtension.generators}
   * @returns generator - value of {@link BudImageminExtension.generators}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getGenerator(key: string): Generator {
    return this.generators.get(key)
  }

  /**
   * Set generator
   *
   * @param label - key of {@link BudImageminExtension.generators}
   * @param generator - value of {@link Generator}
   * @returns instance - {@link BudImageminExtension}
   *
   * @public
   */
  @bind
  public setGenerator(
    label: string,
    generator?: Partial<Generator>,
  ): this {
    this.generators.set(label, {
      preset: label,
      implementation: Plugin.squooshGenerate,
      ...generator,
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
  public getGenerators(): Array<Generator> {
    return [...this.generators.values()]
  }

  /**
   * Encode
   *
   * @param key - encoder key
   * @param options - encoder options
   */
  @bind
  public encode(key: string, options: {}): this {
    const [minimizer, encoder] = this.encoders.get(key)

    const transform = (minimizer: Minimizer): Minimizer => ({
      ...minimizer,
      options: {
        ...minimizer?.options,
        encodeOptions: {
          ...minimizer?.options?.encodeOptions,
          [encoder]: options,
        },
      },
    })

    return this.configure(minimizer, transform)
  }

  /**
   * {@link Extension.init}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async init(_bud: Bud): Promise<void> {
    this.minimizers = new Map()
    this.generators = new Map()
    this.encoders = new Map([
      [`jpg`, [`squoosh`, `mozjpeg`]],
      [`jpeg`, [`squoosh`, `mozjpeg`]],
      [`mozjpeg`, [`squoosh`, `mozjpeg`]],
      [`avif`, [`squoosh`, `avif`]],
      [`png`, [`squoosh`, `oxipng`]],
      [`oxipng`, [`squoosh`, `oxipng`]],
      [`wp2`, [`squoosh`, `wp2`]],
      [`jxl`, [`squoosh`, `jxl`]],
    ])
  }

  /**
   * {@link Extension.register}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async register(_bud: Bud) {
    this.setMinimizer(`squoosh`, {
      minimizer: {
        implementation: Plugin.squooshMinify,
        options: {
          encodeOptions: {
            mozjpeg: {},
            webp: {},
            avif: {},
            oxipng: {},
            wp2: {},
            jxl: {},
          },
        },
      },
    }).setGenerator(`webp`, {options: {encodeOptions: {webp: {}}}})
  }

  /**
   * {@link Extension.configAfter}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async configAfter(bud: Bud) {
    bud.hooks.on(`build.optimization.minimizer`, minimizer => [
      ...(minimizer ?? []),
      ...this.getMinimizers().map((value: Minimizer) => new Plugin(value)),
      new Plugin({generator: this.getGenerators()}),
    ])
  }
}
