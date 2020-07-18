import DependencyExtractionPlugin from '@wordpress/dependency-extraction-webpack-plugin'

const dependencyExtraction = bud => ({
  options: bud.options.dependencyManifest,
  make: function () {
    return new DependencyExtractionPlugin(this.options)
  },
  when: function () {
    return this.bud.features.dependencyManifest
  },
})

export {dependencyExtraction}
