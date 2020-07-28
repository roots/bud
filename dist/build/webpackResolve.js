"use strict";
exports.__esModule = true;
exports.webpackResolve = void 0;
var path_1 = require("path");
/**
 * Webpack resolvers.
 *
 * @param {object}
 */
var webpackResolve = function (bud) { return ({
    bud: bud,
    options: {
        resolve: {
            extensions: ['.js', '.json'],
            modules: [
                bud.project('node_modules'),
                bud.state.paths.src,
                path_1.join(bud.state.paths.framework, '/node_modules'),
            ]
        }
    },
    make: function () {
        if (this.bud.state.features.jsx) {
            this.options.resolve.extensions.push('.jsx');
        }
        if (this.bud.state.features.typescript) {
            this.options.resolve.extensions.push('.ts');
            this.options.resolve.extensions.push('.tsx');
        }
        if (this.bud.state.options.alias) {
            this.options.resolve.alias = this.bud.state.options.alias;
        }
        return this.options;
    }
}); };
exports.webpackResolve = webpackResolve;
//# sourceMappingURL=webpackResolve.js.map