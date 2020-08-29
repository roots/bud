"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports["default"] = void 0;
var url_1 = __importDefault(require("url"));
var createDomain = function (bud) {
    var _a = bud.options.get('webpack.devServer'), secure = _a.secure, socket = _a.socket, port = _a.port, host = _a.host;
    return url_1["default"].format({
        protocol: secure ? 'https' : 'http',
        hostname: /^[a-zA-Z]+:\/\//.test(host)
            ? host.replace(/^[a-zA-Z]+:\/\//, '')
            : host,
        port: socket ? 0 : port ? port : 3000
    });
};
exports["default"] = createDomain;
//# sourceMappingURL=createDomain.js.map