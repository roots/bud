/* eslint-disable no-console */
import {Service} from '@roots/bud-framework/service'
import type * as Services from '@roots/bud-framework/services'
import {bind} from '@roots/bud-support/decorators'
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
   * Set last hash
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setLastHash(hash: string) {
    this.lastHash = hash
  }

  /**
   * Get last hash
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getLastHash() {
    return this.lastHash
  }

  /**
   * Hash is stale
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public hashIsStale(hash: string) {
    return this.lastHash && this.lastHash === hash
  }

  /**
   * Run dashboard
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async stats(statsCompilation: StatsCompilation): Promise<this> {
    if (!statsCompilation) return this
    if (this.hashIsStale(statsCompilation.hash)) return this

    this.setLastHash(statsCompilation.hash)

    if (this.app.context.args?.log === false) {
      process.exitCode = 1
      return this
    }

    if (this.app.context.args?.ci) {
      console.log(
        statsCompilation?.toString(
          // @ts-ignore
          {preset: `normal`, colors: true},
        ),
      )

      if (statsCompilation.hasErrors() && this.app.isProduction)
        this.app.fatal(new Error(`compilation completed but had errors`))

      return this
    }

    try {
      const {renderDashboard} = await import(`./render/renderer.js`)

      const compilations: StatsCompilation = statsCompilation.toJson({
        preset: `normal`,
        children: true,
      })

      this.instance = renderDashboard({
        stats: compilations,
        context: this.app.context,
        mode: this.app.mode,
        devUrl: this.app.hooks.filter(`dev.url`),
        proxyUrl: this.app.hooks.filter(`dev.middleware.proxy.target`),
        watchFiles: this.app.server?.watcher?.files,
      })

      await this.instance.waitUntilExit()
    } catch (error) {
      this.app.context.stdout.write(
        statsCompilation?.toString(
          // @ts-ignore
          {colors: true},
        ),
      )
      this.logger.error(error)
      throw error
    }

    if (statsCompilation.hasErrors() && this.app.isProduction)
      this.app.fatal(new Error(`compilation completed but had errors`))

    return this
  }
}
