"use strict";
exports.__esModule = true;
exports.webpackResolve = void 0;
var path_1 = require("path");
/**
 * Webpack resolvers.
 *
 * @param {Bud} bud
 * @return {object}
 */
var webpackResolve = function (bud) { return ({
    bud: bud,
    options: {
        resolve: {
            extensions: ['.js', '.json'],
            modules: [bud.project('node_modules'), bud.state.paths.src]
        }
    },
    make: function () {
        /**
         * Resolve modules from framework
         */
        if (this.bud.state.paths.project !== this.bud.state.paths.framework) {
            this.options.resolve.modules.push(path_1.join(this.bud.state.paths.framework, 'node_modules'));
        }
        /**
         * JSX support
         */
        if (this.bud.state.features.jsx) {
            this.options.resolve.extensions.push('.jsx');
        }
        /**
         * TS support
         */
        if (this.bud.state.features.typescript) {
            this.options.resolve.extensions.push('.ts');
            this.options.resolve.extensions.push('.tsx');
        }
        /**
         * Alias resolution
         */
        if (this.bud.state.options.alias) {
            this.options.resolve.alias = this.bud.state.options.alias;
        }
        return this.options;
    }
}); };
exports.webpackResolve = webpackResolve;
//# sourceMappingURL=webpackResolve.js.map