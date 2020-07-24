import DependencyExtractionPlugin from '@wordpress/dependency-extraction-webpack-plugin'
import type {WebpackAdapter} from './types'

const dependencyExtraction: WebpackAdapter = () => ({
  setOptions: function () {
    return this.bud.state.options.dependencyManifest
  },
  make: function () {
    return new DependencyExtractionPlugin(this.options)
  },
  when: function () {
    return this.bud.state.features.dependencyManifest
  },
})

export {dependencyExtraction}
