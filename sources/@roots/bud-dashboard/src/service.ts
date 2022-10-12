/* eslint-disable no-console */
import {Service} from '@roots/bud-framework/service'
import type * as Services from '@roots/bud-framework/services'
import {bind, debounce} from '@roots/bud-support/decorators'
import type * as Ink from '@roots/bud-support/ink'
import type {StatsCompilation} from 'webpack'

/**
 * Dashboard service
 *
 * @public
 */
export class Dashboard
  extends Service
  implements Services.Dashboard.Service
{
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
   * Run dashboard
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  @debounce(100)
  public async stats({
    stats: compilationStats,
  }: {
    stats: StatsCompilation
  }): Promise<this> {
    if (!compilationStats) return this

    if (this.app.context.args?.log === false) {
      if (compilationStats.hasErrors() && this.app.isProduction)
        this.app.fatal(new Error(`compilation completed but had errors`))
      return
    }

    if (this.app.context.args?.ci) {
      console.log(
        compilationStats?.toString(
          // @ts-ignore
          {preset: `normal`, colors: true},
        ),
      )

      if (compilationStats.hasErrors() && this.app.isProduction)
        this.app.fatal(new Error(`compilation completed but had errors`))

      return this
    }

    try {
      const {renderDashboard} = await import(`./render/renderer.js`)

      const stats: StatsCompilation = compilationStats.toJson({
        preset: `normal`,
        children: true,
      })

      if (!stats || stats.hash === this.lastHash) return this
      this.lastHash = stats.hash
      this.instance = renderDashboard({
        stats,
        app: this.app,
      })
      await this.instance.waitUntilExit()
    } catch (error) {
      this.app.context.stdout.write(
        compilationStats?.toString(
          // @ts-ignore
          {colors: true},
        ),
      )
      this.logger.error(error)
      throw error
    }

    if (compilationStats.hasErrors() && this.app.isProduction)
      this.app.fatal(new Error(`compilation completed but had errors`))

    return this
  }
}
