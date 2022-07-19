/* eslint-disable no-console */
import {Dashboard as Base, Service} from '@roots/bud-framework'
import chalk from 'chalk'
import {bind} from 'helpful-decorators'
import {MultiProgressBars} from 'multi-progress-bars'
import type {StatsCompilation} from 'webpack'

import * as reporter from './render/reporter.js'
import {theme} from './theme.js'

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
  public lastHash: string = null

  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    this.app.hooks.action('compiler.after', async () => {
      if (this.app.context.args.ci) return

      this.progress = new MultiProgressBars({
        initMessage: '',
        border: true,
        anchor: 'top',
        footer: true,
        header: true,
      })
    })
  }

  /**
   * Run dashboard
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public stats({
    stats,
    errors,
    warnings,
  }: {
    stats: StatsCompilation
    errors: any
    warnings: any
  }): this {
    if (!stats) return this
    if (stats.hash == this.lastHash) return this

    if (this.app.context.args.ci) {
      console.log(`\n${this.app.compiler.stats.string.trim()}\n`)
      return this
    }

    this.app.logger.instance.enable()

    this.progress.updateTask('build', {percentage: 1})

    reporter.render({
      stats,
      errors,
      warnings,
      app: this.app,
    })

    this.progress.updateTask('build', {percentage: 1})

    this.lastHash = stats.hash
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
    try {
      if (this.app.context.args.ci) return

      if (!this.progress.getIndex('build')) {
        this.progress.addTask('build', {
          type: 'percentage',
          percentage: 0,
          barTransformFn: bar => chalk.hex(theme.foregroundColor)(bar),
        })
      }

      const update = scope.includes(`]`)
        ? scope.split(`]`).pop()?.trim()
        : scope

      this.progress.updateTask('build', {percentage})

      if (percentage !== 1) {
        this.progress.updateTask('build', {
          barTransformFn: bar => chalk.hex(theme.foregroundColor)(bar),
          message: update ? `${update} ${message.join(' ')}`.trim() : '',
        })
      } else if (this.app.compiler.stats?.json?.errorsCount > 0) {
        this.progress.updateTask('build', {
          barTransformFn: bar => chalk.hex(theme.red)(bar),
        })
      } else if (this.app.compiler.stats?.json?.errorsCount === 0) {
        this.progress.updateTask('build', {
          barTransformFn: bar => chalk.hex(theme.green)(bar),
        })
      }
    } catch (error) {
      this.app.warn(error)
    }
  }
}
