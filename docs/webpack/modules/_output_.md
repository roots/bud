[@roots/budpack](../README.md) › [Globals](../globals.md) › ["output"](_output_.md)

# Module: "output"

## Index

### Functions

* [output](_output_.md#const-output)

## Functions

### `Const` output

▸ **output**(`bud`: any): *object*

*Defined in [output.js:4](https://github.com/roots/bud-support/blob/91a13d1/src/budpack/builder/webpack/output.js#L4)*

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
