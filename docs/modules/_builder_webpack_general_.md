[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/webpack/general"](_builder_webpack_general_.md)

# Module: "builder/webpack/general"

## Index

### Functions

* [general](_builder_webpack_general_.md#const-general)

## Functions

### `Const` general

▸ **general**(`bud`: any): *object*

Defined in src/builder/webpack/general.js:6

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
