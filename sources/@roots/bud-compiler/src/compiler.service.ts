import type {Bud, Compiler as Contract} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind, once} from 'helpful-decorators'
import type {
  Configuration,
  MultiStats,
  Stats,
  StatsCompilation,
  WebpackError,
} from 'webpack'
import Webpack from 'webpack'

/**
 * Wepback compilation controller class
 *
 * @public
 */
export class Compiler extends Service implements Contract.Service {
  /**
   * Compiler implementation
   *
   * @internal
   */
  protected _implementation: Contract.Implementation = Webpack

  /**
   * Compiler implementation
   *
   * @public
   */
  public get implementation(): Contract.Implementation {
    return this._implementation
  }
  public set implementation(implementation: Contract.Implementation) {
    this._implementation = implementation
  }

  /**
   * Compiler instance
   *
   * @public
   */
  public compilation: Contract.Service['compilation']

  /**
   * Compilation stats
   *
   * @public
   */
  public stats: StatsCompilation = null

  /**
   * Configuration
   *
   * @public
   */
  public config: Array<Configuration> = []

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
    this.compilation = await this.invoke(this.config)
    return this.compilation
  }

  /**
   * Invoke compiler
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async invoke(
    config: Array<Configuration>,
  ): Promise<Contract.Service['compilation']> {
    await this.app.hooks.fire('compiler.before')

    this.compilation = this.implementation(config ?? this.config)

    this.app.isDevelopment &&
      this.compilation.hooks.done.tap(
        `${this.app.name}-dev-handle`,
        async stats => {
          this.app.debug(stats)
          this.handleStats(stats as any)
        },
      )

    this.compilation.hooks.done.tap(
      `${this.app.name}-cli-done`,
      async () => await this.app.hooks.fire('compiler.close'),
    )

    new Webpack.ProgressPlugin(this.app.dashboard.progressCallback).apply(
      this.compilation,
    )

    await this.app.hooks.fire('compiler.after')

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
    if (!this.app.hasChildren) {
      await this.app.build.make()
      this.config.push(this.app.build.config)
      return this.config
    }

    await Promise.all(
      Object.entries(this.app.children).map(
        async ([name, instance]: [string, Bud]) => {
          const config = await instance.build.make()
          this.app.log(`child config`, name, config)
          this.config.push(config)
          return Promise.resolve()
        },
      ),
    )

    this.app.log(this.config)

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
    if (!stats) return
    this.stats = stats
    this.app.dashboard.stats({stats})
  }

  /**
   * Compiler close event
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public onClose(error: WebpackError) {
    if (error) return this.onError(error)
    this.app.isProduction && this.app.close()
  }

  /**
   * Compiler error event
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public onError(error: Error) {
    this.app.isDevelopment &&
      this.app.server.appliedMiddleware?.hot?.publish({error})

    this.app.error(error)
  }
}
