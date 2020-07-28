"use strict";
exports.__esModule = true;
exports.features = void 0;
var configs_1 = require("./configs");
/**
 * Features
 *
 * Many API methods will opt-in a project
 * based on usage. This is a nicer DX and is preferred.
 *
 * @see {Bud.Api.Features}
 *
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
    minify: true,
    /**
     * Enabled by config presence
     */
    babel: configs_1.configs.babel ? true : false,
    eslint: configs_1.configs.eslint ? true : false,
    postCss: configs_1.configs.postCss ? true : false,
    typescript: configs_1.configs.typescript ? true : false,
    /**
     * Opt-in.
     */
    browserSync: false,
    dependencyManifest: false,
    dump: false,
    hash: false,
    hot: false,
    inlineManifest: false,
    overlay: false,
    scss: false,
    cssModules: false,
    scssModules: false,
    purge: false,
    sourceMap: false,
    translate: false,
    uglify: false,
    watch: false,
    /**
     * Deprecated
     */
    debug: false
};
exports.features = features;
//# sourceMappingURL=features.js.map