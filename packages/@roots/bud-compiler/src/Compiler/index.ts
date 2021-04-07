import options from './options'
import {Service as Base} from '@roots/bud-framework'
import {bind, webpack, ProgressPlugin} from '@roots/bud-support'
import type {Compiler, Webpack} from '@roots/bud-typings'

/**
 * Compiler
 */
export default class extends Base implements Compiler {
  /**
   * Service ident.
   */
  public name = 'compiler'

  /**
   * Compiler instance
   */
  public _instance: Webpack.Compiler

  /**
   * Stats options
   */
  public statsOptions: Compiler.Stats.Options = options

  /**
   * Stats
   */
  public stats: Compiler.Stats.Output

  /**
   * Errors
   */
  public errors: string[]

  /**
   * Progress
   */
  public progress: Compiler.Progress

  /**
   * Compiler accessors.
   */
  public get instance(): Webpack.Compiler {
    return this._instance
  }

  public set instance(instance: Webpack.Compiler) {
    this._instance = instance
  }

  /**
   * Compile
   */
  @bind
  public compile(conf): Webpack.Compiler {
    return (this.instance = webpack(conf))
  }

  /**
   * Run compilation
   */
  @bind
  public run(): void {
    this.instance.run((_err, stats) => {
      this.stats = {
        string: stats.toString(),
        json: stats.toJson(),
      }
    })
  }

  /**
   * Make error
   */
  @bind
  public makeError(err: string): void {
    this.error({err})
    new Error(err)
  }

  /**
   * Apply plugins to compilation
   */
  @bind
  public applyPlugins(handler: Compiler.ProgressHandler): void {
    new ProgressPlugin(handler).apply(this.instance)
  }
}
