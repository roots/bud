/* eslint-disable no-console */
import type {Bud} from '@roots/bud-framework'
import type {
  StatsCompilation,
  StatsError,
} from '@roots/bud-framework/config'
import type {Dashboard as BudDashboard} from '@roots/bud-framework/services'
import type {BudHandler} from '@roots/bud-support/errors'

import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import {Box, type ReactElement, render} from '@roots/bud-support/ink'
import process from 'node:process'

import {Console} from './console/index.js'
import {Application, TeletypeApplication} from './dashboard/index.js'
import {makeErrorFormatter} from './formatErrors.js'

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
   * Stdout
   */
  public stderr = process.stderr

  /**
   * Stderr
   */
  public stdout = process.stdout

  /**
   * Class constructor
   * @param app
   */
  public constructor(app: () => Bud) {
    super(app)
    this.formatStatsErrors = makeErrorFormatter(this.app)
    this.render({status: `Initializing bud.js`})
  }

  /**
   * {@link Service.register}
   */
  @bind
  public override async boot(bud: Bud) {
    this.render({status: `Booting bud.js`})
  }

  /**
   * {@link Service.register}
   */
  @bind
  public override async buildBefore(bud: Bud) {
    this.render({status: `Building configuration`})
  }

  /**
   * {@link Service.register}
   */
  @bind
  public override async compilerBefore(bud: Bud) {
    this.render({status: `Compiling application modules`})
  }

  /**
   * {@link Service.register}
   */
  @bind
  public override async register(bud: Bud) {
    this.render({status: `Registering bud.js services and extensions`})
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
    if (this.silent) return
    if (this.app.context.ci) return

    const renderApplication = this.instance?.rerender
      ? this.instance.rerender
      : (node: ReactElement) => {
          this.instance = render(node)
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

    const messages = this.app?.console?.fetchAndRemove() ?? []

    const App =
      process.stdin.isTTY && this.app.isDevelopment
        ? TeletypeApplication
        : Application

    renderApplication(
      <Box flexDirection="column" width="100%">
        <Console messages={messages} />

        <App
          close={cb =>
            this.app.compiler?.instance?.compilers?.map(c => c.close(cb))
          }
          compilations={compilations}
          context={this.app.context}
          debug={this.app.context.debug}
          devUrl={this.app.server?.publicUrl}
          displayServerInfo={this.app.mode === `development`}
          error={error}
          mode={this.app.mode}
          proxy={this.app.server?.enabledMiddleware?.[`proxy`]}
          proxyUrl={this.app.server?.publicProxyUrl}
          status={status}
        />
      </Box>,
    )
  }

  /**
   * Render stats as a simple string
   */
  @bind
  public renderString(stats: string) {
    if (this.silent) return
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
  public update(
    stats: StatsCompilation,
    status: false | string = false,
  ): this {
    if (this.hashes.has(stats.hash)) return
    if (stats.hash) this.hashes.add(stats.hash)

    this.stats = stats

    if (this.app.context.ci === true) {
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
