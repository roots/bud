import {RawSource} from 'webpack-sources'
import Webpack from 'webpack'
import path from 'path'
import {SyncWaterfallHook} from 'tapable'

class EntrypointsWebpackPlugin {
  public output: Output

  public plugin: {
    name: string
    stage: number
  }

  public options: Options

  constructor(
    options: Options = {
      name: 'entrypoints.json',
      writeToFileEmit: true,
    },
  ) {
    this.options = {
      name: options.name,
      writeToFileEmit: options.writeToFileEmit,
    }

    this.output = {
      dir: '',
      name: this.options.name,
      file: '',
      publicPath: '',
      content: {},
    }

    this.plugin = {
      name: 'EntrypointsManifestPlugin',
      stage: Infinity,
    }

    this.emit = this.emit.bind(this)
  }

  apply(compiler: Webpack.Compiler): void {
    this.output.dir = compiler.options.output.path
    this.output.publicPath = compiler.options.output.publicPath
    this.output.file = path.resolve(
      this.output.dir,
      this.output.name,
    )

    this.output.name = path.relative(
      this.output.dir,
      this.output.file,
    )

    compiler.hooks.emit.tapAsync(this.plugin, this.emit)
  }

  async emit(
    compilation: Webpack.compilation.Compilation,
    callback: () => void,
  ): Promise<void> {
    const {assets, entrypoints, hooks}: any = compilation

    hooks.entrypoints = new SyncWaterfallHook([
      'compilation',
      'output',
    ])
    hooks.entrypoints.tap(
      this.plugin,
      this.entrypoints.bind(this),
    )

    this.output = hooks.entrypoints.call(
      entrypoints,
      this.output,
    )

    if (this.options.writeToFileEmit) {
      assets[this.output.name] = new RawSource(
        JSON.stringify(this.output.content),
      )
    }

    callback()
  }

  entrypoints(entrypoints, output: Output): Output {
    entrypoints.forEach(entrypoint => {
      output.content[
        entrypoint.name
      ] = entrypoint.chunks.map(chunk =>
        path.resolve(output.publicPath, `${chunk.name}.js`),
      )
    })

    return output
  }
}

type Content =
  | {
      [key: string]: string | string[]
    }
  | {
      [key: string]: string | string[]
    }[]
  | null

type Output = {
  dir: string
  name: string
  file: string
  publicPath: string
  content: Content
}

type Options = {
  name: string
  writeToFileEmit: boolean
}

export {EntrypointsWebpackPlugin as default}
