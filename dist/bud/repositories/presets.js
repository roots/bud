"use strict";
var _a;
exports.__esModule = true;
exports.presets = void 0;
var eslint = require.resolve('../../../preset/eslint');
var postCss = require.resolve('../../../preset/postcss');
var stylelint = require.resolve('../../../preset/stylelint');
var babelWp = require.resolve('../../../preset/babel/preset-wp');
/**
 * Preset configurations for common webpack plugins.
 */
var presets = (_a = {
        eslint: eslint,
        postCss: postCss,
        stylelint: stylelint
    },
    _a['babel-wp'] = babelWp,
    _a);
exports.presets = presets;
//# sourceMappingURL=presets.js.map