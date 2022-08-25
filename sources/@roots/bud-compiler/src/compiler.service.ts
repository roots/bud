import type {Bud, Compiler as Contract} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind} from 'helpful-decorators'
import type {MultiCompiler, MultiStats, Stats, WebpackError} from 'webpack'

/**
 * Wepback compilation controller class
 *
 * @public
 */
export class Compiler extends Service implements Contract.Service {
  /**
   * Service label
   *
   * @public
   */
  public static label = `compiler`

  /**
   * Compiler implementation
   *
   * @internal
   */
  public implementation: Contract.Service[`implementation`]

  public instance: Contract.Service[`instance`]

  /**
   * Compilation stats
   *
   * @public
   */
  public stats: Contract.Service[`stats`]

  /**
   * Configuration
   *
   * @public
   */
  public config: Contract.Service[`config`] = []

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
  public async compile(): Promise<MultiCompiler> {
    const webpack = await import(`webpack`)
    this.implementation = webpack.default
    this.app.log(`imported webpack`, webpack.version)

    this.config = []

    if (!this.app.hasChildren) {
      this.app.info(`no children found, processing parent instance`)
      const config = await this.app.build.make()
      this.config.push(config)
    } else {
      await Promise.all(
        Object.values(this.app.children).map(async (child: Bud) => {
          const config = await child.build.make()
          this.app.info(`child config`, child.label, child.build.config)
          this.config.push(config)
        }),
      )
    }

    await this.app.hooks.fire(`compiler.before`)

    try {
      // @ts-ignore
      this.implementation.validate(this.config)
      this.app.success(`webpack configuration is valid`)
    } catch (error) {
      this.app.error(`webpack validation error`, error)
    }

    if (this.app.context.args.dry) {
      this.app.log(`running in dry mode. exiting early.`)
      return
    }

    this.instance = this.implementation(this.config)

    this.app.isDevelopment &&
      this.instance.hooks.done.tap(
        `${this.app.label}-dev-handle`,
        this.handleStats,
      )

    this.instance.hooks.done.tap(
      `${this.app.label}-cli-done`,
      async () => {
        await this.app.hooks.fire(`compiler.close`).catch(this.app.error)
      },
    )

    return this.instance
  }

  /**
   * Webpack callback
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
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
  public onClose(error?: WebpackError) {
    if (error) return this.onError(error)
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
