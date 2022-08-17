/* eslint-disable no-console */
import {Dashboard as Base, Service} from '@roots/bud-framework'
import {bind} from 'helpful-decorators'
import type * as Ink from 'ink'
import {toInteger} from 'lodash-es'
import type {StatsCompilation} from 'webpack'

/**
 * Dashboard service
 *
 * @public
 */
export class Dashboard extends Service implements Base.Service {
  /**
   * Ink instance
   * @public
   */
  public instance: Ink.Instance

  /**
   * Ink instance
   * @public
   */
  public instance: Ink.Instance

  /**
   * Last hash
   *
   * @public
   */
  public lastHash: string

  /**
   * Build progress
   *
   * @public
   */
  public percentage: number = 0

  /**
   * log to stdout
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public log(...strings: Array<string>): void {
    this.app.context.stdout.write(strings.join(``))
  }

  /**
   * Run dashboard
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async stats({
    stats: compilationStats,
  }: {
    stats: StatsCompilation
  }): Promise<this> {
    if (!compilationStats) return this

    if (this.app.context.args.ci) {
      this.log(compilationStats?.toString())
      return this
    }

    try {
      const {renderDashboard} = await import(`./render/renderer.js`)
      const stats: StatsCompilation = compilationStats.toJson()
      if (!stats || stats.hash === this.lastHash) return this
      this.lastHash = stats.hash
      this.instance = renderDashboard({
        stats,
        app: this.app,
      })
    } catch (error) {
      this.log(error)
      this.log(compilationStats?.toString())
      return this
    }

    if (this.app.isProduction) {
      await this.instance?.waitUntilExit().then(() => {
        this.app.compiler.compilation.running
          ? this.app.compiler.compilation.close(() =>
              setTimeout(this.app.close, 200),
            )
          : setTimeout(this.app.close, 200)
      })
    }

    return this
  }

  /**
   * Progress callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public progressCallback(percentage: number): void {
    if (!percentage || this.app.context.args.ci) return
    this.percentage = toInteger(percentage * 100)
  }
}
