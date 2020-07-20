"use strict";
exports.__esModule = true;
exports.configs = exports.maybeConfig = exports.hasConfig = exports.config = void 0;
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var paths_1 = require("./paths");
/**
 * Config
 * @param   {string} relativePath - relative path (from project root)
 * @return  {string} filePath
 */
var config = function (file) { return path_1.join(paths_1.paths.project, file); };
exports.config = config;
/**
 * Has config
 *
 * @param   {string} file - file path (relative to project root)
 * @return  {boolean} true if file exists
 */
var hasConfig = function (file) { return fs_extra_1.existsSync(config(file)); };
exports.hasConfig = hasConfig;
/**
 * Maybe config
 *
 * @param {string} file - file path (relative to project root)
 * @param {string} file - fallback config file path
 */
var maybeConfig = function (file, fallback) {
    if (fallback === void 0) { fallback = null; }
    return hasConfig(file) ? config(file) : fallback;
};
exports.maybeConfig = maybeConfig;
/**
 * Project configuration files.
 *
 * @property {(string|boolean)} babel   - project babel.config.js
 * @property {(string|boolean)} eslint  - project .eslintrc.js
 * @property {(string|boolean)} postcss - project postcss.config.js
 */
var configs = {
    babel: maybeConfig('babel.config.js'),
    eslint: maybeConfig('.eslintrc.js'),
    postCss: maybeConfig('postcss.config.js'),
    typescript: maybeConfig('tsconfig.json')
};
exports.configs = configs;
