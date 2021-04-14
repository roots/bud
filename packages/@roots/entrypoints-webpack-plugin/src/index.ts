import Webpack, {Chunk, Module} from 'webpack'
import {boundMethod as bind} from 'autobind-decorator'

/**
 * Entrypoints Webpack Plugin
 */
export class Plugin {
  /**
   * Plugin ident
   */
  public plugin = {
    name: 'EntrypointsManifestPlugin',
    stage: Infinity,
  }

  /**
   * Emitted filename
   */
  public name: string = 'entrypoints.json'

  /**
   * Webpack references
   */
  public webpack: {
    compiler: Webpack.Compiler
    compilation: Webpack.Compilation
  } = {
    compiler: null,
    compilation: null,
  }

  public assets: {[key: string]: {[key: string]: string[]}}

  /**
   * Apply
   */
  @bind
  apply(compiler: Webpack.Compiler): void {
    this.assets = {}

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
  public compilation(compilation: Webpack.Compilation) {
    this.webpack.compilation = compilation

    this.webpack.compilation.hooks.processAssets.tap(
      {...this.plugin, additionalAssets: true},
      this.processAssets,
    )
  }

  /**
   * After process assets
   */
  @bind
  public processAssets() {
    this.webpack.compilation.entrypoints.forEach(entry => {
      this.getEntrypointFiles(entry).map(file => {
        !file.includes('hot-update') &&
          this.addToManifest(entry.name, file)
      })
    })

    this.webpack.compilation.assets[
      this.name
    ] = new Webpack.sources.RawSource(
      JSON.stringify({...this.assets}),
      true,
    )
  }

  /**
   * Add to manifest
   */
  @bind
  public addToManifest(entry, file) {
    const type = file.split('.').pop()

    this.assets[entry] = {
      ...(this.assets[entry] ?? {}),
      [type]:
        this.assets[entry] &&
        this.assets[entry][type] &&
        !this.assets[entry][type].includes(file)
          ? [...this.assets[entry][type], file]
          : [file],
    }
  }

  /**
   * Return publicPath from a dist relative path
   */
  @bind
  public publicPath(path: string) {
    return `${this.webpack.compiler.options.output.publicPath}${path}`
  }

  /**
   * Get merged css modules
   */
  @bind
  public getEntrypointFiles(entry: {
    chunks: Webpack.Chunk[]
    origins: any[]
  }): string[] {
    const files = entry.chunks.reduce(
      (acc: Module[], chunk: Chunk) => {
        const files = []

        for (const file of chunk.files) {
          files.push(file)
        }

        return [...acc, ...files]
      },
      [],
    )

    return files
  }
}

/**
 * Schema for manifest entry
 */
export type EntrySchema = {
  [key: string]: {
    [type: string]: {
      [handle: string]: string
    }
  }
}

/**
 * Literally the same
 * @todo transition to EntrySchema
 * @deprecated
 */
export type Output = EntrySchema

/**
 * Constructor params
 */
export type Options = {
  name?: string
  writeToFileEmit?: boolean
  publicPath?: string
  outputPath?: string
}
