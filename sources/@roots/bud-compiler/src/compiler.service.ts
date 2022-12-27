import type {Bud} from '@roots/bud-framework/bud'
import {Service} from '@roots/bud-framework/service'
import type {Compiler as Contract} from '@roots/bud-framework/services'
import {bind} from '@roots/bud-support/decorators'
import type {
  MultiCompiler,
  MultiStats,
  WebpackError,
} from '@roots/bud-support/webpack'

/**
 * Wepback compilation controller class
 *
 * @public
 */
export class Compiler extends Service implements Contract.Service {
  /**
   * Compiler implementation
d   * @public
   */
  public implementation: Contract.Implementation

  /**
   * Compiler instance
   * @public
   */
  public instance: Contract.Service[`instance`]

  /**
   * Compilation stats
   * @public
   */
  public stats: Contract.Service[`stats`]

  /**
   * Configuration
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

    this.config = !this.app.hasChildren
      ? [await this.app.build.make()]
      : await Promise.all(
          Object.values(this.app.children).map(async (child: Bud) => {
            try {
              return await child.build.make()
            } catch (error) {
              throw error
            }
          }),
        )

    try {
      await this.app.hooks.fire(`compiler.before`)
    } catch (error) {
      throw error
    }

    this.app.context.logger.timeEnd(`initialize`)

    if (this.app.isCLI() && this.app.context.args.dry) {
      this.logger.log(`running in dry mode. exiting early.`)
      return
    }

    try {
      try {
        this.instance = this.implementation(this.config)
      } catch (error) {
        throw error
      }

      this.app.isDevelopment &&
        this.instance.hooks.done.tap(
          `${this.app.label}-dev-handle`,
          this.handleStats,
        )

      this.instance.compilers.forEach(compiler =>
        compiler.hooks.afterEmit.tapAsync(
          this.app.label,
          async (_stats, callback) => {
            try {
              await this.app.hooks.fire(`compiler.after`)
            } catch (error) {
              const err = new Error(
                error?.message ?? error?.toString() ?? ``,
              )
              err.name = `CompilerError (afterEmit)`
              throw err
            }

            return callback()
          },
        ),
      )

      this.instance.hooks.done.tap(this.app.label, async stats => {
        this.handleStats(stats)
        await this.app.hooks.fire(`compiler.close`)
      })

      return this.instance
    } catch (error) {
      throw error
    }
  }

  /**
   * Webpack callback
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  public callback(error: WebpackError, stats: MultiStats) {
    if (error) return this.onError(error)
    if (stats) return this.handleStats(stats)
  }

  /**
   * Stats handler
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public handleStats(stats: MultiStats) {
    this.stats = stats
    this.app.dashboard.update(stats)
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
  public onError(error: WebpackError) {
    this.app.isDevelopment &&
      this.app.server.appliedMiddleware?.hot?.publish({error})

    if (error && this.app.isProduction) {
      throw error?.message ?? error
    }
  }
}
