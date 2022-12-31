/* eslint-disable no-console */
import {Service} from '@roots/bud-framework/service'
import type {Service as Contract} from '@roots/bud-framework/services/dashboard'
import chalk from '@roots/bud-support/chalk'
import {bind} from '@roots/bud-support/decorators'
import figures from '@roots/bud-support/figures'
import {Box, Text} from '@roots/bud-support/ink'
import {isUndefined} from '@roots/bud-support/lodash-es'
import React from '@roots/bud-support/react'
import type {
  MultiStats,
  StatsCompilation,
  StatsError,
} from '@roots/bud-support/webpack'

import {Console} from './dashboard/console/index.js'

type Compilations = Array<Omit<StatsCompilation, `children`>>

/**
 * Dashboard service
 *
 * @public
 */
export class Dashboard extends Service implements Contract {
  public renderer?: any

  public stats?: StatsCompilation

  public get silent() {
    return this.app.isCLI() && this.app.context.args.log === false
  }

  @bind
  public setRenderer(renderer: any): this {
    this.renderer = renderer
    return this
  }

  /**
   * Run dashboard
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async update(stats: MultiStats): Promise<this> {
    if (!stats) {
      this.logger.info(`dashboard called but no stats received.`)
      return this
    }
    if (this.silent) {
      this.logger.info(`dashboard called but silent mode is on.`)
      return this
    }

    this.stats = stats

    if (isUndefined(this.renderer)) {
      if (this.app.isCLI() && this.app.context.stdout) {
        this.app.context.stdout.write(
          stats.toString({
            preset: `minimal`,
            colors: true,
          }),
        )
      }

      return this
    }

    if (!this.app.isCLI() || this.app.context.args.ci === true) {
      const stringCompilation = stats.toString({
        preset: `minimal`,
        colors: true,
      })

      await this.renderer.once(
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

    const Render = this.app.isProduction
      ? this.renderer.once
      : this.renderer.render

    const App =
      process.stdout.isTTY && !this.app.isProduction
        ? Dashboard.TTYApp
        : Dashboard.App

    try {
      await Render(
        <Box flexDirection="column" marginTop={1}>
          <Console messages={this.app.consoleBuffer.fetchAndRemove()} />
          <App
            compilations={compilations.map(compilation => ({
              ...compilation,
              entrypoints: compilation.entrypoints ?? {},
              assets: compilation.assets ?? {},
              errors: this.compilationErrors(compilation.errors),
            }))}
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

  /**
   * Error formatter
   *
   * @public
   */
  @bind
  public compilationErrors?(errors: StatsError[]) {
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
            /* Discard empty lines */
            .filter(ln => ![``, ` `, `\n`].includes(ln))
            /* Discard emoji */
            .map(ln => ln.replaceAll(/×/g, ``))
            /* Replace project path with . */
            .map(ln =>
              ln.replaceAll(new RegExp(this.app.path(), `g`), `.`),
            )
            /* Add left padding and vert line */
            .map(ln => `${chalk.dim(figures.lineVertical)} ${ln}`)
            /* Reform message */
            .join(`\n`),
        }))
    )
  }
}
