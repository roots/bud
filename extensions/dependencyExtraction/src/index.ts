import type DependencyExtractionOptions from '@wordpress/dependency-extraction-webpack-plugin'
import DependencyExtractionWebpackPlugin from '@wordpress/dependency-extraction-webpack-plugin'

/**
 * ## bud.dependencyManifest
 *
 * Configure @wordpress/dependency-extraction-webpack-plugin
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
  this: any,
  settings?: DependencyExtractionOptions,
): any {
  settings &&
    this.options.set('dependencyManifest', {
      ...this.options.get('dependencyManifest'),
      ...settings,
    })

  return this
}

const adapter = () => ({
  mergeOptions: function (this: any): any {
    return this.bud.options.get('dependencyManifest')
  },
  make: function (this: any): any {
    return new DependencyExtractionWebpackPlugin(
      this.bud.options.get('dependencyExtraction')
    )
  },
})

const wpExtraction = () => ({
  make: function (this: any) {
    this.bud.options.set('dependencyExtraction', {})
    this.bud.dependencyExtraction = dependencyExtraction
    this.bud.adapters.add(adapter)
  },
})

module.exports = wpExtraction
