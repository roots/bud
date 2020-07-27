"use strict";
exports.__esModule = true;
exports.webpackAdapters = void 0;
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
var terser_1 = require("./terser");
var writeFile_1 = require("./writeFile");
var browserSyncAdapter = [
    'browser_sync_plugin',
    browserSync_1.browserSync,
];
var cleanAdapter = [
    'clean_webpack_plugin',
    cleanWebpack_1.cleanWebpack,
];
var copyAdapter = ['copy_plugin', copy_1.copy];
var defineAdapter = [
    'define_plugin',
    define_1.define,
];
var dependencyExtractionAdapter = [
    'dependency_extraction_plugin',
    dependencyExtraction_1.dependencyExtraction,
];
var fixStyleAdapter = [
    'fix_style_only_entries_plugin',
    fixStyleOnlyEntries_1.fixStyleOnlyEntries,
];
var hmrAdapter = [
    'hot_module_replacement_plugin',
    hotModuleReplacement_1.hotModuleReplacement,
];
var manifestAdapter = [
    'manifest_plugin',
    manifest_1.manifest,
];
var miniCssAdapter = [
    'mini_css_extract_plugin',
    miniCssExtract_1.miniCssExtract,
];
var provideAdapter = [
    'provide_plugin',
    provide_1.provide,
];
var writeFileAdapter = [
    'write_file_plugin',
    writeFile_1.writeFile,
];
var limitChunkAdapter = [
    'limit_chunk_count',
    limitChunkCount_1.limitChunkCount,
];
var terserAdapter = [
    'terser',
    terser_1.terser,
];
var webpackAdapters = [
    writeFileAdapter,
    // browserSyncAdapter,
    cleanAdapter,
    copyAdapter,
    defineAdapter,
    dependencyExtractionAdapter,
    fixStyleAdapter,
    hmrAdapter,
    manifestAdapter,
    miniCssAdapter,
    provideAdapter,
    terserAdapter,
    limitChunkAdapter,
];
exports.webpackAdapters = webpackAdapters;
//# sourceMappingURL=index.js.map