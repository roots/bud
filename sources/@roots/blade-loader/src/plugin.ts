import {join} from 'node:path'

import {globby} from 'globby'
import type {Compiler, WebpackPluginInstance} from 'webpack'
import webpack from 'webpack'

interface Options {
  directory?: string
}

export default class BladeWebpackPlugin implements WebpackPluginInstance {
  public constructor(public options?: Options) {}

  public async apply(compiler: Compiler) {
    const directory = this.options?.directory ?? compiler.context
    const viewPaths = [join(directory, `**/*.blade.php`)]

    // Inject entry into the main compilation
    new webpack.DynamicEntryPlugin(compiler.context, async () => ({
      blade: {import: await globby(viewPaths)},
    })).apply(compiler)

    compiler.hooks.afterEnvironment.tap(`BladeWebpackPlugin`, () => {
      compiler.options.module.rules.unshift({
        test: /\.blade\.php$/,
        use: [`@roots/blade-loader/loader`],
      })
    })
  }
}
