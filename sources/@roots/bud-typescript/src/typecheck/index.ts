import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  disabled,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'fork-ts-checker-webpack-plugin'
import type {ForkTsCheckerWebpackPluginOptions as Options} from 'fork-ts-checker-webpack-plugin/lib/plugin-options.js'

@label(`@roots/bud-typescript/typecheck`)
@plugin(Plugin)
@options<Options>({
  async: () => false,
  typescript: () => ({
    diagnosticOptions: {
      semantic: true,
      syntactic: true,
    },
    mode: `readonly`,
  }),
})
@disabled
export default class BudTypeCheckPlugin extends Extension<
  Options,
  Plugin
> {
  /**
   * Enable typechecking
   *
   * @override
   * @decorator `@bind`
   */
  @bind public override async enable(state: boolean = true) {
    this.app.extensions
      .get(`@roots/bud-typescript`)
      .setOption(`transpileOnly`, !state)

    this.logger.log(
      `transpileOnly set to ${this.app.extensions
        .get(`@roots/bud-typescript`)
        .getOption(`transpileOnly`)}`,
    )
  }

  /**
   * `init` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind public override async init?(bud: Bud) {
    const typescriptPath = await this.resolve(`typescript`)

    this.setOptions(options => ({
      ...options,
      logger: {
        log: this.logger.log,
        error: this.logger.error,
      },
      typescript: {
        ...(options.typescript ?? {}),
        typescriptPath,
      },
    }))
  }
}
