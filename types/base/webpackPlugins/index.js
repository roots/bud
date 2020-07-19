"use strict";
exports.__esModule = true;
exports.webpackPlugins = void 0;
var browserSync_1 = require("./browserSync");
var cleanWebpack_1 = require("./cleanWebpack");
var copy_1 = require("./copy");
var define_1 = require("./define");
var dependencyExtraction_1 = require("./dependencyExtraction");
var fixStyleOnlyEntries_1 = require("./fixStyleOnlyEntries");
var hotModuleReplacement_1 = require("./hotModuleReplacement");
var limitChunkCount_1 = require("./limitChunkCount");
var miniCssExtract_1 = require("./miniCssExtract");
var manifest_1 = require("./manifest");
var provide_1 = require("./provide");
var writeFile_1 = require("./writeFile");
/**
 * ## bud.webpackPlugins
 * Webpack plugins written for usage with the bud framework.
 */
var webpackPlugins = [
    ['browser_sync_plugin', browserSync_1.browserSync],
    ['clean_webpack_plugin', cleanWebpack_1.cleanWebpack],
    ['copy_plugin', copy_1.copy],
    ['define_plugin', define_1.define],
    ['dependency_extraction_plugin', dependencyExtraction_1.dependencyExtraction],
    ['fix_style_only_entries_plugin', fixStyleOnlyEntries_1.fixStyleOnlyEntries],
    ['hot_module_replacement_plugin', hotModuleReplacement_1.hotModuleReplacement],
    ['manifest_plugin', manifest_1.manifest],
    ['mini_css_extract_plugin', miniCssExtract_1.miniCssExtract],
    ['provide_plugin', provide_1.provide],
    ['write_file_plugin', writeFile_1.writeFile],
    ['limit_chunk_count', limitChunkCount_1.limitChunkCount],
];
exports.webpackPlugins = webpackPlugins;
