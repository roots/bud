# Module: "api/inlineManifest"

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

Defined in api/inlineManifest.js:2

## Functions

###  inlineManifest

▸ **inlineManifest**(`name`: any): *any*

Defined in api/inlineManifest.js:22

Inline common scripts.

```js
bud.inlineManifest({name: 'runtime'})
```

**Parameters:**

Name | Type |
------ | ------ |
`name` | any |

**Returns:** *any*
