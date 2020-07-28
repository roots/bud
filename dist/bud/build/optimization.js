"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.optimization = void 0;
var uglifyjs_webpack_plugin_1 = __importDefault(require("uglifyjs-webpack-plugin"));
/**
 * Webpack optimization
 * @type {function} optimization
 */
var optimization = function (bud) { return ({
    bud: bud,
    supports: {
        minify: bud.state.features.minify,
        runtimeChunk: bud.state.features.inlineManifest,
        vendor: bud.state.features.vendor
    },
    options: {
        optimization: {
            minimize: bud.state.features.minify,
            removeAvailableModules: false,
            removeEmptyChunks: false,
            moduleIds: 'hashed'
        }
    },
    splitChunksOptions: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: bud.state.options.vendor.name,
                chunks: 'all',
                priority: -20
            }
        }
    },
    runtimeChunkOptions: {
        name: function (entrypoint) { return "runtime/" + entrypoint.name; }
    },
    uglifyOptions: bud.state.options.uglify,
    make: function () {
        this.whenSupported('runtimeChunk', this.setRuntimeChunk);
        this.whenSupported('vendor', this.setSplitChunks);
        this.whenSupported('minify', this.setMinimizer);
        return this.options;
    },
    /**
     * Executes a callback if a given feature is enabled.
     *
     * @property {Function} whenSupported
     * @parameter {string} bud.state.feature key
     * @parameter {Function} callback
     * @return {void}
     */
    whenSupported: function (feature, callback) {
        this.currentCallback = callback;
        this.supports[feature] && this.currentCallback();
    },
    /**
     * RuntimeChunk (inline manifest) support
     */
    setRuntimeChunk: function () {
        this.doHook('pre_runtimechunk');
        this.options.optimization.runtimeChunk = this.runtimeChunkOptions;
        this.doHook('post_runtimechunk');
    },
    /**
     * Code splitting.
     */
    setSplitChunks: function () {
        this.doHook('pre_splitchunks');
        this.options.optimization.splitChunks = this.splitChunksOptions;
        this.doHook('post_splitchunks');
    },
    /**
     * Minimization.
     */
    setMinimizer: function () {
        this.doHook('pre_minimizer', this);
        if (!this.bud.featureEnabled('terser')) {
            this.options.optimization.minimizer = [this.uglify()];
        }
        this.doHook('post_minimizer', this);
    },
    /**
     * Uglify (terser is implemented as a webpack plugin)
     */
    uglify: function () {
        this.doHook('pre_uglify', this);
        var uglify = new uglifyjs_webpack_plugin_1["default"](this.uglifyOptions);
        this.doHook('post_uglify', this);
        return uglify;
    },
    doHook: function (name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.bud.hooks.call("webpack_optimization_" + name, this, params);
    }
}); };
exports.optimization = optimization;
//# sourceMappingURL=optimization.js.map