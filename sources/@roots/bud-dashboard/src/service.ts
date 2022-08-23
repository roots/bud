/* eslint-disable no-console */
import {Dashboard as Base, Service} from '@roots/bud-framework'
import {bind} from 'helpful-decorators'
import type * as Ink from 'ink'
import type {StatsCompilation} from 'webpack'

/**
 * Dashboard service
 *
 * @public
 */
export class Dashboard extends Service implements Base.Service {
  /**
   * Service label
   *
   * @public
   */
  public static label = `dashboard`

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

    this.app.log(`\n`)

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
    }

    return this
  }
}
