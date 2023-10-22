import type {Bud} from '@roots/bud-framework'
import type {
  StatsCompilation,
  StatsError,
} from '@roots/bud-framework/config'
import type {Dashboard as BudDashboard} from '@roots/bud-framework/services'

import {stdin, stdout} from 'node:process'

import {makeErrorFormatter} from '@roots/bud-dashboard/helpers/formatErrors'
import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import {Box} from '@roots/bud-support/ink'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

import {Application, TeletypeApplication} from './application.js'

type Compilations = Array<Omit<StatsCompilation, `children`>>

/**
 * {@link BudDashboard}
 */
export class Dashboard extends Service implements BudDashboard {
  /**
   * {@link BudDashboard.formatStatsErrors}
   */
  public declare formatStatsErrors: (
    errors: StatsError[] | undefined,
  ) => StatsError[] | undefined

  /**
   * {@link BudDashboard.stats}
   */
  public declare stats?: StatsCompilation

  /**
   * Class constructor
   * @param app
   */
  public constructor(app: () => Bud) {
    super(app)
    this.formatStatsErrors = makeErrorFormatter(this.app)
  }

  /**
   * {@link BudDashboard.render}
   */
  @bind
  public render(stats?: StatsCompilation, error?: Error) {
    if (!stats) return <>No stats</>

    const jsonStats = stats.toJson()
    const stringStats = stats.toString()

    /**
     * Do not render if:
     * - CI is enabled
     * - silent mode is enabled
     */
    if (this.app.context.silent === true || this.app.context.ci) return

    /**
     * Render string if dashboard is disabled
     */
    if (this.app.context.dashboard === false) {
      this.renderString(stringStats)
      return this
    }

    /**
     * Get compilations
     *
     * @remarks
     * If the stats object has children, we can assume that
     * we are dealing with a multi-compiler setup. In this
     * case, we want to flatten the children array.
     */
    const getCompilations = (): Compilations => {
      if (!jsonStats) return []
      if (!jsonStats.children?.length) return [jsonStats]
      return jsonStats.children.flat()
    }

    /**
     * Cleanly format errors and warnings for each compilation
     */
    const compilations = getCompilations().map(compilation => ({
      ...compilation,
      errors: this.formatStatsErrors(compilation?.errors),
      warnings: this.formatStatsErrors(compilation?.warnings),
    }))

    /**
     * Get dashboard.assets option
     */
    const assets = !isUndefined(this.app.context.dashboard)
      ? this.app.context.dashboard.assets
      : true

    /**
     * Get dashboard.compact option
     */
    const compact = !isUndefined(this.app.context.dashboard)
      ? this.app.context.dashboard.compact
      : compilations.length > 2

    /**
     * Get dashboard.entrypoints option
     */
    const entrypoints = !isUndefined(
      this.app.context.dashboard?.entrypoints,
    )
      ? this.app.context.dashboard?.entrypoints
      : true

    /**
     * Get dashboard.server option
     */
    const server = !isUndefined(this.app.context.dashboard?.server)
      ? this.app.context.dashboard?.server
      : true

    /**
     * Get the application to render
     *
     * @remarks
     * If the application is running in development mode, and
     * the terminal is a TTY, we want to render the teletype
     * application. Otherwise, we want to render the normal
     * application.
     */
    const App =
      stdin.isTTY && this.app.isDevelopment
        ? TeletypeApplication
        : Application

    return (
      <Box flexDirection="column">
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
          notifier={this.app.notifier}
          proxy={this.app.server?.enabledMiddleware?.[`proxy`]}
          proxyUrl={this.app.server?.proxyUrl}
          publicDevUrl={this.app.server?.publicUrl}
          publicProxyUrl={this.app.server?.publicProxyUrl}
        />
      </Box>
    )
  }

  /**
   * {@link BudDashboard.renderString}
   */
  @bind
  public renderString(text: string): Dashboard {
    if (this.app.context.silent) return this
    stdout.write(`${text}\n`)
    return this
  }
}
