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
var vue_1 = require("./vue");
var writeFile_1 = require("./writeFile");
var adapters = [
    {
        name: 'browser_sync',
        extension: browserSync_1.browserSync
    },
    {
        name: 'clean_webpack_plugin',
        extension: cleanWebpack_1.cleanWebpack
    },
    {
        name: 'copy',
        extension: copy_1.copy
    },
    {
        name: 'define',
        extension: define_1.define
    },
    {
        name: 'dependency_extraction',
        extension: dependencyExtraction_1.dependencyExtraction
    },
    {
        name: 'fix_style_only_entries',
        extension: fixStyleOnlyEntries_1.fixStyleOnlyEntries
    },
    {
        name: 'hot_module_replacement',
        extension: hotModuleReplacement_1.hotModuleReplacement
    },
    {
        name: 'manifest',
        extension: manifest_1.manifest
    },
    {
        name: 'mini_css_extract',
        extension: miniCssExtract_1.miniCssExtract
    },
    {
        name: 'provide',
        extension: provide_1.provide
    },
    {
        name: 'limit_chunks',
        extension: limitChunkCount_1.limitChunkCount
    },
    {
        name: 'stylelint',
        extension: stylelint_1.stylelint
    },
    {
        name: 'terser',
        extension: terser_1.terser
    },
    {
        name: 'vue',
        extension: vue_1.vue
    },
    {
        name: 'write_file',
        extension: writeFile_1.writeFile
    },
];
exports.adapters = adapters;
//# sourceMappingURL=index.js.map