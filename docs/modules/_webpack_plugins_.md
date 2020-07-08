[@roots/budpack](../globals.md) › ["webpack/plugins"](_webpack_plugins_.md)

# Module: "webpack/plugins"

## Index

### Variables

* [BrowserSyncPlugin](_webpack_plugins_.md#const-browsersyncplugin)
* [CleanWebpackPlugin](_webpack_plugins_.md#cleanwebpackplugin)
* [CopyPlugin](_webpack_plugins_.md#const-copyplugin)
* [DefinePlugin](_webpack_plugins_.md#defineplugin)
* [DependencyExtractionPlugin](_webpack_plugins_.md#const-dependencyextractionplugin)
* [FixStyleOnlyEntriesPlugin](_webpack_plugins_.md#const-fixstyleonlyentriesplugin)
* [HotModuleReplacementPlugin](_webpack_plugins_.md#hotmodulereplacementplugin)
* [LimitChunkCountPlugin](_webpack_plugins_.md#limitchunkcountplugin)
* [ManifestPlugin](_webpack_plugins_.md#const-manifestplugin)
* [MiniCssExtractPlugin](_webpack_plugins_.md#const-minicssextractplugin)
* [NoEmitOnErrorsPlugin](_webpack_plugins_.md#noemitonerrorsplugin)
* [ProvidePlugin](_webpack_plugins_.md#provideplugin)
* [WriteFilePlugin](_webpack_plugins_.md#const-writefileplugin)

### Functions

* [plugins](_webpack_plugins_.md#const-plugins)

## Variables

### `Const` BrowserSyncPlugin

• **BrowserSyncPlugin**: *any* = require('browser-sync-webpack-plugin')

*Defined in [webpack/plugins.js:15](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/plugins.js#L15)*

___

###  CleanWebpackPlugin

• **CleanWebpackPlugin**: *[CleanWebpackPlugin](_webpack_plugins_.md#cleanwebpackplugin)*

*Defined in [webpack/plugins.js:2](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/plugins.js#L2)*

___

### `Const` CopyPlugin

• **CopyPlugin**: *any* = require('copy-webpack-plugin')

*Defined in [webpack/plugins.js:14](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/plugins.js#L14)*

___

###  DefinePlugin

• **DefinePlugin**: *DefinePlugin*

*Defined in [webpack/plugins.js:7](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/plugins.js#L7)*

___

### `Const` DependencyExtractionPlugin

• **DependencyExtractionPlugin**: *DependencyExtractionWebpackPlugin* = require('@wordpress/dependency-extraction-webpack-plugin')

*Defined in [webpack/plugins.js:3](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/plugins.js#L3)*

___

### `Const` FixStyleOnlyEntriesPlugin

• **FixStyleOnlyEntriesPlugin**: *any* = require('webpack-fix-style-only-entries')

*Defined in [webpack/plugins.js:16](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/plugins.js#L16)*

___

###  HotModuleReplacementPlugin

• **HotModuleReplacementPlugin**: *HotModuleReplacementPlugin*

*Defined in [webpack/plugins.js:9](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/plugins.js#L9)*

___

###  LimitChunkCountPlugin

• **LimitChunkCountPlugin**: *any*

*Defined in [webpack/plugins.js:8](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/plugins.js#L8)*

___

### `Const` ManifestPlugin

• **ManifestPlugin**: *any* = require('webpack-manifest-plugin')

*Defined in [webpack/plugins.js:4](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/plugins.js#L4)*

___

### `Const` MiniCssExtractPlugin

• **MiniCssExtractPlugin**: *any* = require('mini-css-extract-plugin')

*Defined in [webpack/plugins.js:5](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/plugins.js#L5)*

___

###  NoEmitOnErrorsPlugin

• **NoEmitOnErrorsPlugin**: *NoEmitOnErrorsPlugin*

*Defined in [webpack/plugins.js:10](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/plugins.js#L10)*

___

###  ProvidePlugin

• **ProvidePlugin**: *ProvidePlugin*

*Defined in [webpack/plugins.js:11](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/plugins.js#L11)*

___

### `Const` WriteFilePlugin

• **WriteFilePlugin**: *any* = require('write-file-webpack-plugin')

*Defined in [webpack/plugins.js:13](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/plugins.js#L13)*

## Functions

### `Const` plugins

▸ **plugins**(`__namedParameters`: object): *object*

*Defined in [webpack/plugins.js:21](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/plugins.js#L21)*

Webpack plugins.

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`features` | any |
`options` | any |
`paths` | any |

**Returns:** *object*

* **plugins**: *any[]* = [
      new FixStyleOnlyEntriesPlugin({
        silent: true,
      }),
      new MiniCssExtractPlugin({
        filename: options.hashed
          ? `[name].[chunkhash].css`
          : '[name].css',
      }),
      new CleanWebpackPlugin(),
      new ManifestPlugin({
        fileName: 'manifest.json',
        writeToFileEmit: true,
        publicPath: `${paths.public}/`,
      }),
      ...(options.env ? [new DefinePlugin(options.env)] : []),
    ]
