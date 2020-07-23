# Module: "api/postcss"

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

Defined in api/postcss.js:2

___

###  __rest

• **__rest**: *any* = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

Defined in api/postcss.js:13

## Functions

###  postCss

▸ **postCss**(`_a`: any): *any*

Defined in api/postcss.js:44

## bud.postCss

Configure PostCSS.

If you prefer, you may utilize a postcss.config.js file in the project root,
either alongside or in lieue of this configuration.

Conflicts between supplied configs will be resolved in favor of bud.config.js.

```js
bud.postCss({
  plugins: [
   require('astroturf'),
  ],
})
```

**Parameters:**

Name | Type |
------ | ------ |
`_a` | any |

**Returns:** *any*
