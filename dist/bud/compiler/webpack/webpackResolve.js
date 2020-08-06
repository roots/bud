"use strict";
exports.__esModule = true;
exports.webpackResolve = void 0;
var path_1 = require("path");
var webpackResolve = function (bud) { return ({
    bud: bud,
    target: {
        resolve: {
            extensions: bud.options.get('extensions'),
            modules: [bud.project('node_modules'), bud.src()]
        }
    },
    make: function () {
        /**
         * Alias resolution
         */
        if (this.bud.options.has('alias')) {
            this.target.resolve.alias = this.bud.options.get('alias');
        }
        /**
         * Resolve framework node_modules
         */
        this.target.resolve.modules.push(path_1.join(this.bud.paths.get('framework'), 'node_modules'));
        /**
         * Ensure bundle support
         */
        var binding = this;
        new Array('ts', 'tsx', 'jsx', 'vue', 'scss').forEach(function (ext) {
            return binding.ensureSupport(ext);
        });
        /**
         * Filter, log & return
         */
        this.target = this.bud.hooks.filter('webpack.resolve', this.target);
        this.bud.logger.info({ name: 'webpack.resolve', value: this.target }, "webpack.resolve has been generated");
        return this.target;
    },
    /**
     * Ensure extensions supported
     */
    ensureSupport: function (ext) {
        if (!this.bud.features.enabled(ext)) {
            return;
        }
        var missedExt = this.target.resolve.extensions.filter(function (supported) { return supported !== ext; }).length <
            1;
        if (missedExt) {
            this.target.resolve.extensions.push("." + ext);
            this.bud.logger.warn({ name: 'webpack.resolve' }, "." + ext + " support added by support check.");
        }
    }
}); };
exports.webpackResolve = webpackResolve;
//# sourceMappingURL=webpackResolve.js.map