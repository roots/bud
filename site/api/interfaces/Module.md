---
id: "Module"
title: "Interface: Module<Plugin, Options>"
sidebar_label: "Module"
sidebar_position: 0
custom_edit_url: null
---

A [Framework](../classes/Framework.md) extension

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

• `Optional` **api**: [`Api`](../namespaces/Module.md#api)

Objects to bind to the framework.

#### Defined in

packages/@roots/bud-framework/types/Module.d.ts:26

___

### apply

• `Optional` **apply**: `CallableFunction`

Webpack plugin apply.

**`deprecated`** Convert this instance to a {@link Plugin Plugin}

#### Defined in

packages/@roots/bud-framework/types/Module.d.ts:38

___

### boot

• `Optional` **boot**: [`Boot`](../namespaces/Module.md#boot)

General purpose callback. Called after everything else.

#### Defined in

packages/@roots/bud-framework/types/Module.d.ts:22

___

### make

• `Optional` **make**: [`Make`](../namespaces/Module.md#make)<`Plugin`, `Options`\>

Returns an instantiated webpack plugin

**`deprecated`** Convert this instance to a {@link Plugin Plugin}

#### Defined in

packages/@roots/bud-framework/types/Module.d.ts:32

___

### name

• `Optional` **name**: `string` \| `number`

The module name

#### Defined in

packages/@roots/bud-framework/types/Module.d.ts:10

___

### options

• `Optional` **options**: [`Options`](../namespaces/Module.md#options)<`Options`\>

Options registered to the extension module

#### Defined in

packages/@roots/bud-framework/types/Module.d.ts:14

___

### register

• `Optional` **register**: [`Register`](../namespaces/Module.md#register)

General purpose callback. Called first.

#### Defined in

packages/@roots/bud-framework/types/Module.d.ts:18

___

### when

• `Optional` **when**: [`When`](../namespaces/Module.md#when)<`Options`\>

Returns a boolean determining if
a webpack plugin should be used in
compilation.

**`deprecated`** Convert this instance to a {@link Plugin Plugin}

#### Defined in

packages/@roots/bud-framework/types/Module.d.ts:46
