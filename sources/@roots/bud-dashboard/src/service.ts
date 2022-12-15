/* eslint-disable no-console */
import {Service} from '@roots/bud-framework/service'
import type * as Services from '@roots/bud-framework/services'
import {bind} from '@roots/bud-support/decorators'
import type {StatsCompilation} from '@roots/bud-support/webpack'

import {Renderer} from './renderer.js'

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
   * Last hash
   *
   * @public
   */
  public lastHash?: string

  /**
   * Hash is stale
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public hashIsStale?(hash: string) {
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
    this.lastHash = statsCompilation.hash

    const hasErrors = statsCompilation.hasErrors()

    if (
      this.app.context.args?.log === false &&
      hasErrors &&
      this.app.isProduction
    ) {
      this.app.error(`build failed`)
      return
    }

    if (this.app.context.args?.ci === true) {
      const stringCompilation = statsCompilation.toString(
        // @ts-ignore
        {
          preset: `normal`,
          colors: true,
        },
      )
      Renderer.text(stringCompilation)

      if (hasErrors) {
        this.app.fatal(new Error(`build failed`))
        return
      }
      return
    }
    const {dashboard} = await import(`./dashboard/index.js`)

    const compilations: StatsCompilation = statsCompilation.toJson({
      preset: `normal`,
      children: true,
    })

    try {
      Renderer.render(
        dashboard({
          stats: compilations,
          context: this.app.context,
          mode: this.app.mode,
          devUrl: this.app.hooks.filter(
            `dev.url`,
            new URL(`http://0.0.0.0:3000`),
          ),
          proxyUrl: this.app.hooks.filter(
            `dev.middleware.proxy.options.target`,
          ),
          watchFiles: this.app.server?.watcher?.files,
          messages: {
            stdout: this.app.consoleBuffer.fetchAndRemove(`stdout`),
            stderr: this.app.consoleBuffer.fetchAndRemove(`stderr`),
          },
        }),
      )
    } catch (e) {
      this.app.info(e)
    }

    if (hasErrors && this.app.isProduction) {
      throw new Error()
    }

    return this
  }
}
