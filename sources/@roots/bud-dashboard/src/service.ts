/* eslint-disable no-console */
import {Dashboard as Base, Service} from '@roots/bud-framework'
import chalk from 'chalk'
import Progress from 'cli-progress'
import {bind, once} from 'helpful-decorators'
import {toInteger} from 'lodash-es'
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
  public progress: Progress.SingleBar

  /**
   * Last hash
   *
   * @public
   */
  public lastHash: string

  public log(...strings: Array<string>): void {
    strings
      .map(str => str.split('\n'))
      .flat()
      .map(str => this.app.context.stdout.write(` ${str}\n`))
  }

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

    this.log('')

    if (!this.app.context.args.ci) {
      this.progress = new Progress.SingleBar(
        {
          format:
            '{scope} ' +
            chalk.hex(theme.foregroundColor)('{bar}') +
            ' {percentage}%',
          linewrap: true,
          hideCursor: false,
          emptyOnZero: true,
          forceRedraw: false,
          fps: 60,
          stream: this.app.context.stdout,
          autopadding: false,
        },
        Progress.Presets.shades_classic,
      )

      this.app.hooks.action('build.after', async () => {
        this.progress.start(100, 0, {scope: 'initializing'})
      })
    }
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

    this.log('\n')

    if (this.app.context.args.ci) {
      this.log(stats?.toString())
      return this
    }

    const json: StatsCompilation = stats.toJson()

    if (!json) return this

    await reporter.render({stats, app: this.app})

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
   */
  @bind
  public progressCallback(percentage: number, scope: string): void {
    if (!percentage || !scope || this.app.context.args.ci) return

    percentage = toInteger(percentage * 100)
    scope = scope.split(']').splice(1).join('')
    if (percentage)
      this.progress.update(percentage >= 95 ? 100 : percentage, {scope})
  }
}
