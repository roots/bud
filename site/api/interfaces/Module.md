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

[packages/@roots/bud-framework/src/Module.ts:35](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Module.ts#L35)

___

### apply

• `Optional` **apply**: `CallableFunction`

Webpack plugin apply.

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:45](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Module.ts#L45)

___

### boot

• `Optional` **boot**: [`Boot`](../modules/Module.md#boot)

General purpose callback. Called after everything else.

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:30](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Module.ts#L30)

___

### make

• `Optional` **make**: [`Make`](../modules/Module.md#make)<`Plugin`, `Options`\>

Returns an instantiated webpack plugin

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:40](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Module.ts#L40)

___

### name

• `Optional` **name**: `string` \| `number`

The module name

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:15](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Module.ts#L15)

___

### options

• `Optional` **options**: [`Options`](../modules/Module.md#options)<`Options`\>

Options registered with the extension

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:20](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Module.ts#L20)

___

### register

• `Optional` **register**: [`Register`](../modules/Module.md#register)

General purpose callback. Called first.

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:25](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Module.ts#L25)

___

### when

• `Optional` **when**: [`When`](../modules/Module.md#when)<`Options`\>

Returns a boolean determining if
a webpack plugin should be used in
compilation.

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:52](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Module.ts#L52)
