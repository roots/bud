# Module: "build/output"

## Functions

### `Const` output

▸ **output**(`bud`: any): *object*

*Defined in [src/build/output.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/build/output.ts#L4)*

Webpack output.

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **make**(): *any*

* ### **options**: *object*

  * **output**: *object*

    * **filename**: *string* = bud.state.features.hash
        ? '[name].[hash:8].js'
        : '[name].js'

    * **path**: *any* = bud.state.paths.dist

    * **publicPath**: *any* = bud.state.paths.public
