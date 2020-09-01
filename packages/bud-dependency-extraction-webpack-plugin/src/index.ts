import DependencyExtractionWebpackPlugin from '@wordpress/dependency-extraction-webpack-plugin'
import type DependencyExtractionOptions from '@wordpress/dependency-extraction-webpack-plugin'

import {Bud} from '@roots/bud'
import {Plugin, PluginInterface} from '@roots/bud-typings'

const dependencyExtractionPlugin: Plugin = (
  bud: Bud,
): PluginInterface => ({
  bud,

  make: function () {
    this.bud.options.set('webpack.plugins.dependencyExtraction', {
      injectPolyfill: false,
      outputFormat: 'json',
      requestToExternal: request => {
        if (request === '@babel/runtime/regenerator') return null
      },
    })

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
    this.bud.apply('dependencyExtraction', function (
      this: Bud,
      settings?: DependencyExtractionOptions,
    ): Bud {
      settings &&
        this.options.set('webpack.plugins.dependencyExtraction', {
          ...this.options.get('webpack.plugins.dependencyExtraction'),
          ...settings,
        })

      return this
    })

    this.bud.plugins.set('dependencyExtraction', (bud: Bud) => ({
      bud,
      make: function () {
        return new DependencyExtractionWebpackPlugin(
          this.bud.options.get(
            'webpack.plugins.dependencyExtraction',
          ),
        )
      },
    }))
  },
})

export {dependencyExtractionPlugin}
