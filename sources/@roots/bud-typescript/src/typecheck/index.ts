import {type Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
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
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
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
      },
    })
  }
}
