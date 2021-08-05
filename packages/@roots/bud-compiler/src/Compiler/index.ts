import {
  Compiler as Contract,
  Service,
} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isEqual, isString, noop} from 'lodash'
import {ProgressPlugin, StatsCompilation, webpack} from 'webpack'

/**
 * Webpack compilation controller
 */
class Compiler extends Service implements Contract {
  public name = 'compiler'

  /**
   * {@link Webpack Webpack} instance
   */
  public instance: Contract.Instance

  /**
   * Compilation stats
   */
  public stats: StatsCompilation = {
    assets: [],
    errors: [],
    warnings: [],
  }

  /**
   * Compilation progress as reported by {@link ProgressPlugin}
   */
  public progress: Contract.Progress

  /**
   * True if compiler is already instantiated
   */
  public isCompiled: boolean = false

  /**
   * Lifecycle method: bootstrapped
   *
   * @remarks
   * Registers hooks filtered before and after
   * the instantiation of Webpack as well as one additional hook
   * which is filtered at the tail of the Webpack compiler callback.
   */
  public register() {
    this.app.hooks.on('before', () => [])
    this.app.hooks.on('after', () => [])

    this.app.hooks.on('done', () => {
      this.isCompiled = true
    })
  }

  /**
   * Initiate webpack compilation process
   */
  @bind
  public compile(): Contract.Instance {
    this.isCompiled && this.instance.close(noop)

    return this.setup(this.before())
  }

  /**
   * Returns final webpack configuration
   */
  @bind
  public before() {
    const config = []

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

  @bind
  public setup(config: any) {
    this.instance = webpack(config)

    this.instance.hooks.done.tap(this.app.name, stats => {
      stats && Object.assign(this.stats, stats.toJson())

      this.instance.close(err => {
        err && this.stats.errors.push(err)

        isEqual(this.app.mode, 'production') &&
          setTimeout(() => process.exit(), 100)
      })
    })

    new ProgressPlugin((...args): void => {
      this.progress = args
    }).apply(this.instance)

    return this.instance
  }

  /**
   * Webpack compilation callback
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

    this.app.when(this.app.store.isTrue('ci'), () => {
      stats && process.stdout.write(stats.toString())
      err &&
        process.stderr.write(
          isString(err) ? err : JSON.stringify(err),
        )
    })

    this.app.hooks.filter('done').map(cb => cb(this.app))
  }
}

export {Compiler}
