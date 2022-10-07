import type {Bud} from '@roots/bud-framework/bud'
import {Service} from '@roots/bud-framework/service'
import type {Compiler as Contract} from '@roots/bud-framework/services'
import {bind} from '@roots/bud-support/decorators'
import type {MultiCompiler, MultiStats, WebpackError} from 'webpack'

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
   * @public
   */
  public implementation: Contract.Service[`implementation`]

  /**
   * Compiler instance
   *
   * @public
   */
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

    this.logger.log(`imported webpack`, webpack.default.version)

    this.config = []

    if (!this.app.hasChildren) {
      this.logger.log(`no children found, processing parent instance`)
      const config = await this.app.build.make()
      this.config.push(config)
    } else {
      await Promise.all(
        Object.values(this.app.children).map(async (child: Bud) => {
          const config = await child.build.make()
          this.logger.log(`child config`, child.label)
          this.logger.info(child.label, child.build.config)
          this.config.push(config)
        }),
      )
    }

    await this.app.hooks.fire(`compiler.before`)

    if (this.app.context.args.dry) {
      this.logger.log(`running in dry mode. exiting early.`)
      return
    }

    this.instance = this.implementation(this.config)

    this.app.isDevelopment &&
      this.instance.hooks.done.tap(
        `${this.app.label}-dev-handle`,
        this.handleStats,
      )

    this.instance.hooks.done.tap(this.app.label, async stats => {
      this.handleStats(stats)
      await this.app.hooks.fire(`compiler.close`)
    })

    this.instance.compilers.forEach(compiler =>
      compiler.hooks.afterEmit.tapAsync(
        this.app.label,
        async (stats, callback) => {
          try {
            await this.app.hooks.fire(`compiler.after`)
          } catch (error) {
            this.onError(error)
          }

          return callback()
        },
      ),
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
  public callback(error: Error, stats: MultiStats) {
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
  public handleStats(stats: MultiStats) {
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

    this.app.isProduction && this.app.fatal(error)
  }
}
