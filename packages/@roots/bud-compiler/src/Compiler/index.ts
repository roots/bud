import {
  Compiler as Contract,
  Framework,
  Service,
} from '@roots/bud-framework'
import {bind, lodash, once} from '@roots/bud-support'
import {
  ProgressPlugin,
  StatsCompilation,
  StatsError,
  webpack,
} from 'webpack'
const {isFunction} = lodash

/**
 * Initial state
 *
 * @public
 */
const INITIAL_STATS = {
  assets: [],
  errors: [],
  warnings: [],
}

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
  public stats: StatsCompilation = INITIAL_STATS

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
    config =
      await this.app.hooks.filterAsync<'event.compiler.before'>(
        'event.compiler.before',
        config,
      )

    config = this.app.hooks.filter('config.override', config)

    this.instance = webpack(config)

    this.instance.hooks.done.tap(config[0].name, async stats => {
      this.app.hooks.filter<'event.compiler.done'>(
        'event.compiler.done',
        stats,
      )

      stats && Object.assign(this.stats, stats.toJson())
      if (this.app.store.is('features.dashboard', false)) {
        this.log(
          'log',
          stats.toString(this.app.store.get('build.stats')),
        )
      }

      if (this.app.isProduction) {
        this.instance.close(err => {
          if (err) {
            err = this.app.hooks.filter<'event.compiler.error'>(
              'event.compiler.error',
              err,
            )

            this.stats.errors.push(err)
            this.log('error', err)
          }

          !this.app.dashboard.instance && this.app.close()
        })
      }
    })

    new ProgressPlugin((...args): void => {
      this.progress = args
    }).apply(this.instance)

    this.app.hooks.filter<'event.compiler.after'>(
      'event.compiler.after',
      this.app,
    )

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

    this.stats = INITIAL_STATS

    this.isCompiled = true

    !this.app.isRoot &&
      this.log(
        'error',
        `Attempting to compile a child directly. Only the parent instance should be compiled.`,
      )

    await this.app.build.make()

    /**
     * Attempt to use the parent instance in the compilation if there are entries
     * registered to it or if it has no child instances registered.
     */
    if (!this.app.hasChildren) {
      this.app.info(`using config from parent compiler`)
      config.push(this.app.build.config)
      return config
    } else {
      this.app.warn(
        `root compiler will not be tapped (child compilers in use)`,
      )
    }

    /**
     * If there are {@link Framework.children} instances, iterate through
     * them and add to `config`
     */
    await Promise.all(
      this.app.children
        ?.getValues()
        .map(async (instance: Framework) => {
          if (!instance.name) return

          this.log(
            'success',
            `\`${instance.name}\` compiler will be tapped`,
          )

          await instance.build.make()
          config.push(instance.build.config)
        }),
    )

    return config
  }

  /**
   * Compilation callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public callback(...args: any[]) {
    /**
     * production mode callback takes two parameters (webpack err and stats)
     * however, the done hook used in development just takes one (stats)
     *
     * here we parse the callback args so that we dont have to
     * duplicate the callback.
     */
    let [err, stats] =
      args.length > 1 ? args : [null, args.pop()]

    if (stats?.toJson && isFunction(stats.toJson)) {
      this.stats = stats.toJson(
        this.app.store.get('build.stats'),
      )

      this.stats = this.app.hooks.filter<'event.compiler.stats'>(
        'event.compiler.stats',
        this.stats,
      )
    }

    if (err) {
      if (this.app.isDevelopment) {
        this.app.server.middleware?.hot?.publish({
          errors: stats.toJson(this.app.store.get('build.stats'))
            .errors,
        })
      }

      this.errors.push(
        this.app.hooks.filter('event.compiler.error', err),
      )

      this.app.store.is('features.dashboard', false) &&
        this.log('error', err)
    }
  }
}
