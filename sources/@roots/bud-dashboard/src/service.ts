/* eslint-disable no-console */
import {Dashboard as Base, Service} from '@roots/bud-framework'
import Progress from 'cli-progress'
import {bind, once} from 'helpful-decorators'
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
   * Interval timer
   *
   * @public
   */
  public progress: Progress.MultiBar
  public build: Progress.SingleBar

  /**
   * Last hash
   *
   * @public
   */
  public lastHash: string

  public log(...strings: Array<string>): void {
    this.app.context.stdout.write(
      strings
        .map(str => str.split('\n'))
        .flat()
        .map(str => ` ${str}\n`)
        .join(''),
    )
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

    this.log('\n')

    if (!this.app.context.args.ci) {
      this.progress = new Progress.MultiBar(
        {
          format: '{bar} {percentage}%',
          forceRedraw: true,
          clearOnComplete: true,
          stopOnComplete: this.app.isProduction,
        },
        Progress.Presets.shades_grey,
      )
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

    if (this.app.context.args.ci) {
      this.log(stats?.toString())
      return this
    }

    const json: StatsCompilation = stats.toJson()
    if (!json || json.hash === this.lastHash) return this

    this.lastHash = json.hash

    /** clears the terminal while preserving history */
    this.app.isDevelopment && this.log('\x1B[2J\x1B[0f')

    await reporter.render({stats: json, app: this.app})

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
  public progressCallback(percentage: number): void {
    if (!percentage || this.app.context.args.ci) return

    const currentProgress = this.build?.getProgress()
    if (!currentProgress) this.build = this.progress.create(100, 0)

    percentage = toInteger(percentage * 100)
    percentage = percentage >= 95 ? 100 : percentage

    this.build.update(percentage)

    if (percentage === 100) {
      this.build.stop()
    }
  }
}
