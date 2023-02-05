import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  disabled,
  label,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'fork-ts-checker-webpack-plugin'
import type {ForkTsCheckerWebpackPluginOptions as Options} from 'fork-ts-checker-webpack-plugin/lib/plugin-options.js'

@label(`@roots/bud-typescript/typecheck`)
@plugin(Plugin)
@disabled
export default class BudTypeCheckPlugin extends Extension<
  Options,
  Plugin
> {
  /**
   * `init` callback
   */
  @bind
  public override async init?(bud: Bud) {
    const typescriptPath = await this.resolve(`typescript`)

    this.setOptions({
      async: true,
      logger: {
        log: this.logger.log,
        error: this.logger.error,
      },
      typescript: {
        configFile: bud.path(`tsconfig.json`),
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: `readonly`,
        typescriptPath,
      },
    })
  }
}
