/* eslint-disable no-console */
import {Dashboard as Base, Service} from '@roots/bud-framework'
import figures from 'figures'
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
    if (this.app.context.args.ci) return

    this.progress = new MultiProgressBars({
      initMessage: '',
      border: false,
      anchor: 'top',
      footer: true,
      header: false,
      persist: true,
    })

    this.progress.setHeader(
      figures.ellipsis.concat(` `).concat(this.app.name),
    )
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
  public async stats({
    stats,
  }: {
    stats: StatsCompilation
  }): Promise<unknown> {
    if (!stats) return this

    if (this.app.context.args.ci) {
      console.log(stats?.toString())
      return this
    }

    const json: StatsCompilation = stats.toJson()

    if (!json) return this

    await reporter.render({stats, app: this.app})

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

      if (percentage !== 1) {
        this.progress.updateTask('build', {
          percentage,
          message: update ? `${update} ${message.join(' ')}`.trim() : '',
        })
      } else {
        this.progress.updateTask('build', {
          percentage,
          message: 'built',
        })
      }
    } catch (error) {
      this.app.warn(error)
    }
  }
}
