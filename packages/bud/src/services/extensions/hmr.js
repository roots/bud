"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.when = exports.make = void 0;
const webpack_1 = require("webpack");
const make = () => new webpack_1.HotModuleReplacementPlugin();
exports.make = make;
const when = bud => bud.mode.is('development');
exports.when = when;
//# sourceMappingURL=hmr.js.map