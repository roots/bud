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

      return this
    }

    if (this.app.context.args?.ci) {
      console.log(
        compilationStats?.toString(
          // @ts-ignore
          {preset: `normal`, colors: true},
        ),
      )

      if (compilationStats.hasErrors() && this.app.isProduction)
        console.error(new Error(`compilation completed but had errors`))

      return this
    }

    const {renderDashboard} = await import(`./render/renderer.js`)

    const stats: StatsCompilation = compilationStats.toJson({
      preset: `normal`,
      children: true,
    })

    if (!stats || stats.hash === this.lastHash) return this

    let compilations = stats?.children?.length
      ? [
          ...stats.children,
          ...(stats?.children?.flatMap(({children}) =>
            children.map(child => ({...child, isChild: true})),
          ) ?? []),
        ]
      : [stats]

    if (this.app.extensions.has(`@roots/bud-eslint`)) {
      compilations = compilations?.map(child => ({
        ...child,
        errors: child.errors.filter(
          error => !error.message.includes(`Module build failed`),
        ),
      }))
    }

    this.lastHash = stats.hash

    this.instance = renderDashboard({
      compilations,
      app: this.app,
    })

    if (compilationStats.hasErrors()) {
      if (this.app.isProduction) {
        process.exitCode = 1
        this.app.error(`compilation completed but had errors`)
      }
    }

    try {
      await this.instance.waitUntilExit()
    } catch (error) {}

    return this
  }
}
