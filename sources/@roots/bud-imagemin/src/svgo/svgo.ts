import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'image-minimizer-webpack-plugin'
import type {SvgoEncodeOptions} from 'image-minimizer-webpack-plugin/types/utils.js'

/**
 * `@roots/bud-imagemin/svgo`
 *
 * @see {@link https://bud.js.org/extensions/bud-imagemin}
 *
 * @decorator `@label`
 * @decorator `@options`
 */
@label(`@roots/bud-imagemin/svgo`)
@options({encodeOptions: {}})
export class BudImageminSvgo extends Extension {
  public implementation: any

  @bind
  public async setEncodeOptions(options: SvgoEncodeOptions) {
    this.setOption(`encodeOptions`, {
      ...this.options.encodeOptions ?? {},
      ...options,
    })
  }

  /**
   * {@link Extension.init}
   *
   * @decorator `@bind`
   */
  @bind
  public override async init() {
    this.implementation = Plugin.svgoMinify
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
        test: bud.hooks.filter(`pattern.svg`),
        minimizer: {
          implementation: this.implementation,
          options: {
            encodeOptions: this.options.encodeOptions ?? {},
          },
        },
      }),
    ])
  }
}
