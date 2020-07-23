# Module: "plugin/adapters/webpack/dependencyExtraction"

## Variables

### \_\_importDefault

• **\_\_importDefault**: _any_ = (this && this.**importDefault) || function (mod) {
return (mod && mod.**esModule) ? mod : { "default": mod };
}

Defined in plugin/adapters/webpack/dependencyExtraction.js:2

---

### dependency_extraction_webpack_plugin_1

• **dependency_extraction_webpack_plugin_1**: _any_ = \_\_importDefault(require("@wordpress/dependency-extraction-webpack-plugin"))

Defined in plugin/adapters/webpack/dependencyExtraction.js:7

## Functions

### dependencyExtraction

▸ **dependencyExtraction**(): _object_

Defined in plugin/adapters/webpack/dependencyExtraction.js:8

**Returns:** _object_

- **make**(): _any_

- **setOptions**(): _any_

- **when**(): _any_
