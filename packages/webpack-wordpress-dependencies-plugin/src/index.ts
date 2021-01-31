import './interface'

import path from 'path'
import {RawSource} from 'webpack-sources'
import Webpack, {ExternalsPlugin} from 'webpack'
import {wpPkgs} from '@roots/bud-support'

export class Plugin {
  public name = 'WordPressDependenciesWebpackPlugin'

  public stage = Infinity

  public output: WordPressExternals.Output = {
    dir: '',
    name: '',
    file: '',
    publicPath: '',
    content: {},
  }

  public options: any

  public externalsPlugin: ExternalsPlugin

  /**
   * Class constructor
   */
  constructor(
    options = {
      name: 'wordpress.json',
    },
  ) {
    this.options = options

    this.output.name = this.options.name

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

    compiler.hooks.emit.tapAsync(
      this.constructor.name,
      this.emit.bind(this),
    )
  }

  public async emit(
    compilation: Webpack.compilation.Compilation,
    callback: () => void,
  ): Promise<void> {
    compilation.entrypoints.forEach(entry => {
      entry.chunks.forEach(chunk => {
        this.output.content[entry.name] = Array.from(
          chunk.modulesIterable,
        ).reduce((acc: any, module: any) => {
          return module?.userRequest &&
            wpPkgs.isProvided(module.userRequest)
            ? [
                ...acc,
                wpPkgs.transform(module.userRequest).enqueue,
              ]
            : acc
        }, [])
      })
    })

    compilation.assets[this.output.name] = new RawSource(
      JSON.stringify(this.output.content),
    )

    callback()
  }
}
