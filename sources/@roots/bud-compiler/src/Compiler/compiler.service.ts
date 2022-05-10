import {Bud, Compiler as Contract, Service} from '@roots/bud-framework'
import {bind, lodash, once} from '@roots/bud-support'
import {
  Configuration,
  MultiStats,
  ProgressPlugin,
  Stats,
  StatsCompilation,
  webpack,
  WebpackError,
} from 'webpack'

import * as Reporter from '../Reporter'
import BudError from '../Reporter/BudError'

const {isFunction} = lodash

/**
 * Wepback compilation controller class
 * @public
 */
export class Compiler extends Service implements Contract.Service {
  /**
   * Compiler
   * @public
   */
  protected _implementation: Contract.Implementation = webpack
  public get implementation(): Contract.Implementation {
    return this._implementation
  }
  public set implementation(implementation: Contract.Implementation) {
    this._implementation = implementation
  }

  /**
   * Compiler instance
   * @public
   */
  public compilation: Contract.Service['compilation']

  /**
   * Compilation stats
   * @public
   */
  public stats: {
    json: StatsCompilation
    string: string
  } = {
    json: null,
    string: null,
  }

  /**
   * Errors
   * @public
   */
  public errors: Array<BudError> = []

  /**
   * Errors
   * @public
   */
  public warnings: Array<BudError> = []

  /**
   * Multi-compiler configuration
   * @public
   */
  public config: Array<Configuration> = []

  public done: boolean = false
  public compiling: boolean = false

  /**
   * Initiates compilation
   *
   * @returns the compiler instance
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async compile() {
    this.config = await this.before()
    this.app._hrdone = this.app._hrdiff()

    this.compilation = await this.invoke(this.config)
    return this.compilation
  }

  /**
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async invoke(
    config: Array<Configuration>,
  ): Promise<Contract.Service['compilation']> {
    await this.app.hooks.fire('event.compiler.before')

    this.compilation = this.implementation(this.config)

    this.app.isDevelopment &&
      this.compilation.hooks.done.tap(
        `${this.app.name}-dev-handle`,
        async stats => {
          this.handleStats(stats as any)
          return
        },
      )

    this.compilation.hooks.done.tap(
      `${this.app.name}-cli-done`,
      async () => await this.app.hooks.fire('event.compiler.close'),
    )

    new ProgressPlugin(this.app.dashboard.progressCallback).apply(
      this.compilation,
    )

    await this.app.hooks.fire('event.compiler.after')

    return this.compilation
  }

  /**
   * Returns final webpack configuration
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async before() {
    await this.app.build.make()
    this.config.push(this.app.build.config)

    await Promise.all(
      this.app.children?.getValues().map(async (instance: Bud) => {
        if (!instance.name) return
        await instance.build.make()
        this.config.push(instance.build.config)
      }),
    )

    return this.config
  }

  /**
   * Webpack callback
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public callback(error: Error, stats: Stats & MultiStats) {
    if (error) this.onError(error)
    if (stats) this.handleStats(stats)
  }

  /**
   * Stats handler
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public handleStats(stats: Stats & MultiStats) {
    if (!stats?.toJson || !isFunction(stats?.toJson)) return

    this.stats.json = stats.toJson()
    this.stats.string = stats.toString()

    const problemReporter = Reporter.report(this.app, this.stats.json)
    this.errors = problemReporter.errors
    this.warnings = problemReporter.warnings

    this.app.dashboard.stats({
      stats: this.stats.json,
      errors: this.errors,
      warnings: this.warnings,
    })

    this.app.isProduction && this.compilation.close(this.onClose)
  }

  /**
   * Compiler close event
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public onClose(error: WebpackError) {
    if (error) this.onError(error)
    this.app.isProduction && this.app.close()
  }

  /**
   * Compiler error event
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public onError(error: BudError[] | Error) {
    this.app.isDevelopment &&
      this.app.server.appliedMiddleware?.hot?.publish({error})

    this.app.error(error)
  }
}
