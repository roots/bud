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
            extensions: [
                '.js',
                '.json',
            ],
            modules: [
                bud.src(''),
                bud.project('node_modules'),
                path_1.join(bud.state.paths.framework, '/node_modules'),
            ],
            alias: bud.state.options.alias || {}
        }
    },
    make: function () {
        this.bud.state.features.jsx && this.options.resolve.extensions.push('jsx');
        this.bud.state.features.ts && this.options.resolve.extensions.push('ts');
        this.bud.state.features.tsx && this.options.resolve.extensions.push('tsx');
        return this.options;
    }
}); };
exports.webpackResolve = webpackResolve;
//# sourceMappingURL=webpackResolve.js.map