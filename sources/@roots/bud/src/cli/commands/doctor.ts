/* eslint-disable no-console */
import {bind, Signale} from '@roots/bud-support'
import Webpack from 'webpack'
import webpackcli from 'webpack-cli'

import {Command} from '../Command/index.js'

/**
 * @internal
 */
export default class Doctor extends Command {
  /**
   * @internal
   */
  public static id = 'doctor'

  /**
   * @internal
   */
  public static description = 'diagnose issues'

  /**
   * @internal
   */
  public static examples = [`$ bud doctor`]

  /**
   * @internal
   */
  public conf: Array<Webpack.Configuration>

  /**
   * @internal
   */
  public async run(): Promise<void> {
    await this.prime(Doctor)

    this.logger = new Signale({scope: 'doctor'})

    await this.checkConfiguration()
  }

  /**
   * @param logger - logger instance
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public async checkConfiguration() {
    try {
      /* Instantiate webpack-cli */
      const cli = new webpackcli()
      const webpack = await cli.loadWebpack()

      /* Build webpack configuration */
      await this.build()
      this.conf = await this.app.compiler.before()

      if (!this.conf) {
        throw new Error('config not returned from bud compiler.')
      }

      if (!Array.isArray(this.conf)) {
        this.logger.info('the bud compiler should always return an array.')
        throw new Error('compiler did not return an array')
      }

      webpack.validate(this.conf)
      this.logger.success(`webpack configuration is valid`)
    } catch (error) {
      this.logger.error(error)
    }
  }
}
