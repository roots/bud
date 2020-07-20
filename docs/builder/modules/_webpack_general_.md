[@roots/budpack](../README.md) › [Globals](../globals.md) › ["webpack/general"](_webpack_general_.md)

# Module: "webpack/general"

## Index

### Functions

* [general](_webpack_general_.md#const-general)

## Functions

### `Const` general

▸ **general**(`bud`: any): *object*

*Defined in [webpack/general.js:7](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/webpack/general.js#L7)*

General webpack options

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **make**(): *object*

  * **context**: *any* = bud.paths.project

  * **devtool**: *any* = bud.features.sourceMap
      ? bud.options.devtool
      : false

  * **mode**: *any* = bud.mode

  * **target**: *any* = bud.options.target

  * **watch**: *any* = bud.features.watch

  * ### **node**: *object*

    * **child_process**: *string* = "empty"

    * **dgram**: *string* = "empty"

    * **dns**: *string* = "mock"

    * **fs**: *string* = "empty"

    * **http2**: *string* = "empty"

    * **module**: *string* = "empty"

    * **net**: *string* = "empty"

    * **tls**: *string* = "empty"

* **postHook**(): *void*

* **preHook**(): *void*

* ### **options**: *object*

  * **context**: *any* = bud.paths.project

  * **devtool**: *any* = bud.features.sourceMap
      ? bud.options.devtool
      : false

  * **mode**: *any* = bud.mode

  * **target**: *any* = bud.options.target

  * **watch**: *any* = bud.features.watch

  * **node**: *object*

    * **child_process**: *string* = "empty"

    * **dgram**: *string* = "empty"

    * **dns**: *string* = "mock"

    * **fs**: *string* = "empty"

    * **http2**: *string* = "empty"

    * **module**: *string* = "empty"

    * **net**: *string* = "empty"

    * **tls**: *string* = "empty"
