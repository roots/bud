"use strict";
exports.__esModule = true;
exports.devServer = void 0;
var devServer = function (bud) {
    return bud.hooks.filter('webpack.devServer', {
        devServer: {
            host: 'localhost',
            port: 3000,
            hot: bud.options.get('webpack.devServer.hot')
        }
    });
};
exports.devServer = devServer;
//# sourceMappingURL=devServer.js.map