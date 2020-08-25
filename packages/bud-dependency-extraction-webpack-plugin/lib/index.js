"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.extraction = void 0;
var dependency_extraction_webpack_plugin_1 = __importDefault(require("@wordpress/dependency-extraction-webpack-plugin"));
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
var dependencyExtractionConfig = function (settings) {
    settings &&
        this.options.set('webpack.plugins.dependencyExtraction', __assign(__assign({}, this.options.get('webpack.plugins.dependencyExtraction')), settings));
    return this;
};
var plugin = function (bud) { return ({
    bud: bud,
    name: 'wordpress-dependency-extraction-plugin',
    mergeOptions: function () {
        return this.bud.options.get('webpack.plugins.dependencyExtraction');
    },
    make: function () {
        return new dependency_extraction_webpack_plugin_1["default"](this.bud.options.get('webpack.plugins.dependencyExtraction'));
    }
}); };
var extraction = function (bud) { return ({
    bud: bud,
    name: 'bud-dependency-extraction',
    make: function () {
        this.bud.options.set('webpack.plugins.dependencyExtraction', {});
        this.bud.apply('dependencyExtraction', dependencyExtractionConfig);
        this.bud.plugins.push(plugin);
    }
}); };
exports.extraction = extraction;
//# sourceMappingURL=index.js.map