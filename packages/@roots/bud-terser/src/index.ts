import {Framework, Module} from '@roots/bud-framework'
import TerserPlugin from 'terser-webpack-plugin'
import {TerserPluginOptions} from 'terser-webpack-plugin'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.terser  [💁 Fluent]
     *
     * Configure the minifier. [🔗 Documentation](#)
     *
     * For more information on options [see the
     * terser-webpack-plugin docs](https://webpack.js.org/plugins/terser-webpack-plugin/).
     */
    terser: Terser.Configure
  }

  namespace Framework {
    interface Extensions {
      'terser-webpack-plugin': Module
    }
  }
}

namespace Terser {
  export type Configure = (
    options: TerserPluginOptions,
  ) => Framework
}

export const name: Module['name'] = 'terser-webpack-plugin'

export const options: Module.Options<TerserPlugin.Options> =
  app => ({
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

export const boot: Module.Boot = ({
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

export const api = {
  terser: function (
    this: Framework,
    options: TerserPluginOptions,
  ): Framework {
    this.hooks.on(
      'extension/terser-webpack-plugin/options',
      () => options,
    )
    return this
  },
}

const extension: Module = {name, options, api, boot}
export {extension, extension as default}
