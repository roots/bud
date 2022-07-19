/* eslint-disable no-console */
import {Dashboard as Base, Service} from '@roots/bud-framework'
import chalk from 'chalk'
import {bind} from 'helpful-decorators'
import {MultiProgressBars} from 'multi-progress-bars'
import readline from 'node:readline'
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

  public lastHash: string = null

  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async bootstrap() {
    this.progress = new MultiProgressBars({
      initMessage: '',
      anchor: 'bottom',

      border: true,
    })

    this.progress.addTask('build', {
      message: 'initializing',
      type: 'percentage',
      percentage: 0,
      barTransformFn: bar => chalk.hex(theme.foregroundColor)(bar),
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
    this.lastHash = stats.hash

    if (this.app.context.args.ci) {
      process.stdout.write(this.app.compiler.stats.string.trim())
      return this
    }

    const blank = '\n'.repeat(process.stdout.rows * 0.66)
    console.log(blank)

    readline.cursorTo(process.stdout, 0, 0)
    readline.cursorTo(process.stderr, 0, 0)

    readline.clearScreenDown(process.stdout)
    reporter.render({
      stats,
      errors,
      warnings,
      app: this.app,
    })
    this.progress.updateTask('build', {percentage: 1})

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
