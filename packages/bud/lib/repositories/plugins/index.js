"use strict";
exports.__esModule = true;
exports.plugins = void 0;
var cleanWebpack_1 = require("./cleanWebpack");
var copy_1 = require("./copy");
var define_1 = require("./define");
var hotModuleReplacement_1 = require("./hotModuleReplacement");
var limitChunkCount_1 = require("./limitChunkCount");
var manifest_1 = require("./manifest");
var provide_1 = require("./provide");
var writeFile_1 = require("./writeFile");
/**
 * Bud Webpack Adapters
 */
var plugins = {
    name: 'plugins',
    register: [
        // browserSync,
        cleanWebpack_1.cleanWebpack,
        copy_1.copy,
        define_1.define,
        // fixStyleOnlyEntries,
        hotModuleReplacement_1.hotModuleReplacement,
        manifest_1.manifest,
        // miniCssExtract,
        provide_1.provide,
        limitChunkCount_1.limitChunkCount,
        // terser,
        writeFile_1.writeFile,
    ]
};
exports.plugins = plugins;
//# sourceMappingURL=index.js.map