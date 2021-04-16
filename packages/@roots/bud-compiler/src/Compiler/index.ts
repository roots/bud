import {Compiler, Service} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import webpack from 'webpack'
import options from './options'

/**
 * Compiler
 */
export default class extends Service implements Compiler {
  /**
   * Service ident.
   */
  public name = '@roots/bud-compiler'

  /**
   * Compiler instance
   */
  public _instance: Compiler.Instance

  /**
   * Stats options
   */
  public statsOptions: Compiler.Stats.Options = options

  /**
   * Stats
   */
  public stats: Compiler.Stats

  /**
   * Errors
   */
  public errors = []

  /**
   * Progress
   */
  public progress: Compiler.Progress

  /**
   * Compiler accessors.
   */
  public get instance(): Compiler.Instance {
    return this._instance
  }

  public set instance(instance: Compiler.Instance) {
    this._instance = instance
  }

  /**
   * Instantiates compilation
   */
  @bind
  public compile(config: Compiler.Config): Compiler.Instance {
    this.instance = webpack(config)

    return this.instance
  }

  /**
   * Compile
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
   * Apply plugins to compilation
   */
  @bind
  public applyPlugins(handler: Compiler.Progress.Handler): void {
    new webpack.ProgressPlugin(handler).apply(this.instance)
  }
}
