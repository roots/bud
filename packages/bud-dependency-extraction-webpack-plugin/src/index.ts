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
const dependencyExtractionConfig = function (
  this: Bud,
  settings?: DependencyExtractionOptions,
): Bud {
  settings &&
    this.options.set('adapters.dependencyExtraction', {
      ...this.options.get('adapters.dependencyExtraction'),
      ...settings,
    })

  return this
}

const adapter: Extension = (bud: Bud): ExtensionInterface => ({
  bud,

  name: 'wordpress-dependency-extraction-plugin',

  mergeOptions: function (
    this: ExtensionInterface,
  ): DependencyExtractionOptions {
    return this.bud.options.get('adapters.dependencyExtraction')
  },

  make: function (
    this: ExtensionInterface,
  ): DependencyExtractionWebpackPlugin {
    return new DependencyExtractionWebpackPlugin(
      this.bud.options.get('adapters.dependencyExtraction'),
    )
  },
})

const extraction: Extension = (bud: Bud): ExtensionInterface => ({
  bud,

  name: 'bud-dependency-extraction',

  make: function (this: ExtensionInterface) {
    this.bud.options.set('adapters.dependencyExtraction', {})

    this.bud.apply('dependencyExtraction', dependencyExtractionConfig)

    this.bud.adapters.add(adapter)
  },
})

export {extraction}
