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

bud-framework/src/Module.ts:35

___

### apply

• `Optional` **apply**: `CallableFunction`

Webpack plugin apply.

#### Defined in

bud-framework/src/Module.ts:45

___

### boot

• `Optional` **boot**: [`Boot`](../modules/Module.md#boot)

General purpose callback. Called after everything else.

#### Defined in

bud-framework/src/Module.ts:30

___

### make

• `Optional` **make**: [`Make`](../modules/Module.md#make)<`Plugin`, `Options`\>

Returns an instantiated webpack plugin

#### Defined in

bud-framework/src/Module.ts:40

___

### name

• `Optional` **name**: `string` \| `number`

The module name

#### Defined in

bud-framework/src/Module.ts:15

___

### options

• `Optional` **options**: [`Options`](../modules/Module.md#options)<`Options`\>

Options registered with the extension

#### Defined in

bud-framework/src/Module.ts:20

___

### register

• `Optional` **register**: [`Register`](../modules/Module.md#register)

General purpose callback. Called first.

#### Defined in

bud-framework/src/Module.ts:25

___

### when

• `Optional` **when**: [`When`](../modules/Module.md#when)<`Options`\>

Returns a boolean determining if
a webpack plugin should be used in
compilation.

#### Defined in

bud-framework/src/Module.ts:52
