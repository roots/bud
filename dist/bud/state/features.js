"use strict";
exports.__esModule = true;
exports.features = void 0;
var container_1 = require("../container");
var features = function (state) {
    var featuresContainer = new container_1.container({
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
        babel: state.configs.has('babel') ? true : false,
        eslint: state.configs.has('eslint') ? true : false,
        postCss: state.configs.has('postCss') ? true : false,
        stylelint: state.configs.has('stylelint') ? true : false,
        typescript: state.configs.has('typescript') ? true : false,
        vue: state.configs.has('vue') ? true : false,
        /**
         * Opt-in
         */
        react: false,
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
        debug: false
    });
    return featuresContainer;
};
exports.features = features;
//# sourceMappingURL=features.js.map