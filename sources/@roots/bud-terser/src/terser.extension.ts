import {Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import TerserPlugin from 'terser-webpack-plugin'

import {terser} from './terser.api'

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
export default class Terser extends Extension<
  TerserPlugin.BasePluginOptions & {
    minify?: TerserPlugin.MinimizerImplementation<any>
    terserOptions?: TerserPlugin.MinimizerOptions<any>
  }
> {
  @bind
  public async register() {
    this.app.api.bindFacade('terser', terser)
  }

  @bind
  public async boot() {
    this.app.hooks.on('build.optimization.minimizer', minimizer => {
      minimizer.push(new TerserPlugin(this.options))
      return minimizer
    })
  }
}
