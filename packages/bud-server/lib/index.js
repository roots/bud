"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports["default"] = void 0;
var webpack_1 = __importDefault(require("webpack"));
var middleware_1 = __importDefault(require("./middleware"));
var injectEntrypoints_1 = __importDefault(require("./injectEntrypoints"));
var tapCompiler_1 = __importDefault(require("./tapCompiler"));
var server = function (bud) {
    bud.options.set('webpack.entry', injectEntrypoints_1["default"](bud));
    bud.apply('compiler', webpack_1["default"](bud.config(bud)));
    middleware_1["default"].map(function (ware) { return bud.server.use(ware(bud)); });
    bud.server.listen(bud.options.get('webpack.devServer').port, bud.options.get('webpack.devServer').host);
    tapCompiler_1["default"](bud);
};
exports["default"] = server;
//# sourceMappingURL=index.js.map