---
id: "module"
title: "Interface: Module<Plugin, Options>"
sidebar_label: "Module"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `Plugin` | `any` |
| `Options` | `any` |

## Implemented by

- [`Extension`](../classes/extension.md)

## Properties

### api

• `Optional` **api**: [`Api`](../modules/module.md#api)

Objects to bind to the framework.

#### Defined in

bud-framework/types/Extensions/Module.d.ts:23

___

### apply

• `Optional` **apply**: `CallableFunction`

Webpack plugin apply.

#### Defined in

bud-framework/types/Extensions/Module.d.ts:31

___

### boot

• `Optional` **boot**: [`Boot`](../modules/module.md#boot)

General purpose callback. Called after everything else.

#### Defined in

bud-framework/types/Extensions/Module.d.ts:19

___

### make

• `Optional` **make**: [`Make`](../modules/module.md#make)<`Plugin`, `Options`\>

Returns an instantiated webpack plugin

#### Defined in

bud-framework/types/Extensions/Module.d.ts:27

___

### name

• `Optional` **name**: `string` \| `number`

The module name

#### Defined in

bud-framework/types/Extensions/Module.d.ts:7

___

### options

• `Optional` **options**: [`Options`](../modules/module.md#options)<`Options`\>

Options registered with the extension

#### Defined in

bud-framework/types/Extensions/Module.d.ts:11

___

### register

• `Optional` **register**: [`Register`](../modules/module.md#register)

General purpose callback. Called first.

#### Defined in

bud-framework/types/Extensions/Module.d.ts:15

___

### when

• `Optional` **when**: [`When`](../modules/module.md#when)<`Options`\>

Returns a boolean determining if
a webpack plugin should be used in
compilation.

#### Defined in

bud-framework/types/Extensions/Module.d.ts:37
