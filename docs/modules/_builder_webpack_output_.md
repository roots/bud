[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/webpack/output"](_builder_webpack_output_.md)

# Module: "builder/webpack/output"

## Index

### Functions

* [output](_builder_webpack_output_.md#const-output)

## Functions

### `Const` output

▸ **output**(`bud`: any): *object*

Defined in src/builder/webpack/output.js:4

Webpack output.

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **make**(): *object*

  * ### **output**: *object*

    * **filename**: *string* = bud.features.hash
        ? '[name].[hash:8].js'
        : '[name].js'

    * **path**: *any* = bud.paths.dist

    * **publicPath**: *any* = bud.paths.public

* **postHook**(): *void*

* **preHook**(): *void*

* ### **options**: *object*

  * **output**: *object*

    * **filename**: *string* = bud.features.hash
        ? '[name].[hash:8].js'
        : '[name].js'

    * **path**: *any* = bud.paths.dist

    * **publicPath**: *any* = bud.paths.public
