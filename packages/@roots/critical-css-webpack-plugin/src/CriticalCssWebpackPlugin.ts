import type {Options} from './interface'
import Webpack from 'webpack'
import critical from 'critical'
import {boundMethod as bind} from 'autobind-decorator'
import vinyl from 'vinyl'

/**
 * CriticalCSSWebpackPlugin
 */
export class CriticalCssWebpackPlugin {
  /**
   * Plugin ident
   */
  public plugin = {
    name: 'CriticalCssWebpackPlugin',
    stage: Webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
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
    width: 375,
    height: 565,
  }

  /**
   * Entrypoint css mapping
   */
  public entrypointCss: {
    [key: string]: string
  } = {}

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

    this.webpack.compiler.hooks.thisCompilation.tap(
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
    this.mapConcatenatedStyles()

    await Promise.all(
      Object.entries(this.entrypointCss).map(
        async ([name, entry]) => {
          const {css, uncritical} = await this.generateCritical(
            name,
            entry,
          )

          Object.assign(assets, {
            [`critical/${name}.css`]: new Webpack.sources.RawSource(
              uncritical,
            ),
            [`critical/${name}.critical.css`]: new Webpack.sources.RawSource(
              css,
            ),
          })
        },
      ),
    )

    callback()
  }

  /**
   * Key concatenated styles by entrypoint name
   */
  @bind
  public mapConcatenatedStyles() {
    for (const [name, entry] of this.webpack.compilation
      .entrypoints) {
      entry.chunks.map(chunk => {
        this.webpack.compilation.chunkGraph
          .getChunkModules(chunk)
          .filter(
            module =>
              module?.type.includes('css') &&
              (module as any).content,
          )
          .map(module => {
            const outputName = this.maybeHashName(module, name)

            Object.assign(this.entrypointCss, {
              [outputName]: (module as any).content.toString(),
            })
          })
      })
    }
  }

  /**
   * Returns either the entrypoint name or the entrypoint name with a hash
   */
  @bind
  public maybeHashName(
    module: Webpack.Module,
    name: string,
  ): string {
    if (!this.options.hash) {
      return name
    }

    for (const runtime of this.webpack.compilation.chunkGraph.getModuleRuntimes(
      module,
    )) {
      name = this.webpack.compilation.chunkGraph.getRenderedModuleHash(
        module,
        runtime,
      )
    }

    return name
  }

  /**
   * Generates critical css
   */
  @bind
  public async generateCritical(file: string, contents: string) {
    const options = this.options
    delete options.hash

    return await critical.generate({
      ...options,
      base:
        this.options.base ??
        this.webpack.compilation.outputOptions.path,
      css: [this.vfile(file, contents)],
    })
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
