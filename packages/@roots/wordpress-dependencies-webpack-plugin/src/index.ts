import './interface'

import path from 'path'
import {RawSource} from 'webpack-sources'
import Webpack from 'webpack'
import {wpPkgs} from '@roots/bud-support'

export class Plugin {
  public plugin = {
    name: 'WordPressDependenciesWebpackPlugin',
    stage: Infinity,
  }

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
    name: 'wordpress.json',
    file: '',
    publicPath: '',
    content: {},
  }

  public options: any

  /**
   * Plugin apply
   * @see Tapable
   */
  apply(compiler: Webpack.Compiler): void {
    this.output.publicPath = compiler.options.output.publicPath

    this.output.file = path.resolve(
      compiler.options.output.path,
      this.output.name,
    )

    this.output.name = path.relative(
      compiler.options.output.path,
      this.output.file,
    )

    compiler.hooks.thisCompilation.tap(
      this.plugin,
      (compilation: Webpack.Compilation): void => {
        compilation.hooks.processAssets.tap(
          this.plugin,
          (): void => {
            compilation.entrypoints.forEach(entry => {
              entry.chunks.forEach(chunk => {
                this.output.content[
                  entry.name
                ] = compilation.chunkGraph
                  .getChunkModules(chunk)
                  .reduce((acc: any, module: any) => {
                    return module?.userRequest &&
                      wpPkgs.isProvided(module.userRequest)
                      ? [
                          ...acc,
                          wpPkgs.transform(module.userRequest)
                            .enqueue,
                        ]
                      : acc
                  }, [])
              })
            })

            compilation.assets[this.output.name] = new RawSource(
              JSON.stringify(this.output.content),
            )
          },
        )
      },
    )
  }
}
