"use strict";
exports.__esModule = true;
exports.general = void 0;
/**
 * General webpack options
 *
 * @this {bud}
 */
var general = function (bud) { return ({
    bud: bud,
    options: {
        context: bud.state.paths.src,
        devtool: bud.state.features.sourceMap
            ? bud.state.options.devtool
            : false,
        mode: bud.mode,
        node: bud.state.options.node,
        target: bud.state.options.target,
        watch: bud.state.features.watch
    },
    make: function () {
        return this.options;
    }
}); };
exports.general = general;
//# sourceMappingURL=general.js.map