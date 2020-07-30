"use strict";
exports.__esModule = true;
exports.adapters = void 0;
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
var stylelint_1 = require("./stylelint");
var terser_1 = require("./terser");
var writeFile_1 = require("./writeFile");
var adapters = [
    ['browser_sync', browserSync_1.browserSync],
    ['clean_webpack_plugin', cleanWebpack_1.cleanWebpack],
    ['copy', copy_1.copy],
    ['define', define_1.define],
    ['dependency_extraction', dependencyExtraction_1.dependencyExtraction],
    ['fix_style_only_entries', fixStyleOnlyEntries_1.fixStyleOnlyEntries],
    ['hot_module_replacement', hotModuleReplacement_1.hotModuleReplacement],
    ['manifest', manifest_1.manifest],
    ['mini_css_extract', miniCssExtract_1.miniCssExtract],
    ['provide', provide_1.provide],
    ['limit_chunks', limitChunkCount_1.limitChunkCount],
    ['stylelint', stylelint_1.stylelint],
    ['terser', terser_1.terser],
    ['write_file', writeFile_1.writeFile],
];
exports.adapters = adapters;
//# sourceMappingURL=index.js.map