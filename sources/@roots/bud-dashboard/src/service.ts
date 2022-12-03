/* eslint-disable no-console */
import {Service} from '@roots/bud-framework/service'
import type * as Services from '@roots/bud-framework/services'
import {bind} from '@roots/bud-support/decorators'
import type * as Ink from '@roots/bud-support/ink'
import type {StatsCompilation} from '@roots/bud-support/webpack'

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
  public static override label = `dashboard`

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

    const hasErrors = statsCompilation.hasErrors()

    if (
      this.app.context.args?.log === false &&
      hasErrors &&
      this.app.isProduction
    ) {
      throw new Error(`build failed`)
    }

    if (this.app.context.args?.ci === true) {
      console.log(`webpack logged stats:`)
      const stringCompilation = statsCompilation.toString(
        // @ts-ignore
        {
          preset: `normal`,
          colors: true,
        },
      )
      console.log(stringCompilation)
      if (hasErrors) {
        this.app.fatal(new Error(`build failed`))
        return
      }
    } else {
      const {renderDashboard} = await import(`./render/renderer.js`)

      const compilations: StatsCompilation = statsCompilation.toJson({
        preset: `normal`,
        children: true,
      })

      try {
        this.instance = renderDashboard({
          stats: compilations,
          context: this.app.context,
          mode: this.app.mode,
          devUrl: this.app.hooks.filter(`dev.url`),
          proxyUrl: this.app.hooks.filter(`dev.middleware.proxy.target`),
          watchFiles: this.app.server?.watcher?.files,
          messages: {
            stdout: this.app.consoleBuffer.fetchAndRemove(`stdout`),
            stderr: this.app.consoleBuffer.fetchAndRemove(`stderr`),
          },
        })
      } catch (e) {}

      if (hasErrors && this.app.isProduction) {
        throw new Error()
      }
    }

    return this
  }
}
