import {Compiler, Service} from '@roots/bud-framework'
import webpack, {ProgressPlugin, StatsCompilation} from 'webpack'
import {isNull, noop} from 'lodash'
import {boundMethod as bind} from 'autobind-decorator'

export default class extends Service implements Compiler {
  public name = '@roots/bud-compiler'

  public _instance: Compiler.Instance

  public _stats: StatsCompilation

  public _progress: Compiler.Progress

  public _errors: {
    moduleIdentifier?: string
    moduleName?: string
    message: string
  }[] = []

  public _warnings: {
    moduleIdentifier?: string
    moduleName?: string
    message: string
  }[] = []

  public isCompiled: boolean = false

  public get stats(): StatsCompilation {
    return this._stats
  }

  public set stats(stats: StatsCompilation) {
    this._stats = stats
  }

  public get errors(): Compiler['errors'] {
    return this._errors
  }

  public set errors(errors: Compiler['errors']) {
    this._errors = errors
  }

  public get warnings(): Compiler['warnings'] {
    return this._warnings
  }

  public set warnings(warnings: Compiler['warnings']) {
    this._warnings = warnings
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
        this.stats = stats.toJson(this.statsOptions)
      }

      this.instance.close(err => {
        if (err) {
          this.errors = [...(this.errors ?? []), err]
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

    this.app.when(!isNull(err), () => {
      this.app.error(err, 'Webpack error (pre-compile)')
    })

    if (!stats) return

    const options = this.app.build.config.stats

    this.errors = stats.toJson
      ? stats.toJson(options).errors
      : stats.errors

    this.warnings = stats.toJson
      ? stats.toJson(options).warnings
      : stats.warnings

    this.stats = stats.toJson(options)
  }
}
