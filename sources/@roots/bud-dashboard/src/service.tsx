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
import isString from '@roots/bud-support/lodash/isString'
import stripAnsi from '@roots/bud-support/strip-ansi'
import {sep} from 'node:path'

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
    try {
      return (
        errors
          /* Unhelpful errors passed down the loader chain */
          .filter(({message}) => !message?.includes(`HookWebpackError`))
          /* Format errors */
          .map(({message, ...error}: StatsError) => ({
            ...error,
            message: message
              /* Discard unhelpful stack traces */
              .split(/  at /)
              .shift()

              /* Discard unhelpful stuff preceeding message */
              .split(/SyntaxError:?/)
              .pop()
              .split(/ModuleError:/)
              .pop()
              .split(/Error:/)
              .pop()

              /* Process line-by-line */
              .split(`\n`)

              /* Discard emoji */
              .map(ln => ln.replaceAll(/×/g, ``))
              /* Discard origin */
              .map(ln => ln.replaceAll(/\[.*\]/g, ``))
              /* Replace project path with . */
              .map(ln =>
                ln.replaceAll(
                  new RegExp(this.app.path().concat(sep), `g`),
                  `.`,
                ),
              )

              /* Discard empty lines */
              .filter(
                ln =>
                  isString(ln) &&
                  ![` `, `\n`, ``].includes(ln) &&
                  !ln.match(/^\s*$/),
              )
              .map(stripAnsi)

              /* Reform message */
              .join(`\n`),
          }))
      )
    } catch (error) {
      return errors
    }
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
