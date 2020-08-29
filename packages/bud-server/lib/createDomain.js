"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports["default"] = void 0;
var url_1 = __importDefault(require("url"));
var internal_ip_1 = __importDefault(require("internal-ip"));
var createDomain = function (bud) {
    var options = bud.options.get('webpack.devServer');
    var protocol = bud.options.get('webpack.devServer.secure')
        ? 'https'
        : 'http';
    var port = options.socket ? 0 : options.port ? options.port : 3000;
    var hostname = options.useLocalIp ? internal_ip_1["default"].v4() : options.host;
    if (options.public) {
        return /^[a-zA-Z]+:\/\//.test(options.public)
            ? "" + options.public
            : protocol + "://" + options.public;
    }
    return url_1["default"].format({ protocol: protocol, hostname: hostname, port: port });
};
exports["default"] = createDomain;
//# sourceMappingURL=createDomain.js.map