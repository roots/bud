[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/webpack/optimization"](_builder_webpack_optimization_.md)

# Module: "builder/webpack/optimization"

## Index

### Functions

* [optimization](_builder_webpack_optimization_.md#const-optimization)

## Functions

### `Const` optimization

▸ **optimization**(`bud`: any): *object*

Defined in src/builder/webpack/optimization.js:7

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
