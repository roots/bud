"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.makeDevServer = void 0;
var webpack_1 = __importDefault(require("webpack"));
var chokidar_1 = __importDefault(require("chokidar"));
var webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
var makeDevServer = function (bud, webpackConfig) {
    var wdsOptions = {
        before: function (app, server) {
            chokidar_1["default"].watch(bud.state.options.watch).on('all', function () {
                server.sockWrite(server.sockets, 'content-changed');
            });
        },
        disableHostCheck: true,
        host: 'localhost',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        },
        proxy: {
            '**': {
                target: 'http://bud-sandbox.valet',
                secure: false,
                changeOrigin: true,
                port: 3000
            }
        },
        hot: true,
        overlay: true,
        historyApiFallback: true,
        open: true,
        stats: {
            colors: true
        }
    };
    webpack_dev_server_1["default"].addDevServerEntrypoints(webpackConfig, wdsOptions);
    return new webpack_dev_server_1["default"](webpack_1["default"](webpackConfig), wdsOptions);
};
exports.makeDevServer = makeDevServer;
//# sourceMappingURL=devServer.js.map