import DependencyExtractionPlugin from '@wordpress/dependency-extraction-webpack-plugin';
var dependencyExtraction = function () { return ({
    mergeOptions: function () {
        return this.bud.options.get('dependencyManifest');
    },
    make: function () {
        return new DependencyExtractionPlugin(this.options);
    },
    when: function () {
        return this.bud.features.enabled('dependencyManifest');
    }
}); };
export { dependencyExtraction };
//# sourceMappingURL=dependencyExtraction.js.map