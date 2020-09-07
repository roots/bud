import {RawSource} from 'webpack-sources'
import Webpack from 'webpack'
import path from 'path'

class EntrypointsWebpackPlugin {
  public name = 'entrypoints-webpack-plugin'
  public outputFile: string

  apply(compiler: Webpack.Compiler): void {
    this.outputFile = compiler.options.output.filename as string
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
    const publicPath = compilation.outputOptions.publicPath

    compilation.entrypoints.forEach(entrypoint => {
      output[entrypoint.name] = entrypoint.chunks.map(chunk =>
        path.resolve(publicPath, `${chunk.name}.js`),
      )
    })

    /**
     * Write to JSON
     */
    compilation.assets[
      this.outputFile.replace('[name].js', 'entrypoints.json')
    ] = new RawSource(JSON.stringify(output))

    callback()
  }
}

export {EntrypointsWebpackPlugin as default}
