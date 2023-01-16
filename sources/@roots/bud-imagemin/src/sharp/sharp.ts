import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'image-minimizer-webpack-plugin'
import type { SharpEncodeOptions } from 'image-minimizer-webpack-plugin/types/utils.js'

import type {
  Generator,
  GeneratorMap,
} from '../index.js'

/**
 * `@roots/bud-imagemin/sharp`
 *
 * @see {@link https://bud.js.org/extensions/bud-imagemin}
 *
 * @decorator `@label`
 * @decorator `@options`
 */
@label(`@roots/bud-imagemin/sharp`)
@options({encodeOptions: {}})
export class BudImageminSharp extends Extension {
  public generators: GeneratorMap

  public implementation: any

  @bind
  public async setEncodeOptions(options: SharpEncodeOptions) {
    this.setOption(`encodeOptions`, options)
  }

  /**
   * Get generator
   *
   * @param key - key of {@link BudImageminExtension.generators}
   * @returns generator - value of {@link BudImageminExtension.generators}
   *
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
   */
  @bind
  public setGenerator(
    label: string,
    generator?: Partial<Generator>,
  ): this {
    this.generators.set(label, {
      preset: label,
      implementation: Plugin.sharpGenerate,
      ...generator,
    })

    return this
  }

  /**
   * Get generators as an array
   *
   * @returns Array of {@link Generator}
   */
  @bind
  public getGenerators(): Array<Generator> {
    return [...this.generators.values()]
  }

  /**
   * {@link Extension.init}
   *
   * @decorator `@bind`
   */
  @bind
  public override async init() {
    this.generators = new Map()
    this.implementation = Plugin.sharpMinify
    this.setGenerator(`webp`, {options: {encodeOptions: {webp: {}}}})
  }

  /**
   * {@link Extension.configAfter}
   *
   * @decorator `@bind`
   */
  @bind
  public override async configAfter(bud: Bud) {
    bud.hooks.on(`build.optimization.minimizer`, (minimizer = []) => [
      ...minimizer,
      new Plugin({
        test: bud.hooks.filter(`pattern.image`),
        minimizer: {
          implementation: this.implementation,
          options: this.options,
        },
      }),
      new Plugin({generator: this.getGenerators()}),
    ])
  }
}
