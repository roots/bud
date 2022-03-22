import {
  Compiler as Contract,
  Framework,
  Service,
} from '@roots/bud-framework'
import {bind, chalk, lodash, once, Signale} from '@roots/bud-support'
import {
  Configuration,
  MultiStats,
  ProgressPlugin,
  Stats,
  StatsCompilation,
  webpack,
} from 'webpack'

import * as logger from './compiler.logger'

const {isFunction, isEqual} = lodash

/**
 * Wepback compilation controller class
 *
 * @public
 */
export class Compiler extends Service implements Contract {
  /**
   * Compiler
   *
   * @public
   */
  public compiler: Contract.Compiler = webpack

  /**
   * Compiler instance
   *
   * @public
   */
  public compilation: Contract.Compilation

  /**
   * Compilation stats
   *
   * @public
   */
  public stats: StatsCompilation

  /**
   * Compilation progress
   *
   * @public
   */
  public progress: Contract.Progress

  /**
   * Multi-compiler configuration
   *
   * @public
   */
  public config: Array<Configuration> = []

  /**
   * Logger
   *
   * @public
   */
  public get logger(): Signale {
    return logger.instance
  }

  public getCompiler(): Contract.Compiler {
    return this.compiler
  }
  public setCompiler(compiler: Contract.Compiler) {
    this.compiler = compiler
  }

  /**
   * Initiates compilation
   *
   * @returns the compiler instance
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  @once
  public async compile() {
    this.config = await this.before()
    const compiler = await this.invoke(this.config)

    this.app.timeEnd('bud')
    this.app._hrdone = this.app._hrdiff()

    return compiler
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  @once
  public async invoke(config: Array<Configuration>) {
    await this.app.hooks.fire('event.compiler.before')

    this.compilation = this.compiler(this.config)

    this.app.isDevelopment &&
      this.compilation.hooks.done.tap(
        config.shift().name,
        this.handleStats,
      )

    new ProgressPlugin(this.progressCallback).apply(this.compilation)

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

    // if (this.app.hasChildren == false)
    this.config.push(this.app.build.config)

    /**
     * If there are {@link Framework.children} instances, iterate through
     * them and add to `config`
     */
    await Promise.all(
      this.app.children?.getValues().map(async (instance: Framework) => {
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
   */
  @bind
  @once
  public async callback(error: Error, stats: Stats & MultiStats) {
    error && (await this.handleErrors(error))
    stats && (await this.handleStats(stats))

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

    await this.app.hooks.fire(`event.compiler.done`)

    this.app.isProduction &&
      this.stats.errorsCount > 0 &&
      this.app.error('Errors detected in source')
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
  }

  /**
   * Progress callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public progressCallback(
    percent: number,
    scope: string,
    ...message: any[]
  ) {
    try {
      percent = Math.ceil((percent ?? 0) * 100)

      message = (
        message ? message.flatMap(i => (i ? `${i}`?.trim() : ``)) : []
      ).reverse()

      const stage =
        (scope.includes(`]`) ? scope.split(`]`).pop()?.trim() : scope) ??
        ``

      const isStale = isEqual(this.progress, [
        percent,
        message.join(` `).concat(stage),
      ])

      this.progress = [percent, message.join(` `).concat(stage)]

      if (isStale) return

      const statusColor = chalk.hex(
        this.stats?.errorsCount > 0 ? '#ff5c57' : '#5af78e',
      )

      percent !== 100
        ? this.logger.log(
            statusColor(`[${percent}%]`),
            chalk.blue(`[${stage}]`),
            ...message,
          )
        : this.stats?.errorsCount > 0 &&
          this.logger.log(
            statusColor(`[${percent}%]`),
            statusColor(`Compiled with errors`),
          )
    } catch (error) {
      this.app.warn(error)
    }
  }
}
