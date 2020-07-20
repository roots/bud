[@roots/budpack](../README.md) › [Globals](../globals.md) › ["plugins/budPluginControllerFactory"](_plugins_budplugincontrollerfactory_.md)

# Module: "plugins/budPluginControllerFactory"

## Index

### Type aliases

* [BudPluginController](_plugins_budplugincontrollerfactory_.md#budplugincontroller)

### Functions

* [pluginControllerFactory](_plugins_budplugincontrollerfactory_.md#const-plugincontrollerfactory)

## Type aliases

###  BudPluginController

Ƭ **BudPluginController**: *object*

Defined in src/plugins/budPluginControllerFactory.ts:155

#### Type declaration:

* **bindPluginProps**(): *function*

  * (): *void*

* **bud**: *[bud](_plugins_budplugincontrollerfactory_.md#bud)*

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

  * (`arg0`: string, `arg1`: object): *[BudPluginController](_plugins_budplugincontrollerfactory_.md#budplugincontroller)*

* **register**(): *function*

  * (): *void*

## Functions

### `Const` pluginControllerFactory

▸ **pluginControllerFactory**(`bud`: bud): *[BudPluginController](_plugins_budplugincontrollerfactory_.md#budplugincontroller)*

Defined in src/plugins/budPluginControllerFactory.ts:9

Bud plugin controller factory.

**Parameters:**

Name | Type |
------ | ------ |
`bud` | bud |

**Returns:** *[BudPluginController](_plugins_budplugincontrollerfactory_.md#budplugincontroller)*
