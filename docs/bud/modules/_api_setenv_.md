# Module: "api/setEnv"

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

Defined in api/setEnv.js:2

## Functions

###  setEnv

▸ **setEnv**(`options`: any): *any*

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

Name | Type |
------ | ------ |
`options` | any |

**Returns:** *any*
