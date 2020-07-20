[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/webpack/webpackResolve"](_builder_webpack_webpackresolve_.md)

# Module: "builder/webpack/webpackResolve"

## Index

### Functions

* [webpackResolve](_builder_webpack_webpackresolve_.md#const-webpackresolve)

## Functions

### `Const` webpackResolve

▸ **webpackResolve**(`bud`: any): *object*

Defined in src/builder/webpack/webpackResolve.js:6

Webpack resolvers.

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **make**(): *object*

  * ### **resolve**: *object*

    * **alias**: *any* = bud.options.alias || {}

    * **extensions**: *string[]* = [
        '.js',
        '.json',
        '.vue',
        '.jsx',
        '.ts',
        '.tsx',
      ]

    * **modules**: *any[]* = [bud.project('node_modules')]

* **postHook**(): *void*

* **preHook**(): *void*

* ### **options**: *object*

  * **resolve**: *object*

    * **alias**: *any* = bud.options.alias || {}

    * **extensions**: *string[]* = [
        '.js',
        '.json',
        '.vue',
        '.jsx',
        '.ts',
        '.tsx',
      ]

    * **modules**: *any[]* = [bud.project('node_modules')]
