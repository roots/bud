"use strict";
var _a;
exports.__esModule = true;
exports.presets = void 0;
var eslint = require.resolve('./presets/eslint');
var postCss = require.resolve('./presets/postcss');
var stylelint = require.resolve('./presets/stylelint');
var babelWp = require.resolve('./presets/babel/preset-wp');
var babelReact = require.resolve('./presets/babel/preset-react');
/**
 * Preset configurations for common webpack plugins.
 */
var presets = (_a = {
        eslint: eslint,
        postCss: postCss,
        stylelint: stylelint
    },
    _a['babel-wp'] = babelWp,
    _a['babel-react'] = babelReact,
    _a);
exports.presets = presets;
//# sourceMappingURL=presets.js.map