import {Compiler, Service} from '@roots/bud-framework'
import webpack from 'webpack'
import {isNull} from 'lodash'
import {boundMethod as bind} from 'autobind-decorator'

export default class extends Service implements Compiler {
  public name = '@roots/bud-compiler'

  public _instance: Compiler.Instance

  public isCompiled: boolean = false

  public stats: any

  public statsOptions = {
    all: false,
    version: true,
    hash: true,
    timings: true,
    modules: false,
    moduleAssets: false,
    builtAt: false,
    assets: true,
    chunks: false,
    children: false,
    errors: true,
    env: true,
    entrypoints: true,
    colors: true,
  }

  public errors = []

  public progress: Compiler.Progress

  public get instance(): Compiler.Instance {
    return this._instance
  }

  public set instance(instance: Compiler.Instance) {
    this._instance = instance
  }

  @bind
  public compile(
    config?: Compiler.Config,
    cb?: (err?: Error, stats?: any) => undefined,
  ): Compiler.Instance {
    if (this.isCompiled) {
      return this.instance
    }

    this.instance = webpack(config, cb ?? null)
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
      process.exit()
    })

    if (!stats) return

    stats.hasErrors() &&
      console.error(stats?.errors?.toString(this.statsOptions))

    console.log(stats?.toString(this.statsOptions))
  }
}
