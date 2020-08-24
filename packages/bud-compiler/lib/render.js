"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.render = void 0;
var webpack_1 = __importDefault(require("webpack"));
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var dashboard_1 = require("./dashboard");
var injectHot_1 = require("./injectHot");
var render = function (bud, config) {
    bud.compiler = bud.features.enabled('hot')
        ? webpack_1["default"](injectHot_1.injectHot({
            config: config,
            overlay: bud.options.has('devServer.overlay') &&
                bud.options.get('devServer.overlay')
                ? true
                : true,
            reload: bud.options.has('devServer.reload') &&
                bud.options.get('devServer.reload')
                ? true
                : true
        }))
        : webpack_1["default"](config);
    var props = { bud: bud };
    var application = react_1["default"].createElement(dashboard_1.Dashboard, props);
    /** 🚀 */
    ink_1.render(application);
};
exports.render = render;
//# sourceMappingURL=render.js.map