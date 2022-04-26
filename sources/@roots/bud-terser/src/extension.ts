import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import TerserPlugin from 'terser-webpack-plugin'

type Options = TerserPlugin.BasePluginOptions & {
  minify?: TerserPlugin.MinimizerImplementation<any>
  terserOptions?: TerserPlugin.MinimizerOptions<any>
}

@label('@roots/bud-terser')
@options({
  include: app => app.hooks.filter('pattern.js'),
  extractComments: false,
  terserOptions: {
    compress: false,
    mangle: {
      safari10: true,
    },
    output: {
      comments: false,
      ascii_only: true,
    },
  },
})
@expose('terser')
export default class Terser extends Extension<Options> {
  @bind
  public async boot() {
    this.app.hooks.on('build.optimization.minimizer', minimizer => {
      minimizer.push(new TerserPlugin(this.options))
      return minimizer
    })
  }

  @bind
  public config(options: Options): Bud {
    this.options = options
    return this.app
  }
}
