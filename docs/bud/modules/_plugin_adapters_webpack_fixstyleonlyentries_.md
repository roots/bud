# Module: "plugin/adapters/webpack/fixStyleOnlyEntries"

## Variables

### \_\_importDefault

• **\_\_importDefault**: _any_ = (this && this.**importDefault) || function (mod) {
return (mod && mod.**esModule) ? mod : { "default": mod };
}

Defined in plugin/adapters/webpack/fixStyleOnlyEntries.js:2

---

### webpack_fix_style_only_entries_1

• **webpack_fix_style_only_entries_1**: _any_ = \_\_importDefault(require("webpack-fix-style-only-entries"))

Defined in plugin/adapters/webpack/fixStyleOnlyEntries.js:7

## Functions

### fixStyleOnlyEntries

▸ **fixStyleOnlyEntries**(): _object_

Defined in plugin/adapters/webpack/fixStyleOnlyEntries.js:8

**Returns:** _object_

- **make**(): _any_

- ### **options**: _object_

  - **silent**: _boolean_ = true
