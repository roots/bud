# Module: "bud/index"

## Object literals

### `Const` bud

### ▪ **bud**: *object*

*Defined in [src/bud/index.ts:16](https://github.com/roots/bud-support/blob/bd00b72/src/bud/index.ts#L16)*

Bud - asset management framework.

**`see`** [https://roots.io/bud](https://roots.io/bud)

**`copyright`** Roots [https://roots.io](https://roots.io)

###  hooks

• **hooks**: *object*

*Defined in [src/bud/index.ts:18](https://github.com/roots/bud-support/blob/bd00b72/src/bud/index.ts#L18)*

#### Type declaration:

* **call**(): *function*

  * (`name`: string, `params`: any): *void*

* **getAll**: *Function*

* **make**: *Function*

* **on**(): *function*

  * (`name`: string, `callback`: Function): *void*

* **registered**: *Object*

###  inProduction

• **inProduction**: *boolean*

*Defined in [src/bud/index.ts:23](https://github.com/roots/bud-support/blob/bd00b72/src/bud/index.ts#L23)*

###  mode

• **mode**: *"development" | "production" | "none"*

*Defined in [src/bud/index.ts:22](https://github.com/roots/bud-support/blob/bd00b72/src/bud/index.ts#L22)*

###  plugin

• **plugin**: *object*

*Defined in [src/bud/index.ts:20](https://github.com/roots/bud-support/blob/bd00b72/src/bud/index.ts#L20)*

#### Type declaration:

* **controller**(): *function*

  * (`bud`: [Bud](_bud_util_types_.md#bud)): *[Controller](_bud_plugin_types_.md#controller)*

* **webpackAdapters**: *[WebpackAdapters](_bud_plugin_types_.md#webpackadapters)*

###  state

• **state**: *object*

*Defined in [src/bud/index.ts:21](https://github.com/roots/bud-support/blob/bd00b72/src/bud/index.ts#L21)*

#### Type declaration:

* **configs**: *[Configs](_bud_state_types_.md#configs)*

* **features**: *[Features](_bud_state_types_.md#features)*

* **options**: *[Options](_bud_state_types_.md#options)*

* **paths**: *[Paths](_bud_state_types_.md#paths)*

###  util

• **util**: *object*

*Defined in [src/bud/index.ts:19](https://github.com/roots/bud-support/blob/bd00b72/src/bud/index.ts#L19)*

#### Type declaration:

* **dump**: *[Dump](_bud_util_types_.md#dump)*

* **except**: *[Except](_bud_util_types_.md#except)*

* **fab**: *[Fab](_bud_util_types_.md#fab)*

* **shortCircuit**: *[ShortCircuit](_bud_util_types_.md#shortcircuit)*

* **terminate**(): *function*

  * (`any`: any): *void*
