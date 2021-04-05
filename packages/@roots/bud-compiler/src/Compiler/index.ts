import Service from './Service'
import options from './options'
import Webpack, {ProgressPlugin} from 'webpack'
import {Compiler} from '@roots/bud-framework'

/**
 * Compiler
 */
export default class extends Service implements Compiler {
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
  public errors = []

  /**
   * Progress
   */
  public progress: Compiler.Progress

  /**
   * Register service.
   */
  public register(): void {
    this.run = this.run.bind(this)
    this.compile = this.compile.bind(this)
    this.applyPlugins = this.applyPlugins.bind(this)
  }

  /**
   * Compiler accessors.
   */
  public get compiler(): Webpack.Compiler {
    return this._instance
  }
  public set compiler(compiler: Webpack.Compiler) {
    this._instance = compiler
  }

  /**
   * Instantiates compilation
   */
  public run(): void {
    this.instance.run(
      (err?: Error, stats?: {[key: string]: any}) => {
        if (err) {
          this.errors = [...this.errors, err.toString()]
        }

        this.stats = {
          string: stats.toString(),
          json: stats.toJson(),
        }
      },
    )
  }

  /**
   * Compile
   */
  public compile(
    config: Webpack.Configuration,
  ): Webpack.Compiler {
    return (this.instance = Webpack(config))
  }

  /**
   * Make error
   */
  public makeError(err: string): void {
    this.error({err})
    new Error(err)
  }

  /**
   * Apply plugins to compilation
   */
  public applyPlugins(handler: Compiler.ProgressHandler): void {
    new ProgressPlugin(handler).apply(this.instance)
  }
}
