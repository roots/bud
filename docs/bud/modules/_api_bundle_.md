# Module: "api/bundle"

## Variables

###  __assign

• **__assign**: *any* = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
}

Defined in api/bundle.js:2

## Functions

###  bundle

▸ **bundle**(`name`: any, `entries`: any): *any*

Defined in api/bundle.js:27

## bud.bundle

Compile a group of assets.

```js
bud.bundle('app', [
  bud.src('app.js'),
  bud.src('app.css'),
])
```

**Parameters:**

Name | Type |
------ | ------ |
`name` | any |
`entries` | any |

**Returns:** *any*
