/* eslint-disable no-console */
import type {Bud} from '@roots/bud-framework'
import type {
  StatsCompilation,
  StatsError,
} from '@roots/bud-framework/config'
import type {Dashboard as BudDashboard} from '@roots/bud-framework/services'
import type {BudHandler} from '@roots/bud-support/errors'

import {stderr, stdin, stdout} from 'node:process'

import {makeErrorFormatter} from '@roots/bud-dashboard/helpers/formatErrors'
import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import {Box, type ReactElement, render} from '@roots/bud-support/ink'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

import {Application, TeletypeApplication} from './application.js'
import {Console} from './console/index.js'

type Compilations = Array<Omit<StatsCompilation, `children`>>

/**
 * Dashboard service
 */
export class Dashboard extends Service implements BudDashboard {
  /**
   * Error formatter
   */
  public formatStatsErrors: (errors: StatsError[]) => StatsError[]

  /**
   * Previously rendered hashes
   */
  public hashes = new Set<string>()

  /**
   * Ink instance
   */
  public instance?: BudDashboard[`instance`]

  /**
   * Received stats
   */
  public stats?: StatsCompilation

  /**
   * {@link BudDashboard.stdout}
   */
  public stderr = stderr

  /**
   * {@link BudDashboard.stdin}
   */
  public stdin = stdin

  /**
   * {@link BudDashboard.stderr}
   */
  public stdout = stdout

  /**
   * Class constructor
   * @param app
   */
  public constructor(app: () => Bud) {
    super(app)
    this.formatStatsErrors = makeErrorFormatter(this.app)
    this.render({status: `Initializing bud.js`})
    this.stdin = this.app.context.stdin
  }

  /**
   * Render console messages, build stats and development server information
   */
  @bind
  public render({
    error,
    status,
  }: {
    error?: BudHandler
    status?: false | string
  }) {
    if (this.app.context.dashboard === false) return
    if (this.app.context.silent === true) return

    const renderApplication = this.instance?.rerender
      ? this.instance.rerender
      : (node: ReactElement) => {
          this.instance = render(node, {
            stderr: this.stderr,
            stdin: this.stdin,
            stdout: this.stdout,
          })
        }

    const getCompilations = (): Compilations => {
      if (!this.stats) return []
      if (!this.stats.children?.length) return [this.stats]
      return this.stats.children.flat()
    }

    const compilations = getCompilations().map(compilation => ({
      ...compilation,
      errors: this.formatStatsErrors(compilation.errors),
      warnings: this.formatStatsErrors(compilation.warnings),
    }))

    const assets = !isUndefined(this.app.context.dashboard?.assets)
      ? this.app.context.dashboard.assets
      : true

    const compact = !isUndefined(this.app.context.dashboard?.compact)
      ? this.app.context.dashboard.compact
      : compilations.length > 2

    const entrypoints = !isUndefined(
      this.app.context.dashboard?.entrypoints,
    )
      ? this.app.context.dashboard.entrypoints
      : true

    const server = !isUndefined(this.app.context.dashboard?.server)
      ? this.app.context.dashboard.server
      : true

    const messages = this.app?.console?.fetchAndRemove()

    const App =
      this.stdin.isTTY && this.app.isDevelopment
        ? TeletypeApplication
        : Application

    renderApplication(
      <Box flexDirection="column" width="100%">
        <Console messages={messages} />

        <App
          close={cb =>
            this.app.compiler?.instance?.compilers?.map(c => c.close(cb))
          }
          basedir={this.app.context.basedir}
          compact={compact}
          compilations={compilations}
          debug={this.app.context.debug}
          devUrl={this.app.server?.url}
          displayAssets={assets}
          displayEntrypoints={entrypoints}
          displayServerInfo={this.app.mode === `development` && server}
          error={error}
          isolated={0}
          mode={this.app.mode}
          proxy={this.app.server?.enabledMiddleware?.[`proxy`]}
          proxyUrl={this.app.server?.proxyUrl}
          publicDevUrl={this.app.server?.publicUrl}
          publicProxyUrl={this.app.server?.publicProxyUrl}
          status={status}
        />
      </Box>,
    )
  }

  /**
   * Render stats as a simple string
   */
  @bind
  public renderString(text: string) {
    if (this.app.context.silent) return
    process.stdout.write(`${text}\n`)
  }

  /**
   * Run dashboard
   */
  @bind
  public update(
    stats: StatsCompilation,
    status: false | string = false,
  ): this {
    if (stats) {
      this.hashes.add(stats.hash)
      this.stats = stats
    }

    if (this.app.context.dashboard === false && this.app.compiler?.stats) {
      this.renderString(
        this.app.compiler.stats.toString({
          color: true,
          preset: `minimal`,
        }),
      )

      return this
    }

    this.render({status})

    return this
  }
}
