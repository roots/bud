import {Compiler, Service} from '@roots/bud-framework'
import webpack, {ProgressPlugin, StatsCompilation} from 'webpack'
import {noop} from 'lodash'
import {boundMethod as bind} from 'autobind-decorator'

export default class extends Service implements Compiler {
  public name = '@roots/bud-compiler'

  public _instance: Compiler.Instance

  public _stats: StatsCompilation = {
    assets: [],
    errors: [],
    warnings: [],
  }

  public _progress: Compiler.Progress

  public isCompiled: boolean = false

  public get stats(): StatsCompilation {
    return this._stats
  }

  public set stats(stats: StatsCompilation) {
    this._stats = stats
  }

  public get progress(): Compiler['progress'] {
    return this._progress
  }

  public set progress(progress: Compiler['progress']) {
    this._progress = progress
  }

  public get instance(): Compiler.Instance {
    return this._instance
  }

  public set instance(instance: Compiler.Instance) {
    this._instance = instance
  }

  @bind
  public compile(): Compiler.Instance {
    if (this.isCompiled) {
      this.instance.close(noop)
    }

    this.app.hooks.filter('before')

    this.instance = webpack(this.app.hooks.filter('after'))

    this.instance.hooks.done.tap(this.app.name, stats => {
      if (stats) {
        this.stats = stats.toJson()
      }

      this.instance.close(err => {
        if (err) {
          this.stats.errors.push(err)
        }

        if (this.app.mode == 'production') {
          setTimeout(() => process.exit(), 1000)
        }
      })
    })

    new ProgressPlugin((percentage, message): void => {
      const decimal =
        percentage && typeof percentage === 'number'
          ? percentage
          : 0

      this.progress = {
        decimal,
        percentage: `${Math.floor(decimal * 100)}%`,
        message,
      }
    }).apply(this.instance)

    this.isCompiled = true

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
      stats && console.log(stats.toString())
      err && console.error(err)
    })
  }
}
