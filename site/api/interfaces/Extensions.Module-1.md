---
id: "Extensions.Module-1"
title: "Interface: Module<Plugin, Options>"
sidebar_label: "Module"
custom_edit_url: null
---

[Extensions](../modules/Extensions.md).Module

## Type parameters

| Name | Type |
| :------ | :------ |
| `Plugin` | `any` |
| `Options` | `any` |

## Hierarchy

- **`Module`**

  ↳ [`Plugin`](Extensions.Plugin.md)

## Properties

### api

• `Optional` **api**: [`Api`](../modules/Extensions.Module.md#api)

Objects to bind to the framework.

#### Defined in

[bud-framework/src/Extensions/Module.ts:28](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L28)

___

### apply

• `Optional` **apply**: `CallableFunction`

Webpack plugin apply.

#### Defined in

[bud-framework/src/Extensions/Module.ts:38](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L38)

___

### boot

• `Optional` **boot**: [`Boot`](../modules/Extensions.Module.md#boot)

General purpose callback. Called after everything else.

#### Defined in

[bud-framework/src/Extensions/Module.ts:23](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L23)

___

### make

• `Optional` **make**: [`Make`](../modules/Extensions.Module.md#make)<`Plugin`, `Options`\>

Returns an instantiated webpack plugin

#### Defined in

[bud-framework/src/Extensions/Module.ts:33](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L33)

___

### name

• `Optional` **name**: `string` \| `number`

The module name

#### Defined in

[bud-framework/src/Extensions/Module.ts:8](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L8)

___

### options

• `Optional` **options**: [`Options`](../modules/Extensions.Module.md#options)<`Options`\>

Options registered with the extension

#### Defined in

[bud-framework/src/Extensions/Module.ts:13](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L13)

___

### register

• `Optional` **register**: [`Register`](../modules/Extensions.Module.md#register)

General purpose callback. Called first.

#### Defined in

[bud-framework/src/Extensions/Module.ts:18](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L18)

___

### when

• `Optional` **when**: [`When`](../modules/Extensions.Module.md#when)<`Options`\>

Returns a boolean determining if
a webpack plugin should be used in
compilation.

#### Defined in

[bud-framework/src/Extensions/Module.ts:45](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L45)
