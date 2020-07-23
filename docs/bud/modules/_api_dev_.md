# Module: "api/dev"

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

Defined in api/dev.js:2

## Functions

###  dev

▸ **dev**(`options`: any): *any*

Defined in api/dev.js:18

Development server settings

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

**Returns:** *any*
