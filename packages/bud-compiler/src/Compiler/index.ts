import Service from './Service'
import options from './options'
import {webpack, ProgressPlugin} from '@roots/bud-support'
import type {Compiler, Webpack} from '@roots/bud-typings'

export default class extends Service implements Compiler {
  protected _statsOptions: Compiler.Stats.Options = options

  public get(): Webpack.Compiler {
    return this.instance
  }

  public set(compiler: Webpack.Compiler): void {
    this.instance = compiler
  }

  public get instance(): Webpack.Compiler {
    return this._instance
  }

  public set instance(compiler: Webpack.Compiler) {
    this._instance = compiler
  }

  public get stats(): {
    string: string
    json: Compiler.Stats.Output['json']
  } {
    return this._stats
  }

  public set stats(stats: Compiler.Stats.Output) {
    this._stats = this.app.hooks.filter<Compiler.Stats.Output>(
      'compiler.stats',
      stats,
    )
  }

  public get statsOptions(): Compiler.Stats.Options {
    return this._statsOptions
  }

  public set statsOptions(options: Compiler.Stats.Options) {
    this._statsOptions = options
  }

  public compile(
    config?: Webpack.Configuration,
  ): Webpack.Compiler {
    this.instance = webpack(config ?? this.app.build.make())

    return this.instance
  }

  public run(): void {
    this.instance.run((_err, stats) => {
      if (stats.hasErrors() && !this.app.mode.ci) {
        console.error(stats.toString(this.statsOptions.string))
      }

      this.stats = {
        string: stats.toString(this.statsOptions.string),
        json: stats.toJson(this.statsOptions.json),
      }
    })
  }

  public makeError(err: string): void {
    new Error(err)
  }

  public applyPlugins(handler: Compiler.ProgressHandler): void {
    new ProgressPlugin(handler).apply(this.instance)
  }
}
