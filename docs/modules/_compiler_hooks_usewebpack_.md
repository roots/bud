[@roots/budpack](../README.md) › [Globals](../globals.md) › ["compiler/hooks/useWebpack"](_compiler_hooks_usewebpack_.md)

# Module: "compiler/hooks/useWebpack"

## Index

### Functions

* [useProgress](_compiler_hooks_usewebpack_.md#const-useprogress)
* [useWebpack](_compiler_hooks_usewebpack_.md#const-usewebpack)

## Functions

### `Const` useProgress

▸ **useProgress**(): *any*

Defined in src/compiler/hooks/useWebpack.js:8

useProgress: Webpack ProgressPlugin

**Returns:** *any*

___

### `Const` useWebpack

▸ **useWebpack**(`__namedParameters`: object): *object*

Defined in src/compiler/hooks/useWebpack.js:34

Hook: useWebpack

**`prop`** {compiler} compiler webpack.compiler

**`prop`** {string}   options  project options

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`compiler` | any |
`config` | any |

**Returns:** *object*

* **assets**: *any[]*

* **errors**: *any[]*

* **hash**: *any* = buildStats?.hash

* **message**: *any*

* **percentage**: *any*

* **time**: *any* = buildStats?.time

* **warnings**: *any[]*
