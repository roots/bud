import {
  Compiler as Contract,
  Service,
} from '@roots/bud-framework'
import {bind, lodash} from '@roots/bud-support'
import {ProgressPlugin, StatsCompilation, webpack} from 'webpack'
const {isFunction} = lodash
import {once} from 'helpful-decorators'

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
  public async register() {}

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
    await this.app.hooks.promised('compiler.invoke', config)

    this.instance = webpack(config)

    this.instance.hooks.done.tap(config[0].name, async stats => {
      stats && Object.assign(this.stats, stats.toJson())

      if (this.app.isProduction) {
        this.instance.close(err => {
          if (err) {
            this.stats.errors.push(err)
            this.log('error', err)
          }
          this.app.close(() => {})
        })
      }
    })

    new ProgressPlugin((...args): void => {
      this.progress = args
    }).apply(this.instance)

    this.app.hooks.filter('after.compiler')

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
    if (this.app.children.getEntries().length === 0) {
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
      this.app.children.getValues().map(async instance => {
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
    const [err, stats] =
      args.length > 1 ? args : [null, args.pop()]

    if (stats?.toJson && isFunction(stats.toJson)) {
      this.stats = stats.toJson(
        this.app.build.config.stats ?? {preset: 'normal'},
      )
      this.app.store.is('features.dashboard', false) &&
        this.app.log(stats.toString())
    }

    if (err) {
      this.stats.errors.push(err)
      this.app.store.is('features.dashboard', false) &&
        this.log('error', err)
    }
  }
}
