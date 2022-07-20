/* eslint-disable no-console */
import {Dashboard as Base, Service} from '@roots/bud-framework'
import {bind, once} from 'helpful-decorators'
import {MultiProgressBars} from 'multi-progress-bars'
import type {StatsCompilation} from 'webpack'

import * as reporter from './render/reporter.js'

/**
 * Dashboard service
 *
 * @public
 */
export class Dashboard extends Service implements Base.Service {
  /**
   * Interval timer
   *
   * @public
   */
  public progress: MultiProgressBars

  /**
   * Last hash
   *
   * @public
   */
  public lastHash: string

  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  @once
  public async register() {
    this.progress = new MultiProgressBars({
      initMessage: '',
      border: true,
      anchor: 'top',
      footer: true,
      header: false,
    })

    this.progress.addTask('build', {
      message: 'initializing',
      type: 'percentage',
      percentage: 0,
    })
  }

  /**
   * Run dashboard
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public stats({stats}: {stats: StatsCompilation}): this {
    if (!stats) return this

    if (this.app.context.args.ci) {
      console.log(stats?.toString())
      this.app.isProduction &&
        this.app.compiler.compilation.close(() => this.app.close())

      return this
    }

    const json: StatsCompilation = stats.toJson()
    if (!json) return this

    reporter.render({stats, app: this.app})

    this.app.isProduction &&
      this.app.compiler.compilation.close(() => this.app.close())

    return this
  }

  /**
   * Progress callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public progressCallback(
    percentage: number,
    scope: string,
    ...message: any[]
  ): void {
    if (this.app.context.args.ci) return

    try {
      const update = scope.includes(`]`)
        ? scope.split(`]`).pop()?.trim()
        : scope

      if (typeof percentage === 'number') {
        this.progress.updateTask('build', {percentage})

        if (percentage !== 1) {
          this.progress.updateTask('build', {
            percentage,
            message: update ? `${update} ${message.join(' ')}`.trim() : '',
          })
        }
      }
    } catch (error) {
      this.app.warn(error)
    }
  }
}
