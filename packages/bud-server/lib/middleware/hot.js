"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports["default"] = void 0;
var webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
var hot = function (bud) {
    return webpack_hot_middleware_1["default"](bud.compiler, {
        path: '/__webpack_hmr',
        heartbeat: 2000
    });
};
exports["default"] = hot;
//# sourceMappingURL=hot.js.map