"use strict";
exports.__esModule = true;
exports.features = void 0;
var mode_1 = require("./mode");
/**
 * Features
 *
 * @property {boolean} features.babel - babel enabled
 * @property {boolean} features.browserSync    - browserSync enabled
 * @property {boolean} features.dashboard      - dashboard enabled
 * @property {boolean} features.debug          - debug enabled
 * @property {boolean} features.eslint         - eslint enabled
 * @property {boolean} features.hot            - HMR enabled
 * @property {boolean} features.hash           - file hashing enabled
 * @property {boolean} features.inlineManifest - inline manifest enabled
 * @property {boolean} features.minified       - minification enabled
 * @property {boolean} features.potCss         - postCss enabled
 * @property {boolean} features.purge          - purgeCss enabled
 * @property {boolean} features.sourceMap      - source-maps enabled
 * @property {boolean} features.translate      - translate enabled
 * @property {boolean} features.vendor         - vendor splitting enabled
 * @property {boolean} features.watch          - watch mode enabled
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
