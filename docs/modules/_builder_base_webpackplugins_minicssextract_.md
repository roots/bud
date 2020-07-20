[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/base/webpackPlugins/miniCssExtract"](_builder_base_webpackplugins_minicssextract_.md)

# Module: "builder/base/webpackPlugins/miniCssExtract"

## Index

### Functions

* [miniCssExtract](_builder_base_webpackplugins_minicssextract_.md#const-minicssextract)

## Functions

### `Const` miniCssExtract

▸ **miniCssExtract**(`bud`: any): *object*

Defined in src/builder/base/webpackPlugins/miniCssExtract.js:3

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **make**(): *any*

* ### **options**: *object*

  * **filename**: *string* = bud.features.hash
      ? `[name].[hash:8].css`
      : '[name].css'
