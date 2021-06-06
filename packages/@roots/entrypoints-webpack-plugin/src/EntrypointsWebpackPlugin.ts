import Webpack, {Chunk, Compiler, Compilation} from 'webpack'
import {boundMethod as bind} from 'autobind-decorator'

class EntrypointsWebpackPlugin implements Entrypoints.Plugin {
  protected plugin = {
    name: 'EntrypointsManifestPlugin',
    stage: Infinity,
  }

  public name: string = 'entrypoints.json'

  protected compiler: Compiler

  protected compilation: Compilation

  protected publicPath: string

  public assets: Entrypoints.Entry

  @bind
  apply(compiler: Compiler): void {
    this.assets = {}

    this.compiler = compiler
    this.publicPath = this.compiler.options.output
      .publicPath as string

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
  protected processAssets() {
    this.compilation.entrypoints.forEach(entry => {
      this.getEntrypointFiles(entry).map(file => {
        !file.includes('hot-update') &&
          this.addToManifest({
            entry: entry.name,
            file,
            info: this.compilation.getAsset(file).info,
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
  protected addToManifest({entry, file, info}) {
    const ext = file.split('.').pop()
    const source = file
      .replace(`.${info.hash}.`, '.')
      .replace(`.${info.contenthash}.`, '.')

    this.assets[entry] = {
      ...(this.assets[entry] ?? {}),
      [ext]: {
        ...(this.assets[entry] && this.assets[entry][ext]
          ? this.assets[entry][ext]
          : {}),
        [source]: `${this.publicPath}${file}`,
      },
    }
  }

  @bind
  protected getEntrypointFiles(entry: {
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
