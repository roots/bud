"use strict";
exports.__esModule = true;
exports.plugins = void 0;
var cleanWebpack_1 = require("./cleanWebpack");
var copy_1 = require("./copy");
var define_1 = require("./define");
var fixStyleOnlyEntries_1 = require("./fixStyleOnlyEntries");
var hotModuleReplacement_1 = require("./hotModuleReplacement");
var limitChunkCount_1 = require("./limitChunkCount");
var miniCssExtract_1 = require("./miniCssExtract");
var manifest_1 = require("./manifest");
var provide_1 = require("./provide");
var terser_1 = require("./terser");
var writeFile_1 = require("./writeFile");
/**
 * Bud Webpack Adapters
 */
var plugins = {
    name: 'plugins',
    register: {
        cleanWebpack: cleanWebpack_1.cleanWebpack,
        copy: copy_1.copy,
        define: define_1.define,
        fixStyleOnlyEntries: fixStyleOnlyEntries_1.fixStyleOnlyEntries,
        hotModuleReplacement: hotModuleReplacement_1.hotModuleReplacement,
        manifest: manifest_1.manifest,
        miniCssExtract: miniCssExtract_1.miniCssExtract,
        provide: provide_1.provide,
        limitChunkCount: limitChunkCount_1.limitChunkCount,
        terser: terser_1.terser,
        writeFile: writeFile_1.writeFile
    }
};
exports.plugins = plugins;
//# sourceMappingURL=index.js.map