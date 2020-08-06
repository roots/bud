"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.palettePlugin = void 0;
var palette_webpack_plugin_1 = __importDefault(require("palette-webpack-plugin"));
/**
 * ## bud.setPaletteBlacklist
 *
 * @typedef {function ({blacklist: string}) => Bud}
 */
var setPaletteBlacklist = function (blacklist) {
    this.options.set('palette-blacklist', blacklist);
    return this;
};
/**
 * Adapts Webpack plugin to Bud.
 */
var adapter = {
    name: 'palette-plugin',
    extension: {
        make: function () {
            return new palette_webpack_plugin_1["default"]({
                blacklist: this.bud.options.get('palette-blacklist')
            });
        }
    }
};
/**
 * Palette plugin
 *
 * @property {string} name - extension name
 * @property {Bud} bud - bud instance
 * @property {function () => void}    make - primary action of plugin
 * @property {function () => boolean} when - when false, plugin is skipped
 */
var palettePlugin = {
    name: 'palette-plugin',
    make: function () {
        this.bud.setPaletteBlacklist = setPaletteBlacklist;
        this.bud.adapters.add(adapter);
    }
};
exports.palettePlugin = palettePlugin;
//# sourceMappingURL=roots-palette-plugin.js.map