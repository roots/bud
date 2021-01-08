import Service from './Service'
import options from './options'
import {webpack, ProgressPlugin} from '@roots/bud-support'
import type {Compiler, Webpack} from '@roots/bud-typings'

/**
 * Compiler
 */
export default class extends Service implements Compiler {
  public statsOptions: Compiler.Stats.Options = options

  public instance: Webpack.Compiler

  public stats: Compiler.Stats.Output

  public errors: string[]

  public progress: Compiler.Progress

  public register(): void {
    this.get = this.get.bind(this)
    this.run = this.run.bind(this)
    this.set = this.set.bind(this)
    this.compile = this.compile.bind(this)
    this.applyPlugins = this.applyPlugins.bind(this)
  }

  public get(): Webpack.Compiler {
    return this.instance
  }

  public set(compiler: Webpack.Compiler): void {
    this.instance = compiler
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
