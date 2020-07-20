[@roots/budpack](../README.md) › [Globals](../globals.md) › ["base/webpackPlugins/index"](_base_webpackplugins_index_.md)

# Module: "base/webpackPlugins/index"

## Index

### Interfaces

* [BudWebpackPlugin](../interfaces/_base_webpackplugins_index_.budwebpackplugin.md)

### Type aliases

* [WebpackAdapterTuple](_base_webpackplugins_index_.md#webpackadaptertuple)
* [WebpackPluginAdapter](_base_webpackplugins_index_.md#webpackpluginadapter)

### Variables

* [webpackPlugins](_base_webpackplugins_index_.md#const-webpackplugins)

## Type aliases

###  WebpackAdapterTuple

Ƭ **WebpackAdapterTuple**: *[string, [WebpackPluginAdapter](_base_webpackplugins_index_.md#webpackpluginadapter)]*

*Defined in [base/webpackPlugins/index.ts:35](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/webpackPlugins/index.ts#L35)*

___

###  WebpackPluginAdapter

Ƭ **WebpackPluginAdapter**: *function*

*Defined in [base/webpackPlugins/index.ts:44](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/webpackPlugins/index.ts#L44)*

#### Type declaration:

▸ (): *[BudWebpackPlugin](../interfaces/_base_webpackplugins_index_.budwebpackplugin.md)*

## Variables

### `Const` webpackPlugins

• **webpackPlugins**: *Array‹[WebpackAdapterTuple](_base_webpackplugins_index_.md#webpackadaptertuple)›* = [
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

*Defined in [base/webpackPlugins/index.ts:18](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/webpackPlugins/index.ts#L18)*

## bud.webpackPlugins
Webpack plugins written for usage with the bud framework.
