import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import type TerserPlugin from 'terser-webpack-plugin'

type Options = TerserPlugin.BasePluginOptions & {
  minify?: TerserPlugin.MinimizerImplementation<any>
  terserOptions?: TerserPlugin.MinimizerOptions<any>
}

@label('@roots/bud-terser')
@expose('terser')
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
export default class Terser extends Extension<Options> {
  @bind
  public dropConsole(enable: boolean = true): this {
    this.options.terserOptions.compress = {
      ...(this.options.terserOptions.compress ?? {}),
      drop_console: enable,
    }
    return this
  }

  @bind
  public dropComments(enable: boolean = true): this {
    this.options.terserOptions.output = {
      ...(this.options.terserOptions.output ?? {}),
      comments: !enable,
    }
    return this
  }

  @bind
  public comments(enable: boolean = true): this {
    this.options.terserOptions.output = {
      ...(this.options.terserOptions.output ?? {}),
      comments: enable,
    }
    return this
  }

  @bind
  public mangle(mangle: Options['terserOptions']['mangle']): this {
    this.options.terserOptions.mangle = mangle

    return this
  }

  @bind
  public async beforeBuild() {
    if (!this.app.hooks.filter('build.optimization.minimize')) return

    const {default: TerserPlugin} = await this.import(
      'terser-webpack-plugin',
    )

    this.app.hooks.on('build.optimization.minimizer', minimizer => {
      minimizer.push(new TerserPlugin(this.options))
      return minimizer.filter(item => item !== '...')
    })
  }
}
