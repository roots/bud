import {Bud, Compiler as Contract, Service} from '@roots/bud-framework'
import {bind, lodash, once} from '@roots/bud-support'
import {
  Configuration,
  MultiStats,
  ProgressPlugin,
  Stats,
  StatsCompilation,
  webpack,
} from 'webpack'

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
  public stats: StatsCompilation

  /**
   * Multi-compiler configuration
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
        config.shift().name,
        this.handleStats,
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
    /**
     * Make config
     */
    await this.app.build.make()

    this.config.push(this.app.build.config)

    /**
     * If there are {@link Bud.children} instances, iterate through
     * them and add to `config`
     */
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
  public async callback(error: Error, stats: Stats & MultiStats) {
    if (error) await this.handleErrors(error)
    if (stats) await this.handleStats(stats)

    this.app.isProduction &&
      this.compilation.close(async error => {
        error ? this.app.error(error) : this.app.close()
      })
  }

  /**
   * Stats handler
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async handleStats(stats: Stats & MultiStats) {
    if (!stats?.toJson || !isFunction(stats?.toJson)) return

    this.stats = stats.toJson()
    this.app.dashboard.stats(stats)

    this.app.isProduction &&
      this.stats.errorsCount > 0 &&
      this.app.error('Errors detected in source')

    await this.app.hooks.fire(`event.compiler.done`)
  }

  /**
   * Error handler
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async handleErrors(error: Error) {
    if (!error) return

    this.app.isDevelopment
      ? this.app.server.enabledMiddleware?.hot?.publish({error})
      : this.app.error(error)

    await this.app.hooks.fire(`event.compiler.error`)
    await this.app.hooks.fire(`event.compiler.done`)
  }
}
