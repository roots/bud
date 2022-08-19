import {Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  options,
  plugin,
  when,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'fork-ts-checker-webpack-plugin'
import type {ForkTsCheckerWebpackPluginOptions as Options} from 'fork-ts-checker-webpack-plugin/lib/plugin-options.js'

@label(`@roots/bud-typescript/typecheck`)
@plugin(Plugin)
@options<Options>({
  async: false,
  typescript: {
    diagnosticOptions: {
      semantic: true,
      syntactic: true,
    },
    mode: `readonly`,
  },
})
@when(async () => false)
export default class BudTypeCheckPlugin extends Extension<
  Options,
  Plugin
> {
  /**
   * Enable typechecking
   *
   * @override {@link Extension.enable}
   * @decorator `@bind`
   */
  @bind public async enable(state: boolean = true) {
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
  @bind public async init() {
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
