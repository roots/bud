import './interface'

import path from 'path'
import {RawSource} from 'webpack-sources'
import Webpack from 'webpack'
import {wpPkgs} from '@roots/bud-support'

export class Plugin {
  public name = 'WordPressDependenciesWebpackPlugin'

  public stage = Infinity

  public output:
    | WordPressExternals.Output
    | {
        dir: string
        name: string
        file: string
        publicPath:
          | string
          | Webpack.Compiler['options']['output']['publicPath']
        content: {}
      } = {
    dir: '',
    name: '',
    file: '',
    publicPath: '',
    content: {},
  }

  public options: any

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

  /**
   * Plugin apply
   * @see Tapable
   */
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

  /**
   * Plugin emit
   * @see Webpack
   */
  public async emit(
    compilation: Webpack.Compilation,
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
