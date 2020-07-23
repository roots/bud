# Module: "api/dependencyManifest"

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

Defined in api/dependencyManifest.js:2

## Functions

###  dependencyManifest

▸ **dependencyManifest**(`settings`: any): *any*

Defined in api/dependencyManifest.js:24

## bud.dependencyManifest

**`see`** https://git.io/JJLxM

```js
bud.dependencyManifest({outputFormat: 'js', injectPolyfill: false})
```

**Parameters:**

Name | Type |
------ | ------ |
`settings` | any |

**Returns:** *any*
