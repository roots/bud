# Module: "api/purge"

## Variables

### \_\_rest

• **\_\_rest**: _any_ = (this && this.\_\_rest) || function (s, e) {
var t = {};
for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
t[p] = s[p];
if (s != null && typeof Object.getOwnPropertySymbols === "function")
for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
t[p[i]] = s[p[i]];
}
return t;
}

Defined in api/purge.js:2

---

### \_\_spreadArrays

• **\_\_spreadArrays**: _any_ = (this && this.\_\_spreadArrays) || function () {
for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
for (var r = Array(s), k = 0, i = 0; i < il; i++)
for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
r[k] = a[j];
return r;
}

Defined in api/purge.js:13

## Functions

### purge

▸ **purge**(`_a`: any): _any_

Defined in api/purge.js:39

## bud.purge

Purge unused CSS from compiled stylesheets

**`see`** https://purgecss.com/guides/wordpress.html

**`see`** https://purgecss.com/configuration.html

```js
bud.purge({
  enabled: bud.inProduction,
  content: [bud.project('resources/views/**')],
  allow: require('purgecss-with-wordpress').whitelist,
  allowPatterns: require('purgecss-with-wordpress')
    .whitelistPatterns,
})
```

**Parameters:**

| Name | Type |
| ---- | ---- |
| `_a` | any  |

**Returns:** _any_
