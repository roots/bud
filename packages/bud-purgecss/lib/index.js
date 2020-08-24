"use strict";
exports.__esModule = true;
exports.presets = exports.purgecss = void 0;
var api_1 = require("./api");
var presets_1 = require("./presets");
/**
 * Bud extension: purgecss
 *
 * Adds purgecss support to the Bud framework.
 *
 * @type {Extension}
 */
var purgecss = function (bud) { return ({
    bud: bud,
    name: 'purgecss',
    make: function () {
        this.bud.apply('purgecss', api_1.config);
    }
}); };
exports.purgecss = purgecss;
var presets = { wordpress: presets_1.wordpress };
exports.presets = presets;
//# sourceMappingURL=index.js.map