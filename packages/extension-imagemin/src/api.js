"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageminOption = exports.imageminPlugins = void 0;
/**
 * Configure imagemin plugins.
 */
const imageminPlugins = function (plugins) {
    plugins &&
        this.extensions.set('image-minimizer-webpack-plugin.options.minimizerOptions.plugins', plugins);
    return this;
};
exports.imageminPlugins = imageminPlugins;
/**
 * Configure imagemin options
 */
const imageminOption = function (key, value) {
    this.extensions.set(`image-minimizer-webpack-plugin.options.${key}`, value);
    return this;
};
exports.imageminOption = imageminOption;
//# sourceMappingURL=api.js.map