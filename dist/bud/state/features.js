"use strict";
exports.__esModule = true;
exports.features = void 0;
var configs_1 = require("./configs");
/**
 * Features
 */
var features = {
    /**
     * Enabled by default
     */
    babel: true,
    css: true,
    dashboard: true,
    font: true,
    image: true,
    js: true,
    manifest: true,
    svg: true,
    /**
     * Enabled by config presence
     */
    eslint: configs_1.configs.eslint ? true : false,
    postCss: configs_1.configs.postCss ? true : false,
    typescript: configs_1.configs.typescript ? true : false,
    /**
     * Opt-in
     */
    browserSync: false,
    debug: false,
    dependencyManifest: false,
    dump: false,
    hash: false,
    hot: false,
    inlineManifest: false,
    minify: false,
    overlay: false,
    scss: false,
    cssModules: false,
    scssModules: false,
    purge: false,
    sourceMap: false,
    splitting: false,
    terser: false,
    translate: false,
    uglify: false,
    vendor: false,
    watch: false
};
exports.features = features;
//# sourceMappingURL=features.js.map