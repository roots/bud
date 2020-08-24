"use strict";
exports.__esModule = true;
exports.devServer = void 0;
var devServer = function (bud) {
    return bud.hooks.filter('webpack.devServer', {
        devServer: bud.options.get('webpack.devServer')
    });
};
exports.devServer = devServer;
//# sourceMappingURL=devServer.js.map