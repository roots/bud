[@roots/budpack](../README.md) › [Globals](../globals.md) › ["plugin/pluginControllerFactory"](_plugin_plugincontrollerfactory_.md)

# Module: "plugin/pluginControllerFactory"

## Index

### Type aliases

* [BudPluginController](_plugin_plugincontrollerfactory_.md#budplugincontroller)

### Functions

* [pluginControllerFactory](_plugin_plugincontrollerfactory_.md#const-plugincontrollerfactory)

## Type aliases

###  BudPluginController

Ƭ **BudPluginController**: *object*

Defined in plugin/pluginControllerFactory.ts:146

#### Type declaration:

* **bindPluginProps**(): *function*

  * (): *void*

* **bud**: *[bud](_plugin_plugincontrollerfactory_.md#bud)*

* **build**(): *function*

  * (): *void*

* **doPluginHook**(): *function*

  * (`hook`: string, ...`args`: any): *void*

* **ensurePluginProp**(): *function*

  * (`arg0`: string, `arg1`: any): *void*

* **instantiatePlugin**(): *function*

  * (): *void*

* **mergePluginOptions**(): *function*

  * (): *void*

* **new**(): *function*

  * (`arg0`: string, `arg1`: object): *[BudPluginController](_plugin_plugincontrollerfactory_.md#budplugincontroller)*

* **register**(): *function*

  * (): *void*

## Functions

### `Const` pluginControllerFactory

▸ **pluginControllerFactory**(`bud`: bud): *[BudPluginController](_plugin_plugincontrollerfactory_.md#budplugincontroller)*

Defined in plugin/pluginControllerFactory.ts:9

Bud plugin controller factory.

**Parameters:**

Name | Type |
------ | ------ |
`bud` | bud |

**Returns:** *[BudPluginController](_plugin_plugincontrollerfactory_.md#budplugincontroller)*
