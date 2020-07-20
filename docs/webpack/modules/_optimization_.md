[@roots/budpack](../README.md) › [Globals](../globals.md) › ["optimization"](_optimization_.md)

# Module: "optimization"

## Index

### Functions

* [optimization](_optimization_.md#const-optimization)

## Functions

### `Const` optimization

▸ **optimization**(`bud`: any): *object*

*Defined in [optimization.js:7](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/webpack/optimization.js#L7)*

Webpack optimization

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **uglifyOptions**: *any* = bud.options.uglify

* **doHook**(`name`: any, ...`params`: any[]): *void*

* **make**(): *void*

* **postHook**(): *void*

* **preHook**(): *void*

* **setMinimizer**(): *void*

* **setRuntimeChunk**(): *void*

* **setSplitChunks**(): *void*

* **uglify**(): *any*

* **whenSupported**(`feature`: any, `callback`: any): *void*

* ### **options**: *object*

  * **optimization**: *object*

    * **minimize**: *any* = bud.features.minified

    * **moduleIds**: *string* = "hashed"

    * **removeAvailableModules**: *boolean* = false

    * **removeEmptyChunks**: *boolean* = false

* ### **runtimeChunkOptions**: *object*

  * **name**(`entrypoint`: any): *string*

* ### **splitChunksOptions**: *object*

  * **cacheGroups**: *object*

    * **vendor**: *object*

      * **chunks**: *string* = "all"

      * **name**: *any* = bud.options.vendor.name

      * **priority**: *number* = -20

      * **test**: *RegExp‹›* = /[\\/]node_modules[\\/]/

* ### **supports**: *object*

  * **minification**: *any* = bud.features.minified

  * **runtimeChunk**: *any* = bud.features.inlineManifest

  * **vendor**: *any* = bud.features.vendor
