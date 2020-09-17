import DependencyExtractionWebpackPlugin from '@wordpress/dependency-extraction-webpack-plugin'
import type DependencyExtractionOptions from '@wordpress/dependency-extraction-webpack-plugin'
import {BudInterface, Plugin} from '@roots/bud'

const dependencyExtractionPlugin: Plugin = function (bud: BudInterface) {
  return {
    bud,

    make: function () {
      this.bud.options.set(
        'webpack.plugins.wordpress-dependency-extraction-webpack-plugin',
        {
          injectPolyfill: false,
          outputFormat: 'json',
          requestToExternal: request => {
            if (request === '@babel/runtime/regenerator')
              return null
          },
        },
      )

      /**
       * ## bud.dependencyExtraction
       *
       * Configures @wordpress/dependency-extraction-webpack-plugin
       *
       * @see https://git.io/JJLxM
       *
       * ```js
       * bud.dependencyExtraction({
       *   outputFormat: 'js',
       *   injectPolyfill: false,
       * })
       * ```
       */
      this.bud.apply('extract', function (
        this: BudInterface,
        settings?: DependencyExtractionOptions,
      ): BudInterface {
        settings &&
          this.options.merge(
            'webpack.plugins.wordpress-dependency-extraction-webpack-plugin',
            settings,
          )

        return this
      })

      this.bud.plugins.set(
        'wordpress-dependency-extraction-webpack-plugin',
        (bud: BudInterface) => ({
          options: bud.options.get(
            'webpack.plugins.wordpress-dependency-extraction-webpack-plugin',
          ),

          make: function () {
            return new DependencyExtractionWebpackPlugin(
              this.options,
            )
          },
        }),
      )
    },
  }
}

module.exports = dependencyExtractionPlugin
