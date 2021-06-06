import Webpack, {Chunk, Compiler, Compilation} from 'webpack'
import {boundMethod as bind} from 'autobind-decorator'
import {uniq} from 'lodash'

class EntrypointsWebpackPlugin implements Entrypoints.Plugin {
  protected plugin = {
    name: 'EntrypointsManifestPlugin',
    stage: Infinity,
  }

  public name: string = 'entrypoints.json'

  public compiler: Compiler

  public compilation: Compilation

  public publicPath: string

  public assets: Entrypoints.Entry

  public constructor(options?: Entrypoints.Options) {
    options &&
      Object.keys(options).map(prop => {
        Object.assign(this, {[prop]: options[prop]})
      })
  }

  @bind
  public apply(compiler: Compiler): void {
    this.assets = {}

    this.compiler = compiler
    this.publicPath =
      this.publicPath ||
      (this.compiler.options.output.publicPath as string)

    this.compiler.hooks.thisCompilation.tap(
      this.plugin,
      (compilation: Compilation) => {
        this.compilation = compilation

        this.compilation.hooks.processAssets.tap(
          {...this.plugin, additionalAssets: true},
          this.processAssets,
        )
      },
    )
  }

  @bind
  public processAssets() {
    this.compilation.entrypoints.forEach(entry => {
      this.getEntrypointFiles(entry).map(file => {
        !file.includes('hot-update') &&
          this.addToManifest({
            entry: entry.name,
            file,
          })
      })
    })

    this.compilation.assets[this.name] =
      new Webpack.sources.RawSource(
        JSON.stringify({...this.assets}),
        true,
      )
  }

  @bind
  public addToManifest({entry, file}) {
    const type = file.split('.').pop()

    if (!this.assets[entry]) {
      this.assets[entry] = {
        [type]: null,
      }
    }

    this.assets[entry] = {
      ...this.assets[entry],
      [type]: uniq([
        ...(this.assets[entry][type] ?? []),
        this.publicPath.concat(file),
      ]),
    }
  }

  @bind
  public getEntrypointFiles(entry: {
    chunks: Chunk[]
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

export {EntrypointsWebpackPlugin}
