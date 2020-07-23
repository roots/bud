# Module: "api/bundle"

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

Defined in api/bundle.js:2

## Functions

### bundle

▸ **bundle**(`name`: any, `entries`: any): _any_

Defined in api/bundle.js:27

## bud.bundle

Compile a group of assets.

```js
bud.bundle('app', [bud.src('app.js'), bud.src('app.css')])
```

**Parameters:**

| Name      | Type |
| --------- | ---- |
| `name`    | any  |
| `entries` | any  |

**Returns:** _any_
