import type {Options} from './interface'
import Webpack from 'webpack'
import critical from 'critical'
import {boundMethod as bind} from 'autobind-decorator'
import vinyl from 'vinyl'

export {CriticalCssWebpackPlugin}

declare namespace CriticalCssWebpackPlugin {
  export {Options}
}

class CriticalCssWebpackPlugin {
  /**
   * Plugin ident
   */
  public plugin = {
    name: 'CriticalCssWebpackPlugin',
    stage: Webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
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
  public _options: Options = {
    minify: true,
    extract: true,
    width: 375,
    height: 565,
  }

  /**
   * Generated assets
   */
  public assets: Webpack.Compilation['assets'] = {}

  /**
   * Constructor
   */
  public constructor(options?: Options) {
    Object.assign(this, {options})
  }

  /**
   * Access: get options
   */
  public get options(): Options {
    return this._options
  }

  /**
   * Access: set options
   */
  public set options(options: Options) {
    this._options = {
      ...this._options,
      ...(options ?? {}),
    }
  }

  /**
   * Webpack apply plugin
   */
  @bind
  public apply(compiler: Webpack.Compiler): void {
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
  public compilation(compilation: Webpack.Compilation): void {
    this.webpack.compilation = compilation

    this.webpack.compilation.hooks.processAssets.tapAsync(
      this.plugin,
      this.processAssets,
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
    await Promise.all(
      Object.entries(assets)
        .filter(([file]) => /\.css$/.test(file))
        .map(async ([file, contents]) => {
          const {css, uncritical} = await this.generateCritical(
            file,
            contents,
          )

          Object.assign(this.assets, {
            ...(this.options.extract
              ? {[file]: uncritical}
              : {}),
            [file.replace('.css', '.critical.css')]: css,
          })
        }),
    )

    Object.entries(this.assets).forEach(([file, asset]) => {
      assets[file] = new Webpack.sources.RawSource(
        asset.toString(),
      )
    })

    callback()
  }

  @bind
  public async generateCritical(file, contents) {
    return await critical.generate(
      this.getAssetConfig(file, contents),
    )
  }

  @bind
  public getAssetConfig(file, contents) {
    return {
      ...this.options,
      base:
        this.options.base ??
        this.webpack.compilation.outputOptions.path,
      css: [this.vfile(file, contents.source())],
    }
  }

  /**
   * Vinyl adapter
   */
  @bind
  public vfile(path: string, contents: string | Buffer) {
    return new vinyl({
      base: this.webpack.compilation.outputOptions.path,
      path,
      contents: Buffer.from(contents),
    })
  }
}
