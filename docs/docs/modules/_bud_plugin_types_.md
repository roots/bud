# Module: "bud/plugin/types"

## Type aliases

###  Controller

Ƭ **Controller**: *object*

*Defined in [src/bud/plugin/types.ts:20](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/types.ts#L20)*

#### Type declaration:

* **bindPluginProps**(): *function*

  * (): *any*

* **bud**? : *[Bud](_bud_util_types_.md#bud)*

* **buildPlugin**(): *function*

  * (): *any*

* **doPluginHook**(): *function*

  * (`hook`: string, ...`args`: any): *any*

* **ensurePluginProp**(): *function*

  * (`arg0`: string, `arg1`: any): *any*

* **initController**(): *function*

  * (`__namedParameters`: [string, function]): *[Controller](_bud_plugin_types_.md#controller)*

* **initPlugin**(): *function*

  * (): *any*

* **makePlugin**(): *function*

  * (): *any*

* **mergePluginOptions**(): *function*

  * (): *any*

* **name**? : *string*

* **plugin**? : *[BudPlugin](../interfaces/_bud_plugin_types_.budplugin.md)*

* **setPluginOptions**(): *function*

  * (): *any*

___

###  Plugin

Ƭ **Plugin**: *object*

*Defined in [src/bud/plugin/types.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/types.ts#L4)*

#### Type declaration:

* **controller**(): *function*

  * (`bud`: [Bud](_bud_util_types_.md#bud)): *[Controller](_bud_plugin_types_.md#controller)*

* **webpackAdapters**: *[WebpackAdapters](_bud_plugin_types_.md#webpackadapters)*

___

###  RegisteredPlugin

Ƭ **RegisteredPlugin**: *[string, [WebpackAdapter](_bud_plugin_types_.md#webpackadapter)]*

*Defined in [src/bud/plugin/types.ts:9](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/types.ts#L9)*

___

###  WebpackAdapter

Ƭ **WebpackAdapter**: *function*

*Defined in [src/bud/plugin/types.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/types.ts#L10)*

#### Type declaration:

▸ (): *any*

___

###  WebpackAdapters

Ƭ **WebpackAdapters**: *[RegisteredPlugin](_bud_plugin_types_.md#registeredplugin)[]*

*Defined in [src/bud/plugin/types.ts:11](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/types.ts#L11)*
