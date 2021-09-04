import type {
  Framework,
  WebpackPlugin,
} from '@roots/bud-framework'
import type {TerserPluginOptions} from 'terser-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

interface BudTerserPlugin
  extends WebpackPlugin<TerserPlugin, TerserPluginOptions> {
  name: '@roots/bud-terser'
  api: {
    terser: terser
  }
}

interface terser {
  (this: Framework, options: TerserPluginOptions): Framework
}

export const terser: terser = function (
  this: Framework,
  options: TerserPluginOptions,
): Framework {
  this.hooks.on(
    'extension/terser-webpack-plugin/options',
    () => options,
  )

  return this
}

export const name: BudTerserPlugin['name'] = '@roots/bud-terser'

export const options: BudTerserPlugin['options'] = (
  app: Framework,
) => ({
  parallel: app.hooks.filter('build/parallelism'),
  include: app.store.get('patterns.js'),
  extractComments: false,
  terserOptions: {
    parse: {
      ecma: 2018,
    },
    compress: false,
    mangle: {
      safari10: true,
    },
    output: {
      ecma: 5,
      comments: false,
      ascii_only: true,
    },
  },
})

export const boot: BudTerserPlugin['boot'] = ({
  extensions,
  hooks,
  isProduction,
}) => {
  hooks.on('build/optimization/minimize', isProduction)
  hooks.on('build/optimization/minimizer', minimizer => {
    return [
      new TerserPlugin(
        extensions.get('terser-webpack-plugin').options,
      ),
      ...(minimizer ?? []),
    ]
  })
}

export const api: BudTerserPlugin['api'] = {terser}

export type {BudTerserPlugin}
