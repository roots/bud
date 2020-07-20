[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/webpack/index"](_builder_webpack_index_.md)

# Module: "builder/webpack/index"

## Index

### Type aliases

* [WebpackBuilder](_builder_webpack_index_.md#webpackbuilder)
* [WebpackBuilderConstructor](_builder_webpack_index_.md#webpackbuilderconstructor)

### Functions

* [webpackConfig](_builder_webpack_index_.md#const-webpackconfig)

## Type aliases

###  WebpackBuilder

Ƭ **WebpackBuilder**: *object*

Defined in src/builder/webpack/index.ts:77

#### Type declaration:

* **bud**: *[bud](_builder_webpack_index_.md#bud)*

* **compile**(): *function*

  * (): *Configuration*

* **doHook**(): *function*

  * (`string`: any, `any`: any): *void*

* **mergeConfig**(): *function*

  * (`configValues`: Object): *void*

* **options**: *Object*

___

###  WebpackBuilderConstructor

Ƭ **WebpackBuilderConstructor**: *function*

Defined in src/builder/webpack/index.ts:73

#### Type declaration:

▸ (`bud`: bud): *[WebpackBuilder](_builder_webpack_index_.md#webpackbuilder)*

**Parameters:**

Name | Type |
------ | ------ |
`bud` | bud |

## Functions

### `Const` webpackConfig

▸ **webpackConfig**(`bud`: bud): *[WebpackBuilder](_builder_webpack_index_.md#webpackbuilder)*

Defined in src/builder/webpack/index.ts:18

Constructs WebpackBuilder object

**Parameters:**

Name | Type |
------ | ------ |
`bud` | bud |

**Returns:** *[WebpackBuilder](_builder_webpack_index_.md#webpackbuilder)*
