import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'image-minimizer-webpack-plugin'

import {configure} from './configure/configure.js'
import {encode} from './encode/encode.js'
import type {
  Generator,
  GeneratorMap,
  Minimizer,
  MinimizerMap,
} from './index.js'

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
   * Configure
   */
  public configure: configure = configure

  /**
   * Encode
   */
  public encode: encode = encode

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
   * {@link Extension.init}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async init(_bud: Bud): Promise<void> {
    this.configure = this.configure.bind(this)
    this.encode = this.encode.bind(this)

    this.minimizers = new Map()
    this.generators = new Map()

    this.encoders = new Map()
  }

  /**
   * {@link Extension.register}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async register(_bud: Bud) {
    this.encoders
      .set(`jpg`, [`squoosh`, `mozjpeg`])
      .set(`jpeg`, [`squoosh`, `mozjpeg`])
      .set(`mozjpeg`, [`squoosh`, `mozjpeg`])
      .set(`avif`, [`squoosh`, `avif`])
      .set(`png`, [`squoosh`, `oxipng`])
      .set(`oxipng`, [`squoosh`, `oxipng`])
      .set(`wp2`, [`squoosh`, `wp2`])
      .set(`jxl`, [`squoosh`, `jxl`])

    this.configure(
      `squoosh`,
      `minimizer.implementation`,
      () => Plugin.squooshMinify,
    )
    this.configure(`squoosh`, `minimizer.options.encodeOptions`, {
      mozjpeg: {},
      webp: {},
      avif: {},
      oxipng: {},
      wp2: {},
      jxl: {},
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
