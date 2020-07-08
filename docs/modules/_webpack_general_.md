[@roots/budpack](../globals.md) › ["webpack/general"](_webpack_general_.md)

# Module: "webpack/general"

## Index

### Functions

* [general](_webpack_general_.md#const-general)

## Functions

### `Const` general

▸ **general**(`__namedParameters`: object): *object*

*Defined in [webpack/general.js:4](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/general.js#L4)*

General webpackery.

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`features` | any |
`mode` | any |
`options` | any |
`paths` | any |

**Returns:** *object*

* **context**: *any* = paths.project

* **devtool**: *any* = features.sourceMap ? options.devtool : false

* **mode**: *any*

* **target**: *string* = "web"

* **watch**: *any* = features.watch
