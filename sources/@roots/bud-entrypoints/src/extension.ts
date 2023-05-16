import {Extension} from '@roots/bud-framework/extension'
import {
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import type {Options} from '@roots/entrypoints-webpack-plugin'
import type {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'

@label(`@roots/bud-entrypoints`)
@expose(`entrypoints`)
@options({emitHtml: false})
export class BudEntrypoints extends Extension<
  Options,
  EntrypointsWebpackPlugin
> {
  /**
   * {@label Extension.make}
   */
  public override async make?() {
    const {EntrypointsWebpackPlugin} = await import(
      `@roots/entrypoints-webpack-plugin`
    )

    return new EntrypointsWebpackPlugin(this.options)
  }
}
