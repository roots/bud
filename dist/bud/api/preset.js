"use strict";
exports.__esModule = true;
exports.preset = void 0;
var path_1 = require("path");
/**
 * ## bud.preset
 *
 * Retrieve a Bud framework preset.
 *
 * ### Examples
 *
 * ```js
 * bud.preset('babel/postcss')
 * ```
 *
 * ```js
 * bud.preset('babel/preset-react')
 * ```
 *
 * ```js
 * bud.preset('tsconfig')
 * ```
 */
var preset = function (relativePath) {
    var presetConfig = path_1.join(this.state.paths.framework, 'preset', relativePath);
    return require(presetConfig);
};
exports.preset = preset;
//# sourceMappingURL=preset.js.map