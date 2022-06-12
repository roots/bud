import {Dashboard as Base, Service} from '@roots/bud-framework'
import {bind} from 'helpful-decorators'
import * as logUpdate from 'log-update'
import {StatsCompilation} from 'webpack'

import {Line} from './render/line.js'
import {reporter} from './render/stats/index.js'

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
  public interval: NodeJS.Timer

  /**
   * Progress
   *
   * @public
   */
  public progress = new Line()

  /**
   * output
   *
   * @public
   */
  protected output: Array<string>

  /**
   * Current progress percentage
   *
   * @public
   */
  protected percent: number

  /**
   * Current frame
   *
   * @public
   */
  protected frame: string = ''

  /**
   * @override
   */
  @bind
  public render(str: string) {
    this.app.context.stdout.write(str)
  }

  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    if (this.app.context.args.ci || this.app.env.has('JEST_WORKER_ID')) {
      return
    }

    this.render = logUpdate.createLogUpdate(this.app.context.stdout)
    this.interval = setInterval(this.update, 80)

    this.app.hooks.action('event.app.close', async () =>
      this.interval.unref(),
    )
  }

  /**
   * Update cli
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public update() {
    !this.progress.isComplete &&
      this.progress.frame &&
      this.render(this.progress.frame)

    return this
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
    this.progress.complete(true)

    this.frame = this.app.context.args.ci
      ? this.app.compiler.stats.string.trim()
      : reporter.report({stats, errors, warnings, app: this.app})

    this.app.context.stdout.write(this.frame)

    return this
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
      this.progress.complete(this.percent >= 99)

      const update = scope.includes(`]`)
        ? scope.split(`]`).pop()?.trim()
        : scope

      this.progress.update(`${this.percent}%`, update)
      this.update()
    } catch (error) {
      this.app.warn(error)
    }
  }
}
