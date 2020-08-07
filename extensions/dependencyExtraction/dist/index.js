"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_extraction_webpack_plugin_1 = __importDefault(require("@wordpress/dependency-extraction-webpack-plugin"));
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
const dependencyExtraction = function (settings) {
    settings &&
        this.options.set('dependencyManifest', {
            ...this.options.get('dependencyManifest'),
            ...settings,
        });
    return this;
};
const adapter = () => ({
    mergeOptions: function () {
        return this.bud.options.get('dependencyManifest');
    },
    make: function () {
        return new dependency_extraction_webpack_plugin_1.default(this.bud.options.get('dependencyExtraction'));
    },
});
const wpExtraction = () => ({
    make: function () {
        this.bud.options.set('dependencyExtraction', {});
        this.bud.dependencyExtraction = dependencyExtraction;
        this.bud.adapters.add(adapter);
    },
});
module.exports = wpExtraction;
//# sourceMappingURL=index.js.map