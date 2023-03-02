import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'image-minimizer-webpack-plugin'
import type {SharpEncodeOptions} from 'image-minimizer-webpack-plugin/types/utils.js'

import type {Generator, GeneratorMap} from '../index.js'

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

  public implementation: typeof Plugin.sharpGenerate

  /**
   * Set encode options
   */
  @bind
  public async setEncodeOptions<K extends keyof SharpEncodeOptions>(
    key: K,
    value: SharpEncodeOptions[K],
  ) {
    this.set(`encodeOptions.${key}`, value)
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
   *
   * @decorator `@bind`
   */
  @bind
  public override async configAfter(bud: Bud) {
    this.configureBudMinimizer(bud)
    if (this.generators.size <= 0) return
    this.configureBudGenerators(bud)
  }

  @bind
  public configureBudGenerators(bud: Bud) {
    bud.hooks.on(`build.optimization.minimizer`, (minimizers = []) => [
      ...minimizers,
      new Plugin({generator: [...this.generators.values()]}),
    ])
  }

  @bind
  public configureBudMinimizer(bud: Bud) {
    bud.hooks.on(`build.optimization.minimizer`, (minimizers = []) => [
      ...minimizers,
      new Plugin({
        test: bud.hooks.filter(`pattern.image`),
        minimizer: {
          implementation: this.implementation,
          options: this.options,
        },
      }),
    ])
  }
}
