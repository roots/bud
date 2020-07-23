# Module: "plugin/adapters/webpack/index"

## Variables

###  browserSyncAdapter

• **browserSyncAdapter**: *string | function[]* = [
    'browser_sync_plugin',
    browserSync_1.browserSync,
]

Defined in plugin/adapters/webpack/index.js:16

___

###  browserSync_1

• **browserSync_1**: *["plugin/adapters/webpack/browserSync"](_plugin_adapters_webpack_browsersync_.md)* = require("./browserSync")

Defined in plugin/adapters/webpack/index.js:4

___

###  cleanAdapter

• **cleanAdapter**: *string | function[]* = [
    'clean_webpack_plugin',
    cleanWebpack_1.cleanWebpack,
]

Defined in plugin/adapters/webpack/index.js:20

___

###  cleanWebpack_1

• **cleanWebpack_1**: *["plugin/adapters/webpack/cleanWebpack"](_plugin_adapters_webpack_cleanwebpack_.md)* = require("./cleanWebpack")

Defined in plugin/adapters/webpack/index.js:5

___

###  copyAdapter

• **copyAdapter**: *string | function[]* = ['copy_plugin', copy_1.copy]

Defined in plugin/adapters/webpack/index.js:24

___

###  copy_1

• **copy_1**: *["plugin/adapters/webpack/copy"](_plugin_adapters_webpack_copy_.md)* = require("./copy")

Defined in plugin/adapters/webpack/index.js:6

___

###  defineAdapter

• **defineAdapter**: *string | function[]* = [
    'define_plugin',
    define_1.define,
]

Defined in plugin/adapters/webpack/index.js:25

___

###  define_1

• **define_1**: *["plugin/adapters/webpack/define"](_plugin_adapters_webpack_define_.md)* = require("./define")

Defined in plugin/adapters/webpack/index.js:7

___

###  dependencyExtractionAdapter

• **dependencyExtractionAdapter**: *string | function[]* = [
    'dependency_extraction_plugin',
    dependencyExtraction_1.dependencyExtraction,
]

Defined in plugin/adapters/webpack/index.js:29

___

###  dependencyExtraction_1

• **dependencyExtraction_1**: *["plugin/adapters/webpack/dependencyExtraction"](_plugin_adapters_webpack_dependencyextraction_.md)* = require("./dependencyExtraction")

Defined in plugin/adapters/webpack/index.js:8

___

###  fixStyleAdapter

• **fixStyleAdapter**: *string | function[]* = [
    'fix_style_only_entries_plugin',
    fixStyleOnlyEntries_1.fixStyleOnlyEntries,
]

Defined in plugin/adapters/webpack/index.js:33

___

###  fixStyleOnlyEntries_1

• **fixStyleOnlyEntries_1**: *["plugin/adapters/webpack/fixStyleOnlyEntries"](_plugin_adapters_webpack_fixstyleonlyentries_.md)* = require("./fixStyleOnlyEntries")

Defined in plugin/adapters/webpack/index.js:9

___

###  hmrAdapter

• **hmrAdapter**: *string | function[]* = [
    'hot_module_replacement_plugin',
    hotModuleReplacement_1.hotModuleReplacement,
]

Defined in plugin/adapters/webpack/index.js:37

___

###  hotModuleReplacement_1

• **hotModuleReplacement_1**: *["plugin/adapters/webpack/hotModuleReplacement"](_plugin_adapters_webpack_hotmodulereplacement_.md)* = require("./hotModuleReplacement")

Defined in plugin/adapters/webpack/index.js:10

___

###  limitChunkAdapter

• **limitChunkAdapter**: *string | function[]* = [
    'limit_chunk_count',
    limitChunkCount_1.limitChunkCount,
]

Defined in plugin/adapters/webpack/index.js:57

___

###  limitChunkCount_1

• **limitChunkCount_1**: *["plugin/adapters/webpack/limitChunkCount"](_plugin_adapters_webpack_limitchunkcount_.md)* = require("./limitChunkCount")

Defined in plugin/adapters/webpack/index.js:11

___

###  manifestAdapter

• **manifestAdapter**: *string | function[]* = [
    'manifest_plugin',
    manifest_1.manifest,
]

Defined in plugin/adapters/webpack/index.js:41

___

###  manifest_1

• **manifest_1**: *["plugin/adapters/webpack/manifest"](_plugin_adapters_webpack_manifest_.md)* = require("./manifest")

Defined in plugin/adapters/webpack/index.js:13

___

###  miniCssAdapter

• **miniCssAdapter**: *string | function[]* = [
    'mini_css_extract_plugin',
    miniCssExtract_1.miniCssExtract,
]

Defined in plugin/adapters/webpack/index.js:45

___

###  miniCssExtract_1

• **miniCssExtract_1**: *["plugin/adapters/webpack/miniCssExtract"](_plugin_adapters_webpack_minicssextract_.md)* = require("./miniCssExtract")

Defined in plugin/adapters/webpack/index.js:12

___

###  provideAdapter

• **provideAdapter**: *string | function[]* = [
    'provide_plugin',
    provide_1.provide,
]

Defined in plugin/adapters/webpack/index.js:49

___

###  provide_1

• **provide_1**: *["plugin/adapters/webpack/provide"](_plugin_adapters_webpack_provide_.md)* = require("./provide")

Defined in plugin/adapters/webpack/index.js:14

___

###  webpackAdapters

• **webpackAdapters**: *string | function[][]* = [
    browserSyncAdapter,
    cleanAdapter,
    copyAdapter,
    defineAdapter,
    dependencyExtractionAdapter,
    fixStyleAdapter,
    hmrAdapter,
    manifestAdapter,
    miniCssAdapter,
    ,
    provideAdapter,
    ,
    writeFileAdapter,
    limitChunkAdapter,
]

Defined in plugin/adapters/webpack/index.js:61

___

###  writeFileAdapter

• **writeFileAdapter**: *string | function[]* = [
    'write_file_plugin',
    writeFile_1.writeFile,
]

Defined in plugin/adapters/webpack/index.js:53

___

###  writeFile_1

• **writeFile_1**: *["plugin/adapters/webpack/writeFile"](_plugin_adapters_webpack_writefile_.md)* = require("./writeFile")

Defined in plugin/adapters/webpack/index.js:15
