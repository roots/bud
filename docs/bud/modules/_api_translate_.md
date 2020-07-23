# Module: "api/translate"

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

Defined in api/translate.js:2

---

### \_\_spreadArrays

• **\_\_spreadArrays**: _any_ = (this && this.\_\_spreadArrays) || function () {
for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
for (var r = Array(s), k = 0, i = 0; i < il; i++)
for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
r[k] = a[j];
return r;
}

Defined in api/translate.js:13

## Functions

### translate

▸ **translate**(`output`: any): _any_

Defined in api/translate.js:34

## bud.translate

Process @wordpress/i18n strings from JS source assets.

If you are already translating strings with `yarn translate` then
there is no reason to run this separately.

```js
bud.translate('resources/languages/sage.pot')
```

**Parameters:**

| Name     | Type |
| -------- | ---- |
| `output` | any  |

**Returns:** _any_
