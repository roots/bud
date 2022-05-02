import {Dashboard as Base} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind, logUpdate} from '@roots/bud-support'
import {StatsCompilation} from 'webpack'

import {Line} from './line'
import {stats} from './stats'

/**
 * Dashboard service
 *
 * @public
 */
export class Dashboard extends Service implements Base.Service {
  protected hash: string

  public interval: NodeJS.Timer

  public intervalMon: NodeJS.Timer

  public progress = new Line()

  protected output: Array<string>

  protected percent: number

  protected report: string

  @bind
  public async register() {
    if (this.app.context.args.ci || this.app.env.has('TS_JEST')) {
      return
    }

    this.render = logUpdate.createLogUpdate(this.app.context.stdout)
    this.interval = setInterval(this.update, 80)
    this.intervalMon = setInterval(this.monitor, 200)

    this.app.hooks.action('event.app.close', async () => {
      this.interval?.unref()
      this.intervalMon?.unref()
    })
  }

  @bind
  public render(str: string) {
    this.app.context.stdout.write(str)
  }

  @bind
  public update() {
    this.render(this.report ?? this.progress.frame)
    return this
  }

  /**
   * Run dashboard
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public stats(json: StatsCompilation): this {
    if ((this.render as any).clear) (this.render as any).clear()

    this.report = this.app.context.args.ci
      ? this.app.compiler.stats.string.trim()
      : stats.report(json, this.app).join('')

    return this
  }

  @bind
  public monitor() {
    if (this.app.context.args.ci || this.app.env.has('TS_JEST')) {
      this.report && process.stdout.write(this.report)
      return
    }

    if (this.percent == 100 && this.app.isProduction) {
      this.update()
      this.interval.unref()
      this.intervalMon.unref()
      this.app.close()
    }
  }

  /**
   * Progress callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public progressCallback(percent: number, scope: string) {
    try {
      this.percent = Math.ceil((percent ?? 0) * 100)

      const stage =
        (scope.includes(`]`) ? scope.split(`]`).pop()?.trim() : scope) ??
        ``

      if (percent < 100) {
        this.progress.complete(false)
        this.progress.update(stage)
      } else {
        this.progress.complete(true)
      }
    } catch (error) {
      this.app.warn(error)
    }
  }
}
