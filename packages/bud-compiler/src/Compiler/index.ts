import Service from './Service'
import options from './options'
import {webpack, ProgressPlugin} from '@roots/bud-support'
import type {Compiler, Webpack} from '@roots/bud-typings'

/**
 * Compiler
 */
export default class extends Service implements Compiler {
  public statsOptions: Compiler.Stats.Options = options

  public _compiler: Webpack.Compiler

  public stats: Compiler.Stats.Output

  public errors: string[]

  public progress: Compiler.Progress

  public register(): void {
    this.run = this.run.bind(this)
    this.compile = this.compile.bind(this)
    this.applyPlugins = this.applyPlugins.bind(this)
  }

  public get compiler(): Webpack.Compiler {
    return this._compiler
  }

  public set compiler(compiler: Webpack.Compiler) {
    this.compiler = compiler
  }

  public compile(): Webpack.Compiler {
    return (this.instance = webpack(this.app.build.make()))
  }

  public run(): void {
    this.instance.run((_err, stats) => {
      this.stats = {
        string: stats.toString(),
        json: stats.toJson(),
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
