[@roots/budpack](../README.md) › [Globals](../globals.md) › ["webpack/output"](_webpack_output_.md)

# Module: "webpack/output"

## Index

### Functions

* [output](_webpack_output_.md#const-output)

## Functions

### `Const` output

▸ **output**(`bud`: any): *object*

*Defined in [webpack/output.js:4](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/webpack/output.js#L4)*

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
