import fetchExternals from './fetchExternals'
import externalsPlugin from './externalsPlugin'
import {Hash} from './fetchExternals'
import {RawSource} from 'webpack-sources'
import Webpack, {ExternalsPlugin} from 'webpack'

class WordPressExternalsWebpackPlugin {
  public name = 'wordpress-externals'
  public externalsPlugin: ExternalsPlugin
  public outputFile:
    | string
    | ((chunkData: Webpack.ChunkData) => string)

  constructor() {
    this.emit = this.emit.bind(this)

    this.externalsPlugin = new ExternalsPlugin(
      'this',
      externalsPlugin.bind(this),
    )
  }

  apply(compiler: Webpack.Compiler): void {
    this.outputFile = compiler.options.output.filename as string

    this.externalsPlugin.apply(compiler)

    compiler.hooks.emit.tapAsync(
      this.constructor.name,
      this.emit.bind(this),
    )
  }

  async emit(
    compilation: Webpack.compilation.Compilation,
    callback: () => void,
  ): Promise<void> {
    const output = {}
    const externals: Hash = await fetchExternals()

    compilation.entrypoints.forEach(entrypoint => {
      const dependencies = []
      const outputKey = entrypoint.name

      entrypoint.chunks.forEach(chunk => {
        chunk.modulesIterable.forEach(module => {
          externals[module.userRequest] &&
            dependencies.push(
              externals[module.userRequest].enqueue,
            )
        })
      })

      output[outputKey] = dependencies
    })

    compilation.assets[
      (this.outputFile as string).replace(
        '[name].js',
        'wordpress.json',
      )
    ] = new RawSource(JSON.stringify(output))

    callback()
  }
}

export {WordPressExternalsWebpackPlugin as default}
