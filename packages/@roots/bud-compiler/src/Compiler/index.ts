import {Compiler, Service} from '@roots/bud-framework'
import webpack, {ProgressPlugin} from 'webpack'
import {noop, isEqual} from 'lodash'
import {boundMethod as bind} from 'autobind-decorator'
import {StatsCompilation} from 'webpack/types'

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

  public compilerDoneFilterCalled: boolean = false

  @bind
  public compile(): Compiler.Instance {
    if (this.isCompiled) {
      this.instance.close(noop)
    }

    this.app.hooks.filter('before')

    this.app.hooks.on('after', after => {
      !this.app.children.getEntries()[0]
        ? after.push(this.app.build.config)
        : this.app.children.every((name, child) => {
            this.app.log('child compiler added to config', name)
            after.push(child.build.config)
          })

      return after
    })

    this.instance = webpack(this.app.hooks.filter('after'))
    this.isCompiled = true

    this.app.when(
      !this.app.parent.compiler.compilerDoneFilterCalled,
      () => {
        this.app.hooks.filter('done')
      },
    )

    this.setupInstance()

    return this.instance
  }

  @bind
  public setupInstance() {
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
