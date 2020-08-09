"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const api_1 = __importDefault(require("./api"));
const presets_1 = __importDefault(require("./presets"));
/**
 * Bud extension: purgecss
 *
 * Adds purgecss support to the Bud framework.
 *
 * @type {Extension}
 */
const purgecss = () => ({
    make: function () {
        if (this.bud) {
            this.bud.purgecss = api_1.default;
        }
    },
});
module.exports = {
    purgecss,
    presets: presets_1.default,
};
//# sourceMappingURL=index.js.map