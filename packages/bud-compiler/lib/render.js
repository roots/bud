"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.render = void 0;
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var dashboard_1 = require("./dashboard");
var render = function (bud) {
    var application = react_1["default"].createElement(dashboard_1.Dashboard, { bud: bud });
    ink_1.render(application);
};
exports.render = render;
//# sourceMappingURL=render.js.map