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
exports.__esModule = true;
exports.sage = void 0;
var bud_1 = require("@roots/bud");
var bud_dependency_extraction_webpack_plugin_1 = require("@roots/bud-dependency-extraction-webpack-plugin");
var bud_sass_1 = require("@roots/bud-sass");
var bud_eslint_1 = require("@roots/bud-eslint");
var bud_stylelint_1 = require("@roots/bud-stylelint");
var bud_purgecss_1 = require("@roots/bud-purgecss");
var features = {
    purgecss: bud_purgecss_1.purgecss,
    eslint: bud_eslint_1.eslint,
    stylelint: bud_stylelint_1.stylelint,
    extraction: bud_dependency_extraction_webpack_plugin_1.extraction,
    sass: bud_sass_1.sass
};
var withFeatures = function (options) {
    var enabled = [];
    options
        ? Object.entries(features).forEach(function (_a) {
            var feature = _a[0], extension = _a[1];
            var isEnabled = !options ||
                !options.hasOwnProperty(feature) ||
                options[feature] !== false;
            isEnabled && enabled.push(extension);
        })
        : Object.values(features).forEach(function (feature) {
            enabled.push(feature);
        });
    this.use(enabled);
    enabled.includes(bud_purgecss_1.purgecss) &&
        this.purgecss({
            enabled: this.inProduction,
            options: __assign({}, bud_purgecss_1.presets.wordpress)
        });
    return this;
};
/**
 * @roots/bud-sage
 *
 * Preset configuration for Sage projects
 */
var sage = (function () {
    bud_1.bud.apply('withFeatures', withFeatures);
    bud_1.bud
        .srcPath('resources/assets')
        .distPath('dist')
        .alias({
        '@fonts': bud_1.bud.src('fonts'),
        '@images': bud_1.bud.src('images'),
        '@scripts': bud_1.bud.src('scripts'),
        '@styles': bud_1.bud.src('styles')
    })
        .auto({
        jquery: ['$', 'window.jQuery']
    })
        .runtimeManifest()
        .mini(bud_1.bud.inProduction)
        .map(bud_1.bud.inDevelopment)
        .hash(bud_1.bud.inProduction)
        .vendor();
    return bud_1.bud;
})();
exports.sage = sage;
//# sourceMappingURL=index.js.map