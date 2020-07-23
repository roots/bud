# Module: "plugin/controller"

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

Defined in plugin/controller.js:2

___

###  __spreadArrays

• **__spreadArrays**: *any* = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

Defined in plugin/controller.js:13

## Functions

###  controller

▸ **controller**(`bud`: any): *object*

Defined in plugin/controller.js:26

Plugin controller

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any* = bud

* **bindPluginProps**(): *void*

* **buildPlugin**(): *any*

* **doPluginHook**(`hook`: any): *void*

* **ensurePluginProp**(`prop`: string, `fallback`: any): *void*

* **initController**(`_a`: any)

* **initPlugin**(): *void*

* **makePlugin**(): *any*

* **mergePluginOptions**(): *void*

* **setPluginOptions**(): *void*
