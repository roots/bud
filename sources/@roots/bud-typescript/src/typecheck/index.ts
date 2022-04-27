import {Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  options,
  plugin,
  when,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'fork-ts-checker-webpack-plugin'
import type {ForkTsCheckerWebpackPluginOptions as Options} from 'fork-ts-checker-webpack-plugin/lib/plugin-options'

@label('@roots/bud-typescript/typecheck')
@plugin(Plugin)
@options<Options>({
  async: false,
  typescript: {
    diagnosticOptions: {
      semantic: true,
      syntactic: true,
    },
  },
})
@when(async () => false)
export default class BudTypeCheckPlugin extends Extension<
  Options,
  Plugin
> {
  @bind
  public async init() {
    this.options.typescript.typescriptPath = this.resolve('typescript')
  }
}
