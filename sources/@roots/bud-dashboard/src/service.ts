/* eslint-disable no-console */
import {Dashboard as Base, Service} from '@roots/bud-framework'
import {bind} from 'helpful-decorators'
import {toInteger} from 'lodash-es'
import type {StatsCompilation} from 'webpack'

import * as reporter from './render/reporter.js'

/**
 * Dashboard service
 *
 * @public
 */
export class Dashboard extends Service implements Base.Service {
  /**
   * Last hash
   *
   * @public
   */
  public lastHash: string

  /**
   * Build progress
   *
   * @public
   */
  public percentage: number = 0

  /**
   * log to stdout
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public log(...strings: Array<string>): void {
    !strings[0].startsWith('\n') && strings.unshift('\n')
    this.app.context.stdout.write(strings.join(''))
  }

  /**
   * Run dashboard
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async stats({
    stats: compilationStats,
  }: {
    stats: StatsCompilation
  }): Promise<this> {
    if (!compilationStats) return this

    if (this.app.context.args.ci) {
      this.log(compilationStats?.toString())
      return this
    }

    const stats: StatsCompilation = compilationStats.toJson()
    if (!stats || stats.hash === this.lastHash) return this
    this.lastHash = stats.hash

    reporter.renderResults({stats, app: this.app})

    if (this.app.isProduction) {
      this.app.compiler.compilation.running
        ? this.app.compiler.compilation.close(() => this.app.close())
        : this.app.close()
    }

    return this
  }

  /**
   * Progress callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public progressCallback(percentage: number): void {
    if (!percentage || this.app.context.args.ci) return
    this.percentage = toInteger(percentage * 100)
  }
}
