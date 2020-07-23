# Module: "plugin/adapters/webpack/manifest"

## Variables

### \_\_importDefault

• **\_\_importDefault**: _any_ = (this && this.**importDefault) || function (mod) {
return (mod && mod.**esModule) ? mod : { "default": mod };
}

Defined in plugin/adapters/webpack/manifest.js:2

---

### webpack_manifest_plugin_1

• **webpack_manifest_plugin_1**: _any_ = \_\_importDefault(require("webpack-manifest-plugin"))

Defined in plugin/adapters/webpack/manifest.js:7

## Functions

### manifest

▸ **manifest**(): _object_

Defined in plugin/adapters/webpack/manifest.js:8

**Returns:** _object_

- **make**(): _any_

- **setOptions**(): _object_

  - **filename**: _string_ = "manifest.json"

  - **publicPath**: _any_ = this.bud.paths.public

  - **writeToFileEmit**: _boolean_ = true
