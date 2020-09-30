import type Bud from '@roots/bud-types'
import DependencyExtractionWebpackPlugin from '@wordpress/dependency-extraction-webpack-plugin'

/**
 * @wordpress/dependency-extraction-webpack-plugin
 * @deprecated Please use @roots/bud-wordpress-manifests
 */
export const DependencyExtraction: Bud.Plugin.Factory = function (
  bud,
) {
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
       * @wordpress/dependency-extraction-webpack-plugin
       * @deprecated Please use @roots/bud-wordpress-manifests
       */
      this.bud.apply('extract', function (
        this: Bud,
        settings?: DependencyExtractionWebpackPlugin.Options,
      ): Bud {
        settings &&
          this.options.merge(
            'webpack.plugins.wordpress-dependency-extraction-webpack-plugin',
            settings,
          )

        return this
      })

      this.bud.plugins.set(
        'wordpress-dependency-extraction-webpack-plugin',
        (bud: Bud) => ({
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
