/**
 * @module @roots/bud-compiler
 */

import {
  Compiler as Contract,
  Service,
} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isEqual, isString, noop} from 'lodash'
import {ProgressPlugin, StatsCompilation, webpack} from 'webpack'

/**
 * @class Compiler
 */
class Compiler extends Service implements Contract {
  /**
   * @property {string} name
   */
  public name = 'compiler'

  public _instance: Contract.Instance

  public _stats: StatsCompilation = {
    assets: [],
    errors: [],
    warnings: [],
  }

  public _progress: Contract.Progress

  public isCompiled: boolean = false

  public get stats(): StatsCompilation {
    return this._stats
  }

  public set stats(stats: StatsCompilation) {
    this._stats = stats
  }

  public get progress(): Contract.Progress {
    return this._progress
  }

  public set progress(progress: Contract.Progress) {
    this._progress = progress
  }

  public get instance(): Contract.Instance {
    return this._instance
  }

  public set instance(instance: Contract.Instance) {
    this._instance = instance
  }

  @bind
  public register() {
    this.app.hooks.on('done', () => {
      this.isCompiled = true
    })
  }

  @bind
  public compile(): Contract.Instance {
    this.isCompiled && this.instance.close(noop)

    return this.setup(this.before())
  }

  @bind
  public before() {
    const config = []

    this.app.hooks.filter('before').map(cb => cb(this.app))

    this.app.parent &&
      this.app.error(`Trying to compile a child directly.`)

    if (
      this.app.build.rebuild().entry ||
      this.app.children.getEntries().length == 0
    ) {
      this.app.info('using parent compiler')
      config.push(this.app.build.rebuild())
    }

    this.app.children.getValues().forEach(({build, name}) => {
      if (name) {
        this.app.info(`using ${name} compiler`)
        config.push(build.rebuild())
      }
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

    this.app.when(this.app.store.get('ci'), () => {
      stats && process.stdout.write(stats.toString())
      err &&
        process.stderr.write(
          isString(err) ? err : JSON.stringify(err),
        )
    })

    this.app.hooks.filter('done').map(cb => cb(this.app))
  }
}

/**
 * @exports Compiler
 */
export {Compiler}
