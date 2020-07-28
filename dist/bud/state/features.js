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
    dashboard: true,
    clean: true,
    css: true,
    svg: true,
    image: true,
    font: true,
    js: true,
    manifest: true,
    optimize: true,
    terser: true,
    vendor: true,
    splitting: true,
    /**
     * Enabled by config presence
     */
    babel: configs_1.configs.babel ? true : false,
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
    translate: false,
    uglify: false,
    watch: false
};
exports.features = features;
//# sourceMappingURL=features.js.map