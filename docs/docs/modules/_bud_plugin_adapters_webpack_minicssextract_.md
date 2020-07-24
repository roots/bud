# Module: "bud/plugin/adapters/webpack/miniCssExtract"

## Functions

### `Const` miniCssExtract

▸ **miniCssExtract**(): *object*

*Defined in [src/bud/plugin/adapters/webpack/miniCssExtract.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/miniCssExtract.ts#L4)*

**Returns:** *object*

* **make**(): *MiniCssExtractPlugin‹›*

* **setOptions**(): *object*

  * **filename**: *string* = this.bud.state.features.hash
        ? `[name].[hash:8].css`
        : '[name].css'
