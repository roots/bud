[@roots/budpack](../globals.md) › ["webpack/output"](_webpack_output_.md)

# Module: "webpack/output"

## Index

### Functions

* [output](_webpack_output_.md#const-output)

## Functions

### `Const` output

▸ **output**(`__namedParameters`: object): *object*

*Defined in [webpack/output.js:4](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/output.js#L4)*

Webpack output.

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`features` | any |
`paths` | any |

**Returns:** *object*

* ### **output**: *object*

  * **filename**: *string* = features.hashed
      ? '[name].[hash].js'
      : '[name].js'

  * **path**: *any* = paths.dist

  * **publicPath**: *any* = paths.public
