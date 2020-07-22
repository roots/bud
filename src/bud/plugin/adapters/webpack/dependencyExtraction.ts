import DependencyExtractionPlugin from '@wordpress/dependency-extraction-webpack-plugin'

const dependencyExtraction: WebpackAdapter = () => ({
  setOptions: function () {
    return this.bud.options.dependencyManifest
  },
  make: function () {
    return new DependencyExtractionPlugin(this.options)
  },
  when: function () {
    return this.bud.features.dependencyManifest
  },
})

export {dependencyExtraction}
import type {WebpackAdapter} from '../..'
