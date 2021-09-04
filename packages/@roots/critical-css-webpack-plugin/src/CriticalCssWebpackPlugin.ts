import {boundMethod as bind} from 'autobind-decorator'
import critical from 'critical'
import safeRequire from 'safe-require'
import vinyl from 'vinyl'
import * as Webpack from 'webpack'

import type {Options} from './interface'

/**
 * @const HtmlWebpackPlugin
 */
const HtmlWebpackPlugin = safeRequire('html-webpack-plugin')

/**
 * @const INIT_OPTIONS
 */
const INIT_OPTIONS = {
  criticalOptions: {
    extract: true,
    width: 375,
    height: 565,
  },
}

/**
 * CriticalCSSWebpackPlugin
 */
class CriticalCssWebpackPlugin {
  /**
   * Plugin ident
   */
  public plugin = {
    name: 'CriticalCssWebpackPlugin',
    stage: Webpack.Compilation.PROCESS_ASSETS_STAGE_DERIVED,
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
   * @private
   */
  private _options: Options = INIT_OPTIONS

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
   * chunks to be written to json
   *
   * @var {[type]}
   */
  public entrypoints: {
    [key: string]: any
  } = {}

  /**
   * Class constructor
   *
   * @param   {Options}  options criticalcss options
   */
  public constructor(options?: Options) {
    Object.assign(this, {options})
  }

  /**
   * apply plugin
   *
   * @remarks
   * This method is called by webpack.
   *
   * @see {@link WebpackPluginInstance['apply']}
   *
   * @param   {Webpack.Compiler} compiler
   * @returns {Promise<void>}
   *
   * @decorator `@bind`
   */
  @bind
  public async apply(compiler: Webpack.Compiler): Promise<void> {
    this.webpack.compiler = compiler

    this.webpack.compiler.hooks.thisCompilation.tap(
      this.plugin,
      this.compilation,
    )
  }

  /**
   * [Compilation description]
   *
   * @var {[type]}
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
    for (const [entryName, entry] of this.webpack.compilation
      .entrypoints) {
      await Promise.all(
        entry.chunks.map(async chunk => {
          await Promise.all(
            this.getMergedCssModules(chunk).map(async module => {
              await this.criticalEntry(entryName, module)
            }),
          )
        }),
      )
    }

    callback()
  }

  /**
   * Critical css from aggregated entrypoint css sources
   */
  @bind
  public async criticalEntry(
    entry: string,
    module: Webpack.Module,
  ) {
    const name = this.maybeHashName(module, entry)

    const {css, uncritical} = await this.generateCritical(
      entry,
      name,
      (module as any).content.toString(),
    )

    this.webpack.compilation.emitAsset(
      `${name}.css`,
      new Webpack.sources.RawSource(uncritical),
    )

    this.webpack.compilation.emitAsset(
      `critical/${name}.css`,
      new Webpack.sources.RawSource(css),
    )

    HtmlWebpackPlugin.getHooks(
      this.webpack.compilation,
    ).beforeEmit.tapAsync(this.plugin.name, this.htmlInject(css))
  }

  /**
   * Get merged css modules
   */
  @bind
  public getMergedCssModules(chunk) {
    return this.webpack.compilation.chunkGraph
      .getChunkModules(chunk)
      .filter(module => {
        return (
          module?.type.includes('css') && (module as any).content
        )
      })
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
      const hash =
        this.webpack.compilation.chunkGraph.getRenderedModuleHash(
          module,
          runtime,
        )

      name = `${name}.${hash}`
    }

    return name
  }

  /**
   * Generates critical css
   */
  @bind
  public async generateCritical(
    entry: string,
    file: string,
    contents: string,
  ) {
    return await critical.generate({
      ...this.options.criticalOptions,
      base:
        this.options.criticalOptions.base ??
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

  /**
   * Inline HTML webpack plugin
   */
  @bind
  public htmlInject(css: string) {
    return async (
      data: {html: string},
      cb: (...args: any) => any,
    ) => {
      data.html = data.html.replace(
        this.options.replace,
        `<style>${css}</style>`,
      )

      cb(null, data)
    }
  }
}

export {CriticalCssWebpackPlugin}
