import type {Bud} from '@roots/bud'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {deprecated} from '@roots/bud-support/decorators/deprecated'
import Plugin from 'stylelint-webpack-plugin'

import {BudStylelintPublicApi} from './base.js'

export type Options = Plugin.Options & {
  config?: Plugin.Options & {
    plugins?: Plugin.Options[`config`][`plugins`] & Array<unknown>
  }
}

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
  public override async register({context}: Bud) {
    const configFile = Object.values(context.files).find(({name}) =>
      name.includes(`stylelint`),
    )
    if (!configFile) return

    this.logger.log(`stylelint config candidate found`, configFile)

    if (!configFile.ext) return

    const config = await configFile.module().catch(e => {
      this.logger.warning(`error importing ${configFile.path}`, e)
    })
    if (!config) {
      this.logger.warning(`stylelint config found but could not be loaded`, configFile)
      return
    }

    this.logger.log(`stylelint config loaded`, config)

    this.setConfig(config)
  }
}
