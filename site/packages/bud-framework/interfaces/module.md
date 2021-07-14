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

## Hierarchy

- **`Module`**

  ↳ [`Plugin`](plugin.md)

## Properties

### api

• `Optional` **api**: [`Api`](../modules/module.md#api)

Objects to bind to the framework.

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:28](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L28)

___

### apply

• `Optional` **apply**: `CallableFunction`

Webpack plugin apply.

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:38](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L38)

___

### boot

• `Optional` **boot**: [`Boot`](../modules/module.md#boot)

General purpose callback. Called after everything else.

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:23](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L23)

___

### make

• `Optional` **make**: [`Make`](../modules/module.md#make)<`Plugin`, `Options`\>

Returns an instantiated webpack plugin

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:33](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L33)

___

### name

• `Optional` **name**: `string` \| `number`

The module name

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:8](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L8)

___

### options

• `Optional` **options**: [`Options`](../modules/module.md#options)<`Options`\>

Options registered with the extension

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:13](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L13)

___

### register

• `Optional` **register**: [`Register`](../modules/module.md#register)

General purpose callback. Called first.

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:18](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L18)

___

### when

• `Optional` **when**: [`When`](../modules/module.md#when)<`Options`\>

Returns a boolean determining if
a webpack plugin should be used in
compilation.

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:45](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L45)
