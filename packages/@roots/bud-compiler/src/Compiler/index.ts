import {
  Compiler as Contract,
  Service,
} from '@roots/bud-framework'
import {bind, lodash} from '@roots/bud-support'
import {ProgressPlugin, StatsCompilation, webpack} from 'webpack'
// import {ProgressPlugin} from 'webpack'
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
   * {@inheritDoc @roots/bud-framework#Service.register}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public register() {
    this.app.hooks.on('before', () => [])
    this.app.hooks.on('after', () => [])
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
  public async compile() {
    return await this.invokeCompiler(this.before())
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async invokeCompiler(config: any) {
    this.app.timeEnd('bud')

    this.instance = this.app.isDevelopment
      ? webpack(config)
      : webpack(config, this.callback)

    this.instance.hooks.done.tap(this.app.name, stats => {
      stats && Object.assign(this.stats, stats.toJson())

      this.app.isProduction &&
        this.instance.close(err => {
          this.app.hooks.filter('done')

          err && this.stats.errors.push(err)
        })
    })

    new ProgressPlugin((...args): void => {
      this.progress = args
    }).apply(this.instance)

    return this.instance
  }

  /**
   * Returns final webpack configuration
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public before() {
    const config = []

    this.stats = INITIAL_STATS

    this.isCompiled = true

    this.app.hooks.filter('before', this.app)

    !this.app.parent &&
      this.app.error(
        `Attempting to compile a child directly. Only the parent instance should be compiled.`,
      )

    const instanceConfig = this.app.build.make()

    /**
     * Attempt to use the parent instance in the compilation if there are entries
     * registered to it or if it has no child instances registered.
     */
    if (!this.app.hasChildren) {
      this.app.log(`using config from parent compiler`)
      config.push(instanceConfig)
    }

    /**
     * If there are {@link Framework.children} instances, iterate through
     * them and add to `config`
     */
    this.app.hasChildren &&
      this.app.children.getValues().map(({build, name}) => {
        if (!name) return

        this.app.log(`using config from ${name}`)
        const childConfig = build.make()
        config.push(childConfig)
      })

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
    const [err, stats] =
      args.length > 1 ? args : [null, args.pop()]

    if (stats?.toJson && isFunction(stats.toJson)) {
      this.stats = stats.toJson(this.app.build.config.stats)
      this.app.store.is('ci', true) &&
        this.app.log(stats.toString())
    }

    if (err) {
      this.stats.errors.push(err)
      this.app.store.is('ci', true) && this.app.error(err)
    }
  }
}
