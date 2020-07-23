# Module: "plugin/adapters/webpack/miniCssExtract"

## Variables

###  __importDefault

• **__importDefault**: *any* = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}

Defined in plugin/adapters/webpack/miniCssExtract.js:2

___

###  mini_css_extract_plugin_1

• **mini_css_extract_plugin_1**: *any* = __importDefault(require("mini-css-extract-plugin"))

Defined in plugin/adapters/webpack/miniCssExtract.js:7

## Functions

###  miniCssExtract

▸ **miniCssExtract**(): *object*

Defined in plugin/adapters/webpack/miniCssExtract.js:8

**Returns:** *object*

* **make**(): *any*

* **setOptions**(): *object*

  * **filename**: *string* = this.bud.features.hash
                ? "[name].[hash:8].css"
                : '[name].css'
