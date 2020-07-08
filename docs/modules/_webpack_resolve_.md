[@roots/budpack](../globals.md) › ["webpack/resolve"](_webpack_resolve_.md)

# Module: "webpack/resolve"

## Index

### Variables

* [path](_webpack_resolve_.md#const-path)

### Functions

* [resolve](_webpack_resolve_.md#const-resolve)

## Variables

### `Const` path

• **path**: *PlatformPath* = require('path')

*Defined in [webpack/resolve.js:1](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/resolve.js#L1)*

## Functions

### `Const` resolve

▸ **resolve**(`__namedParameters`: object): *object*

*Defined in [webpack/resolve.js:6](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/resolve.js#L6)*

Webpack resolves.

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`options` | any |
`paths` | any |

**Returns:** *object*

* ### **resolve**: *object*

  * **extensions**: *string[]* = ['.js', '.json', '.vue', '.jsx']

  * **modules**: *string[]* = [
        path.resolve(paths.project, 'node_modules'),
      ]
