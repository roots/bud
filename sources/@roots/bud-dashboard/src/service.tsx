/* eslint-disable no-console */
import {Service} from '@roots/bud-framework/service'
import type {Service as Contract} from '@roots/bud-framework/services/dashboard'
import {bind} from '@roots/bud-support/decorators'
import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'
import type {
  MultiStats,
  StatsCompilation,
} from '@roots/bud-support/webpack'

import {Console} from './dashboard/console/index.js'
import {Renderer} from './renderer.js'

type Compilations = Array<Omit<StatsCompilation, `children`>>

/**
 * Dashboard service
 *
 * @public
 */
export class Dashboard extends Service implements Contract {
  public stats?: StatsCompilation

  @bind
  public stale?(stats: StatsCompilation) {
    const stale = this.stats && this.stats.hash === stats.hash
    return stale
  }

  public get silent() {
    return this.app.context.args.log === false
  }

  /**
   * Run dashboard
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async update(stats: MultiStats): Promise<this> {
    if (!stats || this.silent || this.stale(stats)) return this
    this.stats = stats

    if (this.app.context.args?.ci === true) {
      const stringCompilation = stats.toString({
        preset: `minimal`,
        colors: true,
      })

      await Renderer.once(
        <Box flexDirection="column">
          <Console messages={this.app.consoleBuffer.fetchAndRemove()} />
          <Text>{stringCompilation}</Text>
        </Box>,
      )

      return this
    }

    try {
      await this.renderCompilation(
        stats.toJson(this.app.hooks.filter(`build.stats`)),
      )
    } catch (error) {
      throw error
    }

    return this
  }

  /**
   * Render compilations from webpack stats
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async renderCompilation?(stats: StatsCompilation) {
    const Dashboard = await import(`./dashboard/index.js`)

    const tagInnerChilds = ({children}: StatsCompilation) =>
      children.map(child => ({...child, isChild: true}))

    const compilations: Compilations = stats.children?.length
      ? [...stats.children, ...stats.children?.map(tagInnerChilds)].flat()
      : [stats]

    const Render = this.app.isProduction ? Renderer.once : Renderer.render

    const App =
      process.stdout.isTTY && !this.app.isProduction
        ? Dashboard.TTYApp
        : Dashboard.App

    try {
      await Render(
        <Box flexDirection="column" marginTop={1}>
          <Console messages={this.app.consoleBuffer.fetchAndRemove()} />
          <App
            compilations={compilations}
            displayAssets={true}
            displayEntrypoints={true}
            displayServerInfo={false}
            context={this.app.context}
            mode={this.app.mode}
            devUrl={this.app.hooks.filter(
              `dev.url`,
              new URL(`http://0.0.0.0:3000`),
            )}
            proxyUrl={this.app.hooks.filter(
              `dev.middleware.proxy.options.target`,
            )}
            watchFiles={this.app.server?.watcher?.files}
          />
        </Box>,
      )
    } catch (error) {}
  }
}
