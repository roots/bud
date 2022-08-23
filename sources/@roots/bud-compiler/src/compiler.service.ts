import type {Bud, Compiler as Contract} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind, once} from 'helpful-decorators'
import type {
  MultiCompiler,
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
  public implementation: typeof Webpack.webpack = Webpack.webpack

  /**
   * Compiler instance
   *
   * @public
   */
  public instance: MultiCompiler = null

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
  public config: Array<unknown> = []

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
  public async compile(): Promise<Contract.Service['instance']> {
    this.config = []
    this.app.log(`bud.compiler.compile called`)

    try {
      await this.app.hooks.fire(`compiler.before`)

      if (!this.app.hasChildren) {
        this.app.log(`no children found, processing parent instance`)
        const config = await this.app.build.make()
        this.app.log(config)
        this.config.push(this.app.build.config)
        return
      }

      await Promise.all(
        Object.values(this.app.children).map(async (child: Bud) => {
          const config = await child.build.make()
          this.app.log(`child config`, child.label, child.build.config)
          this.config.push(config)
          return Promise.resolve()
        }),
      )
    } catch (error) {
      this.app.error(error)
    }

    if (this.app.context.args.dry === true) {
      const output = this.app.json.stringify(this.config)
      this.app.log(`final config`, output)
      return
    }

    this.app.log(`instantiating compiler implementation`, this.config)

    Webpack.validate(this.config)
    this.instance = Webpack.webpack(this.config)

    this.app.isDevelopment &&
      this.instance.hooks.done.tap(
        `${this.app.label}-dev-handle`,
        this.handleStats,
      )

    this.instance.hooks.done.tap(
      `${this.app.label}-cli-done`,
      async () => {
        await this.app.hooks.fire(`compiler.close`)
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
