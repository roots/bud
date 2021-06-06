import Webpack from 'webpack'
import {boundMethod as bind} from 'autobind-decorator'

/**
 * Entrypoints Webpack Plugin
 */
export class Plugin {
  public plugin = {
    name: 'EntrypointsManifestPlugin',
    stage: Infinity,
  }

  public name: string = 'entrypoints.json'

  public webpack: {
    compiler: Webpack.Compiler
    compilation: Webpack.Compilation
  } = {
    compiler: null,
    compilation: null,
  }

  public assets: {[key: string]: {[key: string]: string[]}}

  public constructor(options?: Options) {
    options &&
      Object.keys(options).map(prop => {
        Object.assign(this, {[prop]: options[prop]})
      })
  }

  @bind
  apply(compiler: Webpack.Compiler): void {
    this.assets = {}

    this.webpack.compiler = compiler

    this.webpack.compiler.hooks.thisCompilation.tap(
      this.plugin,
      this.compilation,
    )
  }

  @bind
  public compilation(compilation: Webpack.Compilation) {
    this.webpack.compilation = compilation

    this.webpack.compilation.hooks.processAssets.tap(
      {...this.plugin, additionalAssets: true},
      this.processAssets,
    )
  }

  @bind
  public processAssets() {
    this.webpack.compilation.entrypoints.forEach(entry => {
      this.getEntrypointFiles(entry).map(file => {
        !file.includes('hot-update') &&
          this.addToManifest({
            entry: entry.name,
            file,
          })
      })
    })

    this.webpack.compilation.assets[this.name] =
      new Webpack.sources.RawSource(
        JSON.stringify({...this.assets}),
        true,
      )
  }

  @bind
  public addToManifest({entry, file}) {
    const type = file.split('.').pop()
    const id = file.split('.').shift()

    if (!this.assets[entry]) {
      this.assets[entry] = {
        [type]: null,
      }
    }

    this.assets[entry] = {
      ...this.assets[entry],
      [type]: {
        ...(this.assets[entry][type] ?? {}),
        [id]: file,
      },
    }
  }

  @bind
  public publicPath(path: string) {
    return `${this.webpack.compiler.options.output.publicPath}${path}`
  }

  @bind
  public getEntrypointFiles(entry: {
    chunks: Webpack.Chunk[]
    origins: any[]
  }): string[] {
    const files = []
    for (const chunk of entry.chunks) {
      Array.from(chunk.files).map(file => {
        files.push(file)
      })
    }

    return files
  }
}

/**
 * Schema for manifest entry
 */
export type EntrySchema = {
  [entry: string]: {
    [type: string]: {
      [source: string]: string
    }
  }
}

/**
 * Constructor params
 */
export type Options = {
  name?: string
  writeToFileEmit?: boolean
  publicPath?: string
  outputPath?: string
}
