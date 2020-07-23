# Module: "plugin/adapters/webpack/miniCssExtract"

## Variables

### \_\_importDefault

• **\_\_importDefault**: _any_ = (this && this.**importDefault) || function (mod) {
return (mod && mod.**esModule) ? mod : { "default": mod };
}

Defined in plugin/adapters/webpack/miniCssExtract.js:2

---

### mini_css_extract_plugin_1

• **mini_css_extract_plugin_1**: _any_ = \_\_importDefault(require("mini-css-extract-plugin"))

Defined in plugin/adapters/webpack/miniCssExtract.js:7

## Functions

### miniCssExtract

▸ **miniCssExtract**(): _object_

Defined in plugin/adapters/webpack/miniCssExtract.js:8

**Returns:** _object_

- **make**(): _any_

- **setOptions**(): _object_

  - **filename**: _string_ = this.bud.features.hash
    ? "[name].[hash:8].css"
    : '[name].css'
