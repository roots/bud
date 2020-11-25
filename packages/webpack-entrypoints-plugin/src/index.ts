import {RawSource} from 'webpack-sources'
import Webpack from 'webpack'
import path from 'path'
import {SyncWaterfallHook} from 'tapable'

class EntrypointsWebpackPlugin {
  /**
   * Plugin ident
   */
  public plugin = {
    name: 'EntrypointsManifestPlugin',
    stage: Infinity,
  }

  /**
   * Hook to webpack compilation output.
   */
  public hook = ['compilation', 'output']

  /**
   * Emitted filename
   */
  public name: string

  /**
   * Emitted file path
   */
  public path: string

  /**
   * Emitted file
   */
  public file: string

  /**
   * Public path of emitted assets
   */
  public publicPath: string

  /**
   * Emitted contents
   */
  public output: Output = {}

  /**
   * Should manifest be emitted
   */
  public writeToFileEmit: boolean

  /**
   * Class constructor
   */
  constructor(
    options: Options = {
      name: 'entrypoints.json',
      writeToFileEmit: true,
    },
  ) {
    Object.assign(this, options)

    this.emit = this.emit.bind(this)
    this.apply = this.apply.bind(this)
    this.makeEntry = this.makeEntry.bind(this)
    this.pushChunk = this.pushChunk.bind(this)
    this.entrypoints = this.entrypoints.bind(this)
  }

  /**
   * Webpack apply plugin
   */
  apply(compiler: Webpack.Compiler): void {
    this.publicPath = compiler.options.output.publicPath

    this.path = path.resolve(
      compiler.options.output.path,
      this.name,
    )

    this.file = path.relative(
      compiler.options.output.path,
      this.path,
    )

    compiler.hooks.emit.tapAsync(this.plugin, this.emit)
  }

  /**
   * Emit manifest
   */
  async emit(
    compilation: Webpack.compilation.Compilation,
    callback: () => void,
  ): Promise<void> {
    const {
      assets,
      entrypoints,
      hooks,
    }: {
      assets: Webpack.compilation.Compilation['assets']
      entrypoints: Webpack.compilation.Compilation['entrypoints']
      hooks: any // Webpack.compilation.Compilation['hooks']
    } = compilation

    hooks.entrypoints = new SyncWaterfallHook(this.hook)
    hooks.entrypoints.tap(this.plugin, this.entrypoints)
    hooks.entrypoints.call(entrypoints, this.output)

    if (this.writeToFileEmit) {
      assets[this.file] = new RawSource(
        JSON.stringify(this.output),
      )
    }

    callback()
  }

  /**
   * Map entrypoints to output
   */
  public entrypoints(
    entrypoints: SyncWaterfallHook['call']['arguments'],
  ): void {
    entrypoints.forEach(entry => {
      this.makeEntry(entry.name)

      entry.chunks.map(chunk => {
        this.pushChunk(
          entry.name,
          chunk.files[0].split('.').pop(),
          path.resolve(this.publicPath, chunk.files[0]),
        )
      })
    })
  }

  /**
   * Assign entrypoint to output property
   */
  public makeEntry(name: string): void {
    this.output[name] = {
      js: [],
      css: [],
    }
  }

  /**
   * Push chunk onto existing manifest entry.
   */
  public pushChunk(
    name: string,
    type: string,
    entry: string,
  ): void {
    this.output[name][type].push(entry)
  }
}

/**
 * Schema for manifest entry
 */
export type EntrySchema = {
  css: string[]
  js: string[]
}

/**
 * Manifest structure
 */
export type Output = {
  [key: string]: EntrySchema
}

/**
 * Constructor params
 */
export type Options = {
  name: string
  writeToFileEmit: boolean
}

export {EntrypointsWebpackPlugin as default}
