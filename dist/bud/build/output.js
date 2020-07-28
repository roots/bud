"use strict";
exports.__esModule = true;
exports.output = void 0;
/**
 * Webpack output
 *
 * @param {Bud} bud
 * @return {OutputBuilder}
 */
var output = function (bud) { return ({
    bud: bud,
    options: {
        output: {
            path: bud.state.paths.dist,
            publicPath: bud.state.paths.public,
            filename: bud.state.features.hash
                ? '[name].[hash:8].js'
                : '[name].js'
        }
    },
    make: function () {
        return this.options;
    }
}); };
exports.output = output;
//# sourceMappingURL=output.js.map