"use strict";
exports.__esModule = true;
exports.adapters = exports.plugins = void 0;
var browserSync_1 = require("./adapters/browserSync");
var cleanWebpack_1 = require("./adapters/cleanWebpack");
var copy_1 = require("./adapters/copy");
var define_1 = require("./adapters/define");
var dependencyExtraction_1 = require("./adapters/dependencyExtraction");
var fixStyleOnlyEntries_1 = require("./adapters/fixStyleOnlyEntries");
var hotModuleReplacement_1 = require("./adapters/hotModuleReplacement");
var limitChunkCount_1 = require("./adapters/limitChunkCount");
var miniCssExtract_1 = require("./adapters/miniCssExtract");
var manifest_1 = require("./adapters/manifest");
var provide_1 = require("./adapters/provide");
var stylelint_1 = require("./adapters/stylelint");
var terser_1 = require("./adapters/terser");
var vue_1 = require("./adapters/vue");
var writeFile_1 = require("./adapters/writeFile");
var plugins = [];
exports.plugins = plugins;
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