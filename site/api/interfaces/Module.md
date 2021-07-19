---
id: "Module"
title: "Interface: Module<Plugin, Options>"
sidebar_label: "Module"
sidebar_position: 0
custom_edit_url: null
---

**`interface`** Module

An extension object as imported from source.

Consumed by [Extension](../classes/Extension.md).

## Type parameters

| Name | Type |
| :------ | :------ |
| `Plugin` | `any` |
| `Options` | `any` |

## Hierarchy

- **`Module`**

  ↳ [`Plugin`](Plugin.md)

## Properties

### api

• `Optional` **api**: [`Api`](../modules/Module.md#api)

Objects to bind to the framework.

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:39](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Module.ts#L39)

___

### apply

• `Optional` **apply**: `CallableFunction`

Webpack plugin apply.

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:49](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Module.ts#L49)

___

### boot

• `Optional` **boot**: [`Boot`](../modules/Module.md#boot)

General purpose callback. Called after everything else.

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:34](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Module.ts#L34)

___

### make

• `Optional` **make**: [`Make`](../modules/Module.md#make)<`Plugin`, `Options`\>

Returns an instantiated webpack plugin

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:44](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Module.ts#L44)

___

### name

• `Optional` **name**: `string` \| `number`

The module name

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:19](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Module.ts#L19)

___

### options

• `Optional` **options**: [`Options`](../modules/Module.md#options)<`Options`\>

Options registered with the extension

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:24](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Module.ts#L24)

___

### register

• `Optional` **register**: [`Register`](../modules/Module.md#register)

General purpose callback. Called first.

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:29](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Module.ts#L29)

___

### when

• `Optional` **when**: [`When`](../modules/Module.md#when)<`Options`\>

Returns a boolean determining if
a webpack plugin should be used in
compilation.

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:56](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Module.ts#L56)
