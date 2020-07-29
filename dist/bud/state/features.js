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
exports.features = void 0;
var configs_1 = require("./configs");
/**
 * Features
 *
 * Many API methods will opt-in a project based on usage.
 * This is a nicer DX and is preferred.
 *
 * @see {Bud.Api.Features}
 */
var features = {
    repository: {
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
        babel: configs_1.configs.get('babel') ? true : false,
        eslint: configs_1.configs.get('eslint') ? true : false,
        postCss: configs_1.configs.get('postCss') ? true : false,
        typescript: configs_1.configs.get('typescript') ? true : false,
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
    },
    enable: function (feature) {
        this.repository[feature] = true;
    },
    enabled: function (feature) {
        return this.repository[feature] == true;
    },
    disable: function (feature) {
        this.repository[feature] = false;
    },
    disabled: function (feature) {
        return this.repository[feature] === false;
    },
    get: function (feature) {
        return this.repository[feature];
    },
    set: function (features) {
        this.repository = __assign(__assign({}, this.repository), features);
    },
    has: function (feature) {
        return this.repository.hasOwnProperty(feature);
    }
};
exports.features = features;
//# sourceMappingURL=features.js.map