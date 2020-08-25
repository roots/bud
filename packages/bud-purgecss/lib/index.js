"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.presets = exports.purgecss = void 0;
var api_1 = require("./api");
var purgecss_with_wordpress_1 = __importDefault(require("purgecss-with-wordpress"));
/**
 * Bud extension: purgecss
 *
 * Adds purgecss support to the Bud framework.
 */
var purgecss = function (bud) { return ({
    bud: bud,
    name: 'purgecss',
    make: function () {
        this.bud.apply('purgecss', api_1.config);
    }
}); };
exports.purgecss = purgecss;
var presets = { wordpress: purgecss_with_wordpress_1["default"] };
exports.presets = presets;
//# sourceMappingURL=index.js.map