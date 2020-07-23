# Module: "plugin/adapters/webpack/manifest"

## Variables

###  __importDefault

• **__importDefault**: *any* = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}

Defined in plugin/adapters/webpack/manifest.js:2

___

###  webpack_manifest_plugin_1

• **webpack_manifest_plugin_1**: *any* = __importDefault(require("webpack-manifest-plugin"))

Defined in plugin/adapters/webpack/manifest.js:7

## Functions

###  manifest

▸ **manifest**(): *object*

Defined in plugin/adapters/webpack/manifest.js:8

**Returns:** *object*

* **make**(): *any*

* **setOptions**(): *object*

  * **filename**: *string* = "manifest.json"

  * **publicPath**: *any* = this.bud.paths.public

  * **writeToFileEmit**: *boolean* = true
