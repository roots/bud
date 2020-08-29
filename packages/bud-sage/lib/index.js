"use strict";
exports.__esModule = true;
exports.sage = void 0;
var bud_1 = require("@roots/bud");
var bud_dependency_extraction_webpack_plugin_1 = require("@roots/bud-dependency-extraction-webpack-plugin");
var bud_sass_1 = require("@roots/bud-sass");
var bud_eslint_1 = require("@roots/bud-eslint");
var bud_stylelint_1 = require("@roots/bud-stylelint");
var bud_purgecss_1 = require("@roots/bud-purgecss");
var featureSet = [
    bud_purgecss_1.purgecss,
    bud_eslint_1.eslint,
    bud_stylelint_1.stylelint,
    bud_dependency_extraction_webpack_plugin_1.dependencyExtractionPlugin,
    bud_sass_1.sass,
];
/**
 * ## sage.enableThemeFeatures
 *
 * Customize the features used in your theme.
 */
var enableThemeFeatures = function (features) {
    var enabledFeatures = [];
    if (!features) {
        featureSet.forEach(function (feature) {
            enabledFeatures.push(feature);
        });
    }
    else {
        Object.entries(featureSet).forEach(function (_a) {
            var feature = _a[0], plugin = _a[1];
            var isEnabled = !features ||
                !features.hasOwnProperty(feature) ||
                features[feature] !== false;
            isEnabled && enabledFeatures.push(plugin);
        });
    }
    this.use(enabledFeatures);
    enabledFeatures.includes(bud_purgecss_1.purgecss) &&
        this.purgecss({
            enabled: this.inProduction,
            options: bud_purgecss_1.purgeWordPress
        });
    return this;
};
var sage = (function () {
    bud_1.bud.apply('enableThemeFeatures', enableThemeFeatures);
    return bud_1.bud
        .srcPath('resources/assets')
        .distPath('dist')
        .alias({
        '@fonts': bud_1.bud.src('fonts'),
        '@images': bud_1.bud.src('images'),
        '@scripts': bud_1.bud.src('scripts'),
        '@styles': bud_1.bud.src('styles')
    })
        .provide({
        jquery: ['$', 'window.jQuery']
    })
        .runtimeManifest()
        .mini(bud_1.bud.inProduction)
        .map(bud_1.bud.inDevelopment)
        .hash(bud_1.bud.inProduction)
        .vendor();
})();
exports.sage = sage;
//# sourceMappingURL=index.js.map