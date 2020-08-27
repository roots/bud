import DependencyExtractionWebpackPlugin from '@wordpress/dependency-extraction-webpack-plugin'
import type DependencyExtractionOptions from '@wordpress/dependency-extraction-webpack-plugin'

import {Bud, ExtensionInterface, Extension} from '@roots/bud'

/**
 * ## bud.dependencyExtraction
 *
 * Configures @wordpress/dependency-extraction-webpack-plugin
 *
 * @see https://git.io/JJLxM
 *
 * ```js
 * bud.dependencyManifest({
 *   outputFormat: 'js',
 *   injectPolyfill: false,
 * })
 * ```
 */
const dependencyExtraction = function (
  this: Bud,
  settings?: DependencyExtractionOptions,
): Bud {
  settings &&
    this.options.set('webpack.plugins.dependencyExtraction', {
      ...this.options.get('webpack.plugins.dependencyExtraction'),
      ...settings,
    })

  return this
}

const plugin: Extension = bud => ({
  bud,
  name: 'wordpress-dependency-extraction-plugin',
  make: function (): DependencyExtractionWebpackPlugin {
    return new DependencyExtractionWebpackPlugin(
      this.bud.options.get('webpack.plugins.dependencyExtraction'),
    )
  },
})

const extraction: Extension = (bud: Bud): ExtensionInterface => ({
  bud,
  name: 'bud-dependency-extraction',
  make: function (this: ExtensionInterface) {
    this.bud.options.set('webpack.plugins.dependencyExtraction', {
      injectPolyfill: false,
      outputFormat: 'json',
      requestToExternal: request => {
        if (request === '@babel/runtime/regenerator') return null
      },
    })

    this.bud.apply('dependencyExtraction', dependencyExtraction)

    this.bud.plugins.push(plugin)
  },
})

export {extraction}
