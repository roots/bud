# Module: "api/setEnv"

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

Defined in api/setEnv.js:2

## Functions

### setEnv

▸ **setEnv**(`options`: any): _any_

Defined in api/setEnv.js:27

## bud.setEnv

Set environment variables.

```js
bud.setEnv({
  APP_NAME: 'sage',
  //...,
})
```

**Parameters:**

| Name      | Type |
| --------- | ---- |
| `options` | any  |

**Returns:** _any_
