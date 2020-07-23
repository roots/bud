# Module: "api/auto"

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

Defined in api/auto.js:2

## Functions

###  auto

▸ **auto**(`options`: any): *any*

Defined in api/auto.js:24

## bud.auto

Automatically load modules instead of needing to import them.

```js
bud.auto({jquery: ['$', 'window.jQuery']})
```

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

**Returns:** *any*
