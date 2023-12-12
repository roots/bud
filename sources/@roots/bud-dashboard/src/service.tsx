import type {Bud} from '@roots/bud-framework'
import type {
  MultiStats,
  StatsCompilation,
  StatsError,
} from '@roots/bud-framework/config'
import type {Dashboard as BudDashboard} from '@roots/bud-framework/services'

import {stdin} from 'node:process'

import {makeErrorFormatter} from '@roots/bud-dashboard/helpers/formatErrors'
import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import {Box, type ReactElement, Text} from '@roots/bud-support/ink'
import isUndefined from '@roots/bud-support/isUndefined'

import {Application, TeletypeApplication} from './application.js'

type Compilations = Array<Omit<StatsCompilation, `children`>>

/**
 * {@link BudDashboard}
 */
export class Dashboard extends Service implements BudDashboard {
  /**
   * {@link BudDashboard.formatStatsErrors}
   *
   * @param errors - {@link StatsError[]}
   */
  public declare formatStatsErrors: (
    errors?: StatsError[] | undefined,
  ) => StatsError[] | undefined

  /**
   * Class constructor
   *
   * @param app - {@link Bud} instance
   */
  public constructor(app: () => Bud) {
    super(app)
    this.formatStatsErrors = makeErrorFormatter(this.app)
  }

  /**
   * {@link BudDashboard.render}
   *
   * @param stats - {@link MultiStats}
   * @param error - {@link Error}
   */
  @bind
  public render(stats?: MultiStats, error?: Error): null | ReactElement {
    if (!stats) return <Text>No stats to display</Text>

    /**
     * Do not render if silent mode is enabled
     */
    if (this.app.context.silent) return null

    /**
     * Render basic output if `--dashboard` flag is false
     */
    if (this.app.context.dashboard === false) {
      const stringStats = stats.toString({
        preset: `minimal`,
      })
      return <Text>{stringStats}</Text>
    }

    const data = stats.toJson()

    /**
     * Get compilations
     *
     * @remarks
     * If the stats object has children, we can assume that
     * we are dealing with a multi-compiler setup. In this
     * case, we want to flatten the children array.
     */
    const getCompilations = (): Compilations => {
      if (!data) return []
      if (!data.children?.length) return [data]
      return data.children.flat()
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
     * `--dashboard.assets` flag value
     */
    const assets = !isUndefined(this.app.context.dashboard)
      ? this.app.context.dashboard.assets
      : true

    /**
     * `--dashboard.compact` flag value
     */
    const compact = !isUndefined(this.app.context.dashboard)
      ? this.app.context.dashboard.compact
      : compilations.length > 2

    /**
     * `--dashboard.entrypoints flag value`
     */
    const entrypoints = !isUndefined(
      this.app.context.dashboard?.entrypoints,
    )
      ? this.app.context.dashboard?.entrypoints
      : true

    /**
     * `--dashboard.server` flag value
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
          basedir={this.app.context.basedir}
          close={cb =>
            this.app.compiler?.instance?.compilers?.map(c => c.close(cb))
          }
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
}
