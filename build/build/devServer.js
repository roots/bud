"use strict";
exports.__esModule = true;
exports.devServer = void 0;
/**
 * Dev server
 */
var devServer = function (bud) { return ({
    bud: bud,
    options: {
        devServer: bud.state.options.dev
    },
    make: function () {
        return this.options;
    }
}); };
exports.devServer = devServer;
//# sourceMappingURL=devServer.js.map