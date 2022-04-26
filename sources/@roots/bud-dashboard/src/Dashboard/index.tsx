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
    const jsonStats = compilerStats.toJson(),
      stringStats = compilerStats.toString()

    if (jsonStats.hash === this.hash) return

    this.hash = jsonStats.hash
    this.app.context.args.ci
      ? // eslint-disable-next-line no-console
        this.app.context.stdout.write(`\n${stringStats}\n`)
      : stats.write(jsonStats, this.app)
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
