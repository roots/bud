# Module: "api/translate"

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

Defined in api/translate.js:2

___

###  __spreadArrays

• **__spreadArrays**: *any* = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

Defined in api/translate.js:13

## Functions

###  translate

▸ **translate**(`output`: any): *any*

Defined in api/translate.js:34

## bud.translate

Process @wordpress/i18n strings from JS source assets.

If you are already translating strings with `yarn translate` then
there is no reason to run this separately.

```js
bud.translate('resources/languages/sage.pot')
```

**Parameters:**

Name | Type |
------ | ------ |
`output` | any |

**Returns:** *any*
