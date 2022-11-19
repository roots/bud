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
type Minimizer = Plugin.PluginOptions<any, any>
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
  public setMinimizer(label: string, options: Minimizer) {
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
  ) {
    if (args.length === 3) {
      const [id, key, value] = args
      const current = this.getMinimizer(id)

      this.setMinimizer(id, {
        ...current,
        [key]: typeof value === `function` ? value(current[key]) : value,
      })

      return this
    }

    const [id, value] = args
    const current = this.getMinimizer(id)

    this.setMinimizer(id, {
      ...current,
      minimizer:
        typeof value === `function` ? value(current.minimizer) : value,
    })

    return this
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
  public setGenerator(label: string, generator?: Partial<Generator>) {
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
   * {@link Extension.register}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async register(_bud: Bud) {
    this.minimizers = new Map()
    this.generators = new Map()

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
    })

    this.setGenerator(`webp`, {options: {encodeOptions: {webp: {}}}})
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
