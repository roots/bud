import {
  Compiler as Contract,
  Framework,
  Service,
} from '@roots/bud-framework'
import {bind, chalk, lodash, once} from '@roots/bud-support'
import {
  Configuration,
  MultiStats,
  ProgressPlugin,
  StatsCompilation,
  StatsError,
  webpack,
} from 'webpack'

import * as logger from './compiler.logger'
import * as dashboard from './process'

const {isFunction, isEqual} = lodash

/**
 * Wepback compilation controller class
 *
 * @public
 */
export class Compiler extends Service implements Contract {
  /**
   * Compiler instance
   *
   * @public
   */
  public instance: Contract.Instance

  /**
   * Compilation stats
   *
   * @public
   */
  public stats: StatsCompilation = {
    assets: [],
    errors: [],
    warnings: [],
  }

  /**
   * Compiler errors
   *
   * @public
   */
  public errors: Array<StatsError> = []

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
   */
  public compilerLogger

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
    const config = await this.before()
    const compiler = await this.invoke(config)

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
    this.compilerLogger = logger.instance(this.app)
    this.compilerLogger.disable()

    this.instance = webpack(this.config)

    this.instance.hooks.done.tap(config.shift().name, async stats => {
      await this.app.hooks.fire('event.compiler.done')
      if (this.app.isDevelopment) await this.handleStats(stats)
    })

    new ProgressPlugin(this.progressCallback).apply(this.instance)

    await this.app.hooks.fire('event.compiler.after')

    return this.instance
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

    /**
     * Attempt to use the parent instance in the compilation if there are entries
     * registered to it or if it has no child instances registered.
     */
    if (!this.app.hasChildren) {
      this.app.info(`using config from parent compiler`)
      this.config.push(this.app.build.config)
      return this.config
    }

    this.app.warn(
      `root compiler will not be tapped (child compilers in use)`,
    )

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
  public async callback(error: Error, stats: MultiStats) {
    await this.handleErrors(error)
    await this.handleStats(stats)

    await this.app.hooks.fire('event.compiler.done')

    this.instance.close(err => {
      err && this.app.error(err)
      this.app.close()
    })
  }

  /**
   * Stats handler
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async handleStats(stats: MultiStats) {
    if (!stats?.toJson || !isFunction(stats?.toJson)) return
    this.stats = stats.toJson(this.app.build.config.stats)
    dashboard.stats.write(stats, this.app, console)
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

    this.app.isDevelopment &&
      this.app.server.enabledMiddleware?.hot?.publish({error})

    this.app.error(error)
  }

  /**
   * Progress callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async progressCallback(
    percent: number,
    scope: string,
    ...message: any[]
  ) {
    try {
      const normalPercent = Math.ceil((percent ?? 0) * 100)
      scope =
        (scope.includes(`]`) ? scope.split(`]`).pop()?.trim() : scope) ??
        ``

      message = (
        message ? message.flatMap(i => (i ? `${i}`?.trim() : ``)) : []
      ).reverse()

      const isStale = isEqual(this.progress, [
        normalPercent,
        message.join(` `).concat(scope),
      ])

      this.progress = [normalPercent, message.join(` `).concat(scope)]

      !isStale &&
        (message.length > 1 || scope) &&
        this.compilerLogger.log(
          chalk.green(`[${normalPercent}%]`),
          chalk.blue(`[${scope}]`),
          ...message,
        )
    } catch (error) {
      this.app.error(error)
    }
  }
}
