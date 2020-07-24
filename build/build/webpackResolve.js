"use strict";
exports.__esModule = true;
exports.webpackResolve = void 0;
/**
 * Webpack resolvers.
 *
 * @param {object}
 */
var webpackResolve = function (bud) { return ({
    bud: bud,
    options: {
        resolve: {
            extensions: [
                '.js',
                '.json',
                '.vue',
                '.jsx',
                '.ts',
                '.tsx',
            ],
            modules: [bud.project('node_modules')],
            alias: bud.state.options.alias || {}
        }
    },
    make: function () {
        return this.options;
    }
}); };
exports.webpackResolve = webpackResolve;
//# sourceMappingURL=webpackResolve.js.map