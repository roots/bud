import {
  Compiler as Contract,
  Service,
} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {ProgressPlugin, StatsCompilation, webpack} from 'webpack'

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
   * {@inheritDoc @roots/bud-framework#Service.name}
   *
   * @public
   */
  public name = 'compiler'

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
        instance = this.setup(this.before())
      })
    else instance = this.setup(this.before())

    return instance
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

    this.app.parent &&
      this.app.error(`Trying to compile a child directly.`)

    /**
     * Attempt to use the parent instance in the compilation if there are entries
     * registered to it or if it has no child instances registered.
     */
    if (
      this.app.build.rebuild().entry ||
      !this.app.hasChildren
    ) {
      this.app.info('using parent compiler')
      config.push(this.app.build.rebuild())
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
            config.push(build.rebuild())
          })()
      })

    this.app.debug(config)

    return config
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public setup(config: any) {
    this.instance = this.app.isDevelopment
      ? webpack(config, this.callback)
      : webpack(config)

    if (this.app.isProduction) {
      this.instance.hooks.done.tap(this.app.name, stats => {
        stats && Object.assign(this.stats, stats.toJson())

        this.instance.close(err => {
          err && this.stats.errors.push(err)
        })
      })
    }

    new ProgressPlugin((...args): void => {
      this.progress = args
    }).apply(this.instance)

    return this.instance
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

    this.app.when(stats, () => {
      this.stats = stats.toJson(this.app.build.config.stats)
    })

    this.app.when(err, () => {
      this.stats.errors.push(err)
    })

    const doneCallbacks = this.app.hooks.filter('done')

    doneCallbacks?.map(cb => cb(this.app))
  }
}
