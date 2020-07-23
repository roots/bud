# Module: "api/auto"

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

Defined in api/auto.js:2

## Functions

### auto

▸ **auto**(`options`: any): _any_

Defined in api/auto.js:24

## bud.auto

Automatically load modules instead of needing to import them.

```js
bud.auto({jquery: ['$', 'window.jQuery']})
```

**Parameters:**

| Name      | Type |
| --------- | ---- |
| `options` | any  |

**Returns:** _any_
