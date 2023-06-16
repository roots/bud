/* eslint-disable no-console */
import type {Bud} from '@roots/bud-framework'
import type {
  StatsCompilation,
  StatsError,
} from '@roots/bud-framework/config'
import type {Service as Contract} from '@roots/bud-framework/services/dashboard'

import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import {Box, render, Text} from '@roots/bud-support/ink'

import {Console} from './console/index.js'
import {App, TTYApp} from './dashboard/index.js'
import {makeErrorFormatter} from './formatErrors.js'

type Compilations = Array<Omit<StatsCompilation, `children`>>

/**
 * Dashboard service
 */
export class Dashboard extends Service implements Contract {
  /**
   * Error formatter
   */
  public formatStatsErrors: (errors: StatsError[]) => StatsError[]

  public hashes = new Set<string>()

  /**
   * Received stats
   */
  public stats?: StatsCompilation

  /**
   * {@link Service.register}
   */
  @bind
  public override async register(bud: Bud) {
    this.formatStatsErrors = makeErrorFormatter(bud)
  }

  /**
   * Render webpack stats
   */
  @bind
  public async render() {
    try {
      const compilations: Compilations = this.stats.children?.length
        ? [...this.stats.children].flat()
        : this.stats
        ? [this.stats]
        : []

      const DisplayApp =
        global.process.stdout.isTTY && !this.app.isProduction
          ? TTYApp
          : App

      render(
        <Box flexDirection="column" marginTop={1}>
          <>
            <Console messages={this.app.consoleBuffer.fetchAndRemove()} />
          </>

          <DisplayApp
            compilations={compilations.map(compilation => ({
              ...compilation,
              assets: compilation.assets ?? {},
              entrypoints: compilation.entrypoints ?? {},
              errors: this.formatStatsErrors(compilation.errors),
              warnings: this.formatStatsErrors(compilation.warnings),
            }))}
            context={this.app.context}
            devUrl={this.app.server?.url}
            displayAssets={true}
            displayEntrypoints={true}
            displayServerInfo={false}
            mode={this.app.mode}
            proxyUrl={this.app.server?.proxyUrl}
            publicDevUrl={this.app.server?.publicUrl}
            publicProxyUrl={this.app.server?.publicProxyUrl}
            watchFiles={this.app.server?.watcher?.files}
          />
        </Box>,
      )
    } catch (error) {}
  }

  /**
   * Render queued messages
   */
  @bind
  public async renderQueuedMessages() {
    render(
      this.app.consoleBuffer.queue?.length > 0 && (
        <>
          <Console messages={this.app.consoleBuffer.fetchAndRemove()} />
          <Box>
            <Text>{` `}</Text>
          </Box>
        </>
      ),
    )
  }

  /**
   * Render stats as a simple string
   */
  @bind
  public renderString(stats: string) {
    process.stdout.write(stats)
  }

  /**
   * Is silent?
   */
  public get silent() {
    return this.app.context.silent === true
  }

  /**
   * Run dashboard
   */
  @bind
  public async update(stats: StatsCompilation): Promise<this> {
    if (this.hashes.has(stats.hash)) return
    if (stats.hash) this.hashes.add(stats.hash)

    this.stats = stats

    this.logger.log(this.stats.children[0])

    if (this.silent) {
      this.logger.log(`dashboard called but --silent flag is set.`)
      return this
    }

    if (this.app.context.ci === true) {
      this.renderString(
        this.app.compiler.stats.toString({
          color: true,
          preset: `minimal`,
        }),
      )
      return this
    }

    await this.render().catch(() => {
      this.renderString(
        this.app.compiler.stats.toString({
          color: true,
          preset: `minimal`,
        }),
      )
    })

    return this
  }
}
