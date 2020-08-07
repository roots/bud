var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import DependencyExtractionWebpackPlugin from '@wordpress/dependency-extraction-webpack-plugin';
var dependencyExtraction = function (settings) {
    settings &&
        this.options.set('dependencyManifest', __assign(__assign({}, this.options.get('dependencyManifest')), settings));
    return this;
};
var adapter = function () { return ({
    mergeOptions: function () {
        return this.bud.options.get('dependencyManifest');
    },
    make: function () {
        return new DependencyExtractionWebpackPlugin(this.bud.options.get('dependencyExtraction'));
    }
}); };
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
var wpExtraction = function () { return ({
    make: function () {
        this.bud.options.set('dependencyExtraction', {});
        this.bud.dependencyExtraction = dependencyExtraction;
        this.bud.adapters.add(adapter);
    }
}); };
module.exports = wpExtraction;
//# sourceMappingURL=index.js.map