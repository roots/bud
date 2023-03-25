/* eslint-disable no-console */
import {Service} from '@roots/bud-framework/service'
import type {Service as Contract} from '@roots/bud-framework/services/dashboard'
import {bind} from '@roots/bud-support/decorators'
import figures from '@roots/bud-support/figures'
import isString from '@roots/bud-support/lodash/isString'
import type {
  MultiStats,
  StatsCompilation,
  StatsError,
} from '@roots/bud-support/webpack'
import chalk from 'chalk'
import * as Ink from 'ink'

import {Console} from './dashboard/console/index.js'

type Compilations = Array<Omit<StatsCompilation, `children`>>

/**
 * Dashboard service
 */
export class Dashboard extends Service implements Contract {
  /**
   * Received stats
   */
  public stats?: StatsCompilation

  /**
   * Is silent?
   */
  public get silent() {
    return this.app.isCLI() && this.app.context.args.log === false
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

    if (!this.app.isCLI() || this.app.context.args.ci === true) {
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

  /**
   * Render webpack stats
   */
  @bind
  public async render(stats: StatsCompilation) {
    try {
      const Dashboard = await import(`./dashboard/index.js`)

      const tagInnerChilds = ({children}: StatsCompilation) =>
        children.map(child => ({...child, isChild: true}))

      const compilations: Compilations = stats.children?.length
        ? [
            ...stats.children,
            ...stats.children?.map(tagInnerChilds),
          ].flat()
        : [stats]

      const App =
        process.stdout.isTTY && !this.app.isProduction
          ? Dashboard.TTYApp
          : Dashboard.App

      Ink.render(
        <Ink.Box flexDirection="column" marginTop={1}>
          {this.app.consoleBuffer.queue?.length > 0 && (
            <>
              <Console
                messages={this.app.consoleBuffer.fetchAndRemove()}
              />
              <Ink.Box>
                <Ink.Text>{` `}</Ink.Text>
              </Ink.Box>
            </>
          )}
          <App
            compilations={compilations.map(compilation => ({
              ...compilation,
              entrypoints: compilation.entrypoints ?? {},
              assets: compilation.assets ?? {},
              errors: this.compilationErrors(compilation.errors),
              warnings: this.compilationErrors(compilation.warnings),
            }))}
            displayAssets={true}
            displayEntrypoints={true}
            displayServerInfo={false}
            context={this.app.context}
            mode={this.app.mode}
            devUrl={this.app.server?.url}
            publicDevUrl={this.app.server?.publicUrl}
            proxyUrl={this.app.hooks.filter(`dev.proxyUrl`)}
            publicProxyUrl={this.app.hooks.filter(`dev.publicProxyUrl`)}
            watchFiles={this.app.server?.watcher?.files}
          />
        </Ink.Box>,
      )
    } catch (error) {}
  }

  /**
   * Render stats as a simple string
   */
  @bind
  public renderString(stats: MultiStats) {
    const stringCompilation = stats.toString({
      preset: `minimal`,
      colors: true,
    })

    process.stdout.write(stringCompilation)
  }

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
                ln.replaceAll(new RegExp(this.app.path(), `g`), `.`),
              )
              /* Add left padding and vert line */
              .map(ln => `${chalk.dim(figures.lineVertical)} ${ln}`)

              /* Discard empty lines */
              .filter(
                ln =>
                  isString(ln) &&
                  ![``, ` `, `\n`].includes(ln) &&
                  !ln.match(/^\s*$/),
              )

              /* Reform message */
              .join(`\n`),
          }))
      )
    } catch (error) {
      throw error
    }
  }
}
