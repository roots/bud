[@roots/budpack](../README.md) › [Globals](../globals.md) › ["base/webpackPlugins/miniCssExtract"](_base_webpackplugins_minicssextract_.md)

# Module: "base/webpackPlugins/miniCssExtract"

## Index

### Functions

* [miniCssExtract](_base_webpackplugins_minicssextract_.md#const-minicssextract)

## Functions

### `Const` miniCssExtract

▸ **miniCssExtract**(`bud`: any): *object*

*Defined in [base/webpackPlugins/miniCssExtract.js:3](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/webpackPlugins/miniCssExtract.js#L3)*

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
