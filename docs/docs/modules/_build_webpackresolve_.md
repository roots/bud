# Module: "build/webpackResolve"

## Functions

### `Const` webpackResolve

▸ **webpackResolve**(`bud`: any): *object*

*Defined in [src/build/webpackResolve.ts:6](https://github.com/roots/bud-support/blob/bd00b72/src/build/webpackResolve.ts#L6)*

Webpack resolvers.

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **make**(): *any*

* ### **options**: *object*

  * **resolve**: *object*

    * **alias**: *any* = bud.state.options.alias || {}

    * **extensions**: *string[]* = [
        '.js',
        '.json',
        '.vue',
        '.jsx',
        '.ts',
        '.tsx',
      ]

    * **modules**: *any[]* = [bud.project('node_modules')]
