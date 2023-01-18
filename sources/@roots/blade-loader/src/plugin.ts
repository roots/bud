import {relative} from 'node:path'

import {globby} from 'globby'
import type {Compiler, WebpackPluginInstance} from 'webpack'
import webpack from 'webpack'

interface Options {
  templates?: string | Array<string>
}

export default class BladeWebpackPlugin implements WebpackPluginInstance {
  public constructor(public options?: Options) {
    this.apply = this.apply.bind(this)
  }

  public async apply(compiler: Compiler) {
    new webpack.DynamicEntryPlugin(compiler.context, async () => ({
      __bud_blade: {
        import: await globby(
          this.options?.templates ?? `**/*.blade.php`,
        ).then(files =>
          files.map(file => relative(compiler.context, file)),
        ),
        runtime: false,
        filename: () => `__bud_blade.js`,
      },
    })).apply(compiler)

    compiler.hooks.shouldEmit.tap(this.constructor.name, compilation => {
      compilation.entrypoints.delete(`__bud_blade`)
      return true
    })

    compiler.hooks.afterEnvironment.tap(this.constructor.name, () => {
      compiler.options.module.rules.unshift({
        test: /\.blade\.php$/,
        use: [
          {loader: `file-loader`, options: {emitFile: false}},
          {loader: `@roots/blade-loader/loader`},
        ],
      })
    })
  }
}
