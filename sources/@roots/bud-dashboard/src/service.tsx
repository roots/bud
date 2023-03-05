/* eslint-disable no-console */
import {Service} from '@roots/bud-framework/service'
import type {Service as Contract} from '@roots/bud-framework/services/dashboard'
import chalk from '@roots/bud-support/chalk'
import {bind} from '@roots/bud-support/decorators'
import figures from '@roots/bud-support/figures'
import Ink from '@roots/bud-support/ink'
import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
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
 */
export class Dashboard extends Service implements Contract {
  /**
   * Renderer instance
   */
  public renderer?: any

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
   * Set renderer instance
   */
  @bind
  public setRenderer(renderer: any): this {
    this.renderer = renderer
    return this
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
      await this.renderString(stats)
      return this
    }

    try {
      await this.render(stats.toJson(this.app.hooks.filter(`build.stats`)))
    } catch (error) {
      await this.renderString(stats)
    }

    return this
  }

  /**
   * Render webpack stats
   */
  @bind
  public async render(stats: StatsCompilation) {
    try {
      if (!this.renderer) return

      const Dashboard = await import(`./dashboard/index.js`)

      const tagInnerChilds = ({children}: StatsCompilation) =>
        children.map(child => ({...child, isChild: true}))

      const compilations: Compilations = stats.children?.length
        ? [
            ...stats.children,
            ...stats.children?.map(tagInnerChilds),
          ].flat()
        : [stats]

      const Render = this.app.isProduction
        ? this.renderer.once
        : this.renderer.render

      const App =
        process.stdout.isTTY && !this.app.isProduction
          ? Dashboard.TTYApp
          : Dashboard.App

      await Render(
        <Ink.Box flexDirection="column" marginTop={1}>
          <Console messages={this.app.consoleBuffer.fetchAndRemove()} />
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
  public async renderString(stats: MultiStats) {
    const stringCompilation = stats.toString({
      preset: `minimal`,
      colors: true,
    })

    await this.renderer.text(stringCompilation)
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
