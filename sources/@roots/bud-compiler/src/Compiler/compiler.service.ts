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

import * as budProcess from './process'

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
   */
  public errors: Array<StatsError> = []

  /**
   * Compilation progress
   *
   * @public
   */
  public progress: Contract.Progress

  /**
   * True if compiler is already instantiated
   *
   * @public
   */
  public isCompiled: boolean = false

  /**
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
   */
  @bind
  @once
  public async compile() {
    const config = await this.before()
    const compiler = await this.invoke(config)

    this.app.timeEnd('bud')

    return compiler
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async invoke(config: Array<Configuration>) {
    await this.app.hooks.fire('event.compiler.before')
    this.config = this.app.hooks.filter('config.override', config)

    const progressPluginCallback = function (
      percent: number,
      scope: string,
      ...message: any[]
    ) {
      try {
        const normalPercent = Math.ceil((percent ?? 0) * 100)
        scope = scope.replace(/\[.*\]/, '')?.trim() ?? ''

        this.message = message
          ? message.flatMap(i => (i ? `${i}`?.trim() : ''))
          : []
        this.message.reverse()

        const isStale = isEqual(this.progress, [
          normalPercent,
          message.join(' ').concat(scope),
        ])
        this.progress = [normalPercent, message.join(' ').concat(scope)]

        !isStale &&
          (message.length > 1 || scope) &&
          budProcess.logger
            .scope(chalk.green(`${normalPercent}%`), chalk.blue(scope))
            .log(...this.message)
      } catch (error) {
        this.app.error(error)
      }
    }

    this.instance = webpack(this.config)
    this.instance.hooks.done.tap(config.shift().name, async stats => {
      if (this.app.isDevelopment) await this.handleStats(stats)
    })
    new ProgressPlugin(progressPluginCallback.bind(this)).apply(
      this.instance,
    )

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
  @once
  public async before() {
    this.isCompiled = true
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

  @bind
  public async callback(error: Error, stats: MultiStats) {
    await this.handleErrors(error)
    await this.handleStats(stats)

    this.instance.close(err => {
      err && this.app.error(err)
      this.app.close()
    })
  }

  @bind
  public async handleStats(stats: MultiStats) {
    if (!stats?.toJson || !isFunction(stats?.toJson)) return
    this.stats = stats.toJson(this.app.store.get('build.stats'))

    budProcess.stats.write(this.stats)

    await this.app.hooks.fire('event.compiler.stats')
  }

  @bind
  public async handleErrors(error: Error) {
    if (!error) return

    this.app.isDevelopment &&
      // @ts-ignore
      this.app.server.enabledMiddleware?.hot?.publish({error})

    this.app.error(error)
  }
}
