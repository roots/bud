import fetchExternals, {Hash} from './fetchExternals'
import externalsPlugin from './externalsPlugin'

import {RawSource} from 'webpack-sources'
import Webpack, {ExternalsPlugin} from 'webpack'
import path from 'path'

class WordPressExternalsWebpackPlugin {
  public name = 'wordpress-externals'
  public plugin
  public externalsPlugin: ExternalsPlugin
  public output: Output
  public options: Options

  constructor(
    options: Options = {
      name: 'wordpress.json',
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
      name: 'WordPressExternalsWebpackPlugin',
      stage: Infinity,
    }

    this.externalsPlugin = new ExternalsPlugin(
      'this',
      externalsPlugin.bind(this),
    )

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

      this.output.content[outputKey] = dependencies
    })

    compilation.assets[this.output.name] = new RawSource(
      JSON.stringify(this.output.content),
    )

    callback()
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

export {WordPressExternalsWebpackPlugin as default}
