"use strict";
exports.__esModule = true;
exports.features = void 0;
var mode_1 = require("./../mode");
/**
 * Features
 */
var features = {
    babel: true,
    browserSync: !mode_1.inProduction,
    debug: false,
    dashboard: true,
    dependencyManifest: false,
    dump: false,
    eslint: true,
    hash: mode_1.inProduction,
    hot: !mode_1.inProduction,
    inlineManifest: false,
    minified: mode_1.inProduction,
    overlay: true,
    postCss: true,
    purge: false,
    sourceMap: !mode_1.inProduction,
    splitting: true,
    translate: false,
    typescript: true,
    vendor: false,
    watch: !mode_1.inProduction
};
exports.features = features;
//# sourceMappingURL=features.js.map