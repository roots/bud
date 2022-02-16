import {
  Compiler as Contract,
  Framework,
  Service,
} from '@roots/bud-framework'
import {bind, lodash, once} from '@roots/bud-support'
import {
  MultiStats,
  ProgressPlugin,
  StatsCompilation,
  StatsError,
  webpack,
} from 'webpack'

import * as budProcess from './process'

const {isFunction} = lodash

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
  public config: any = []

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
  public async invoke(config: any) {
    config = await this.app.hooks.filterAsync(
      'event.compiler.before',
      config,
    )

    this.instance = webpack(
      this.app.hooks.filter('config.override', config),
    )

    this.instance.hooks.done.tap(config.shift().name, async stats => {
      if (this.app.isDevelopment) await this.handleStats(stats)
    })

    new ProgressPlugin((...args): void => {
      args[1] = args[1].replace('[0] ', '')
      const shouldLog =
        !this.progress ||
        !this.progress[1] ||
        (args[1] !== this.progress[1] && args[1] !== '')

      this.progress = [args[0] * 100, args[1]]
      this.progress[0] < 100 && shouldLog
        ? budProcess.logger.await(
            `[${Math.ceil(this.progress[0])}] `,
            this.progress[1],
          )
        : budProcess.logger.success(
            `[${Math.ceil(this.progress[0])}] `,
            `🎉 ${this.progress[1]}`,
          )
    }).apply(this.instance)

    this.app.hooks.filter('event.compiler.after', this.app)

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
    const config = []
    this.isCompiled = true
    await this.app.build.make()

    /**
     * Attempt to use the parent instance in the compilation if there are entries
     * registered to it or if it has no child instances registered.
     */
    if (!this.app.hasChildren) {
      this.app.info(`using config from parent compiler`)
      config.push(this.app.build.config)
      return config
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
        config.push(instance.build.config)
      }),
    )

    return config
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
    budProcess.stats.write(this.stats, this.app.store.get('theme.colors'))

    await this.app.hooks.filter(
      'event.compiler.stats',
      async () => this.stats,
    )
  }

  @bind
  public async handleErrors(error: Error) {
    if (!error) return

    this.app.isDevelopment &&
      this.app.server.middleware?.hot?.publish({error})

    this.app.error(error)
  }
}
