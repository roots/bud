[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/base/webpackPlugins/index"](_builder_base_webpackplugins_index_.md)

# Module: "builder/base/webpackPlugins/index"

## Index

### Interfaces

* [BudWebpackPlugin](../interfaces/_builder_base_webpackplugins_index_.budwebpackplugin.md)

### Type aliases

* [WebpackAdapterTuple](_builder_base_webpackplugins_index_.md#webpackadaptertuple)
* [WebpackPluginAdapter](_builder_base_webpackplugins_index_.md#webpackpluginadapter)

### Variables

* [webpackPlugins](_builder_base_webpackplugins_index_.md#const-webpackplugins)

## Type aliases

###  WebpackAdapterTuple

Ƭ **WebpackAdapterTuple**: *[string, [WebpackPluginAdapter](_builder_base_webpackplugins_index_.md#webpackpluginadapter)]*

Defined in src/builder/base/webpackPlugins/index.ts:38

___

###  WebpackPluginAdapter

Ƭ **WebpackPluginAdapter**: *function*

Defined in src/builder/base/webpackPlugins/index.ts:50

#### Type declaration:

▸ (): *[BudWebpackPlugin](../interfaces/_builder_base_webpackplugins_index_.budwebpackplugin.md)*

## Variables

### `Const` webpackPlugins

• **webpackPlugins**: *Array‹[WebpackAdapterTuple](_builder_base_webpackplugins_index_.md#webpackadaptertuple)›* = [
  ['browser_sync_plugin', browserSync],
  ['clean_webpack_plugin', cleanWebpack],
  ['copy_plugin', copy],
  ['define_plugin', define],
  ['dependency_extraction_plugin', dependencyExtraction],
  ['fix_style_only_entries_plugin', fixStyleOnlyEntries],
  ['hot_module_replacement_plugin', hotModuleReplacement],
  ['manifest_plugin', manifest],
  ['mini_css_extract_plugin', miniCssExtract],
  ['provide_plugin', provide],
  ['write_file_plugin', writeFile],
  ['limit_chunk_count', limitChunkCount],
]

Defined in src/builder/base/webpackPlugins/index.ts:21

## bud.webpackPlugins

Webpack plugins written for usage with the bud framework.
