# Module: "api/dependencyManifest"

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

Defined in api/dependencyManifest.js:2

## Functions

### dependencyManifest

▸ **dependencyManifest**(`settings`: any): _any_

Defined in api/dependencyManifest.js:24

## bud.dependencyManifest

**`see`** https://git.io/JJLxM

```js
bud.dependencyManifest({
  outputFormat: 'js',
  injectPolyfill: false,
})
```

**Parameters:**

| Name       | Type |
| ---------- | ---- |
| `settings` | any  |

**Returns:** _any_
