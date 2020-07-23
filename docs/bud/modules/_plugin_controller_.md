# Module: "plugin/controller"

## Variables

### \_\_assign

• **\_\_assign**: _any_ = (this && this.**assign) || function () {
**assign = Object.assign || function(t) {
for (var s, i = 1, n = arguments.length; i < n; i++) {
s = arguments[i];
for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
t[p] = s[p];
}
return t;
};
return \_\_assign.apply(this, arguments);
}

Defined in plugin/controller.js:2

---

### \_\_spreadArrays

• **\_\_spreadArrays**: _any_ = (this && this.\_\_spreadArrays) || function () {
for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
for (var r = Array(s), k = 0, i = 0; i < il; i++)
for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
r[k] = a[j];
return r;
}

Defined in plugin/controller.js:13

## Functions

### controller

▸ **controller**(`bud`: any): _object_

Defined in plugin/controller.js:26

Plugin controller

**Parameters:**

| Name  | Type |
| ----- | ---- |
| `bud` | any  |

**Returns:** _object_

- **bud**: _any_ = bud

- **bindPluginProps**(): _void_

- **buildPlugin**(): _any_

- **doPluginHook**(`hook`: any): _void_

- **ensurePluginProp**(`prop`: string, `fallback`: any): _void_

- **initController**(`_a`: any)

- **initPlugin**(): _void_

- **makePlugin**(): _any_

- **mergePluginOptions**(): _void_

- **setPluginOptions**(): _void_
