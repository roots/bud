import Webpack from 'webpack'
import critical from 'critical'
import {boundMethod as bind} from 'autobind-decorator'
import {join} from 'path'

/**
 * critical-css-webpack-plugin
 */
export class Plugin {
  /**
   * Plugin ident
   */
  public plugin = {
    name: 'CriticalCssPlugin',
    stage: Infinity,
  }

  /**
   * Webpack lifecycle events
   */
  public webpack: {
    compiler: Webpack.Compiler
    compilation: Webpack.Compilation
  } = {
    compiler: null,
    compilation: null,
  }

  /**
   * Options
   */
  public options: critical = {
    src: 'index.html',
    target: 'index.css',
    inline: true,
    minify: true,
    extract: true,
    width: 375,
    height: 565,
    concurrency: 4,
    penthouse: {
      blockJSRequests: false,
    },
  }

  public critical = critical

  /**
   * Emitted contents
   */
  public output: {[key: string]: string} = {}

  /**
   * Constructor
   */
  public constructor(options) {
    this.options = {
      ...this.options,
      ...options,
    }
  }

  /**
   * Webpack apply plugin
   */
  @bind
  apply(compiler: Webpack.Compiler): void {
    this.webpack.compiler = compiler

    this.webpack.compiler.hooks.compilation.tap(
      this.plugin,
      this.compilation,
    )
  }

  /**
   * Compilation
   */
  @bind
  public compilation(compilation) {
    this.webpack.compilation = compilation

    this.webpack.compilation.hooks.processAssets.tapAsync(
      this.plugin,
      this.processAssets,
    )

    this.webpack.compilation.hooks.afterProcessAssets.tap(
      this.plugin,
      this.afterProcessAssets,
    )
  }

  /**
   * Process assets
   */
  @bind
  public async processAssets(
    assets: Webpack.Compilation['assets'],
    callback: () => any,
  ) {
    Object.entries(assets).filter(([filename]) =>
      /\.css$/.test(filename),
    )

    callback()
  }

  /**
   * Asset reducer
   */
  @bind
  public assetReducer(acc, [filename, css]: [string, string]) {
    const file = join(
      this.webpack.compilation.outputOptions.path,
      filename,
    )

    return {...acc, [file]: css}
  }

  /**
   * After process assets
   */
  @bind
  public afterProcessAssets(assets) {
    Object.entries(this.output).forEach(
      ([file, css]: [string, string]) => {
        assets[file] = new Webpack.sources.RawSource(css)
      },
    )
  }
}

/**
 * @exports Plugin
 */
export default Plugin
