"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.tailwind = exports.palettePlugin = exports.bud = void 0;
__exportStar(require("./bud/api/types"), exports);
var bud_1 = require("./bud");
var bud = new bud_1.bootstrap().framework;
exports.bud = bud;
var roots_palette_plugin_1 = require("./extensions/roots-palette-plugin");
exports.palettePlugin = roots_palette_plugin_1.palettePlugin;
var tailwind_1 = require("./extensions/tailwind");
exports.tailwind = tailwind_1.tailwind;
//# sourceMappingURL=index.js.map