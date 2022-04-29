import {Dashboard as Base} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind, Signale} from '@roots/bud-support'
import {StatsCompilation} from 'webpack'

import {instance} from './logger'
import {stats} from './stats'

/**
 * Dashboard service
 *
 * @public
 */
export class Dashboard extends Service implements Base.Service {
  protected hash: string

  protected jsonStats: StatsCompilation

  protected stringStats: string

  protected dashboardLogger: Signale = instance

  protected progress: [number, string] = [0, ``]

  /**
   * Run dashboard
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public stats(compilerStats: StatsCompilation): void {
    if (!compilerStats) return

    this.jsonStats = compilerStats.toJson()
    this.stringStats = compilerStats.toString()

    if (!this.jsonStats) {
      this.renderCI()
      return
    }

    if (this.jsonStats.hash === this.hash) return
    this.hash = this.jsonStats.hash

    this.app.context.args.ci ? this.renderCI() : this.render()
  }

  @bind
  public renderCI() {
    this.app.context.stdout.write(`\n${this.stringStats}\n`)
  }

  @bind
  public render() {
    try {
      stats.write(this.jsonStats, this.app)
    } catch {
      this.renderCI()
    }
  }

  /**
   * Progress callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public progressCallback(
    percent: number,
    scope: string,
    ...message: any[]
  ) {
    try {
      percent = Math.ceil((percent ?? 0) * 100)

      message = (
        message ? message.flatMap(i => (i ? `${i}`?.trim() : ``)) : []
      ).reverse()

      const stage =
        (scope.includes(`]`) ? scope.split(`]`).pop()?.trim() : scope) ??
        ``

      this.progress = [percent, `${stage} ${message.join(` `)}`]

      const shouldLog = ![
        !stage,
        stage === 'cache',
        stage === 'done',
        !message?.length,
      ].includes(true)

      shouldLog &&
        this.dashboardLogger
          .scope(
            `${percent}%`,
            stage,
            ...message.splice(0, message.length - 1),
          )
          .log(...message)
    } catch (error) {
      this.app.warn(error)
    }
  }
}
