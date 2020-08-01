import DependencyExtractionPlugin from '@wordpress/dependency-extraction-webpack-plugin'
import type {WebpackAdapter} from './types'

const dependencyExtraction = {
  mergeOptions: function () {
    return this.bud.options.get('dependencyManifest')
  },
  make: function () {
    return new DependencyExtractionPlugin(this.options)
  },
  when: function () {
    return this.bud.features.enabled('dependencyManifest')
  },
}

export {dependencyExtraction}
