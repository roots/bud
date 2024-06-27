import type {Bud} from '@roots/bud'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {BudStylelintPublicApi} from '@roots/bud-stylelint/extension/base'
import {deprecated} from '@roots/bud-support/decorators/deprecated'
import noop from '@roots/bud-support/noop'
import Plugin from 'stylelint-webpack-plugin'

export type Options = {
  config?: {
    plugins?: Array<unknown> & Plugin.Options[`config`][`plugins`]
  } & Plugin.Options
} & Plugin.Options

/**
 * Bud stylelint extension
 */
@label(`@roots/bud-stylelint`)
@expose(`stylelint`)
@plugin(Plugin)
export default class BudStylelintWebpackPlugin extends BudStylelintPublicApi {
  /**
   * Fail build on stylelint error
   *
   * @deprecated Use {@link Extension.setFailOnError} instead
   *
   * @example
   * ```js
   * bud.stylelint.setFailOnError(true)
   * ```
   */
  @deprecated(`bud.stylelint`, `use bud.stylelint.set instead`, [
    [`Fail on error`, `bud.stylelint.set(\`failOnError\`, true)`],
  ])
  public failOnError(fail: boolean = true): this {
    this.set(`failOnError`, fail)
    return this
  }

  /**
   * Fail build on stylelint warning
   *
   * @deprecated Use {@link Extension.set} instead
   *
   * @example
   * ```js
   * bud.stylelint.set(`failOnWarning`, true)
   * ```
   */
  @deprecated(`bud.stylelint`, `use bud.stylelint.set instead`, [
    [`Fail on warning`, `bud.stylelint.set(\`failOnWarning\`, true)`],
  ])
  public failOnWarning(fail: boolean = true): this {
    this.set(`failOnWarning`, fail)
    return this
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({context, module}: Bud) {
    const stylelintPath = await module
      .resolve(`stylelint`, import.meta.url)
      .catch(noop)

    if (stylelintPath) {
      this.logger.log(`setting stylelint path:`, stylelintPath)
      // stylelint v16 is an esm module, but stylelint-webpack-plugin doesn't currently support it
      this.setStylelintPath(stylelintPath.replace(/(.*)\.mjs$/, `$1.cjs`))
    }

    const configFile = Object.values(context.files).find(({name}) =>
      name.includes(`stylelint`),
    )
    if (!configFile?.ext) return

    const config = await configFile.module().catch(e => {
      this.logger.warn(`error importing ${configFile.path}`, e)
    })

    if (!config) return

    this.setConfig(config)
    this.logger.log(`stylelint config loaded`, this.getConfig())
  }
}
