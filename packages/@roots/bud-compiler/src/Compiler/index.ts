import {
  Compiler as Contract,
  Framework,
  Service,
} from '@roots/bud-framework'
import {bind, lodash} from '@roots/bud-support'
import {ProgressPlugin, StatsCompilation, webpack} from 'webpack'

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
  public compile(): Contract.Instance {
    let instance

    if (this.isCompiled)
      this.instance.close(() => {
        instance = this.invokeCompiler(this.before())
      })
    else instance = this.invokeCompiler(this.before())

    return instance
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public invokeCompiler(config: any) {
    this.instance = this.app.isDevelopment
      ? webpack(config)
      : webpack(config, this.callback)

    this.instance.hooks.done.tap(this.app.name, stats => {
      stats && Object.assign(this.stats, stats.toJson())

      this.app.isProduction &&
        this.instance.close(err => {
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

    this.app.hooks.filter('before').map(cb => cb(this.app))

    !this.app.parent &&
      this.app.error(`Trying to compile a child directly.`)

    const instanceConfig = this.app.build.make()

    /**
     * Attempt to use the parent instance in the compilation if there are entries
     * registered to it or if it has no child instances registered.
     */
    if (
      (this.app.hasChildren && instanceConfig.entry) ||
      !this.app.hasChildren
    ) {
      this.app.info('using parent compiler')
      config.push(instanceConfig)
    }

    /**
     * If there are {@link Framework.children} instances, iterate through
     * them and add to `config`
     */
    this.app.hasChildren &&
      this.app.children.getValues().map(({build, name}) => {
        name &&
          (() => {
            this.app.info(`using ${name} compiler`)
            const childConfig = build.make()
            config.push(childConfig)
          })()
      })

    this.app.log('final config', config)

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
        // eslint-disable-next-line no-console
        console.log(stats.toString())
    }

    if (err) {
      this.stats.errors.push(err)
      // eslint-disable-next-line no-console
      this.app.store.is('ci', true) && console.error(err)
    }

    const doneCallbacks = this.app.hooks.filter('done')

    doneCallbacks?.map((cb: (bud: Framework) => any) =>
      cb(this.app),
    )
  }
}
