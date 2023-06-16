/* eslint-disable no-console */
import type {
  MultiStats,
  StatsCompilation,
  StatsError,
} from '@roots/bud-framework/config'
import type {Service as Contract} from '@roots/bud-framework/services/dashboard'

import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import {Box, render, Text} from '@roots/bud-support/ink'

import {Console} from './console/index.js'

type Compilations = Array<Omit<StatsCompilation, `children`>>

const tagInnerChilds = ({children}: StatsCompilation) =>
  children.map(child => ({...child, isChild: true}))

/**
 * Dashboard service
 */
export class Dashboard extends Service implements Contract {
  public hashes = new Set<string>()

  /**
   * Received stats
   */
  public stats?: StatsCompilation

  /**
   * Error formatter
   */
  @bind
  public compilationErrors?(errors: StatsError[]) {
    return (
      errors
        /* Filter unhelpful errors from compiler internals */
        .filter(
          error => error && !error.message?.includes(`HookWebpackError`),
        )
        .map(error => {
          error.message = error.message
            .replace(`Module parse failed:`, ``)
            .replace(/Module build failed \(.*\):?/, ``)
            .trim()
            .split(`Error:`)
            .pop()
            .trim()

          if (
            error.message.includes(
              `You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders`,
            )
          ) {
            error.message = error.message.replace(
              `You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders`,
              ``,
            )

            if (
              error.moduleName?.match(
                this.app.hooks.filter(`pattern.vue`),
              ) &&
              !this.app.extensions.has(`@roots/bud-vue`)
            ) {
              error.message = `${error.message.trim()}\n\nYou need to install @roots/bud-vue to compile this module.`
            }

            if (
              error.moduleName?.match(
                this.app.hooks.filter(`pattern.sass`),
              ) &&
              !this.app.extensions.has(`@roots/bud-sass`)
            ) {
              error.message = `${error.message.trim()}\n\nYou need to install @roots/bud-sass to compile this module.`
            }

            if (
              error.moduleName?.match(
                this.app.hooks.filter(`pattern.ts`),
              ) &&
              !this.app.extensions.has(`@roots/bud-typescript`) &&
              !this.app.extensions.has(`@roots/bud-esbuild`) &&
              !this.app.extensions.has(`@roots/bud-swc`)
            ) {
              error.message = `${error.message.trim()}\n\nYou need to install a TypeScript compatible extension to compile this module.`
            }
          }

          return error
        })
    )
  }

  /**
   * Render webpack stats
   */
  @bind
  public async render(stats: StatsCompilation) {
    try {
      const Dashboard = await import(`./dashboard/index.js`)

      if (this.hashes.has(stats.hash)) return
      this.hashes.add(stats.hash)

      const compilations: Compilations = stats.children?.length
        ? [
            ...stats.children,
            ...stats.children?.map(tagInnerChilds),
          ].flat()
        : stats
        ? [stats]
        : []

      const App =
        process.stdout.isTTY && !this.app.isProduction
          ? Dashboard.TTYApp
          : Dashboard.App

      render(
        <Box flexDirection="column" marginTop={1}>
          <>
            <Console messages={this.app.consoleBuffer.fetchAndRemove()} />
          </>

          <App
            compilations={compilations.map(compilation => ({
              ...compilation,
              assets: compilation.assets ?? {},
              entrypoints: compilation.entrypoints ?? {},
              errors: this.compilationErrors(compilation.errors),
              warnings: this.compilationErrors(compilation.warnings),
            }))}
            context={this.app.context}
            devUrl={this.app.server?.url}
            displayAssets={true}
            displayEntrypoints={true}
            displayServerInfo={false}
            mode={this.app.mode}
            proxyUrl={this.app.hooks.filter(`dev.proxyUrl`)}
            publicDevUrl={this.app.server?.publicUrl}
            publicProxyUrl={this.app.hooks.filter(`dev.publicProxyUrl`)}
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
  public renderString(stats: MultiStats) {
    const stringCompilation = stats.toString({
      colors: true,
      preset: `minimal`,
    })

    process.stdout.write(stringCompilation)
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
  public async update(stats: MultiStats): Promise<this> {
    if (!stats) return this

    this.stats = stats

    if (this.silent) {
      this.logger.log(`dashboard called but --silent flag is set.`)
      return this
    }

    if (this.app.context.ci === true) {
      this.renderString(stats)
      return this
    }

    try {
      await this.render(stats.toJson(this.app.hooks.filter(`build.stats`)))
    } catch (error) {
      this.renderString(stats)
    }

    return this
  }
}
