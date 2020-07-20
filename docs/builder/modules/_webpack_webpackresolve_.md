[@roots/budpack](../README.md) › [Globals](../globals.md) › ["webpack/webpackResolve"](_webpack_webpackresolve_.md)

# Module: "webpack/webpackResolve"

## Index

### Functions

* [webpackResolve](_webpack_webpackresolve_.md#const-webpackresolve)

## Functions

### `Const` webpackResolve

▸ **webpackResolve**(`bud`: any): *object*

*Defined in [webpack/webpackResolve.js:6](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/webpack/webpackResolve.js#L6)*

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
