---
id: "Plugin"
title: "Interface: Plugin<Plugin, Options>"
sidebar_label: "Plugin"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `Plugin` | `any` |
| `Options` | `any` |

## Hierarchy

- [`Module`](Module.md)

  ↳ **`Plugin`**

## Properties

### api

• `Optional` **api**: [`Api`](../namespaces/Module.md#api)

Objects to bind to the framework.

#### Inherited from

[Module](Module.md).[api](Module.md#api)

#### Defined in

packages/@roots/bud-framework/types/Module.d.ts:26

___

### apply

• `Optional` **apply**: `CallableFunction`

Webpack plugin apply.

#### Overrides

[Module](Module.md).[apply](Module.md#apply)

#### Defined in

packages/@roots/bud-framework/types/Plugin.d.ts:10

___

### boot

• `Optional` **boot**: [`Boot`](../namespaces/Module.md#boot)

General purpose callback. Called after everything else.

#### Inherited from

[Module](Module.md).[boot](Module.md#boot)

#### Defined in

packages/@roots/bud-framework/types/Module.d.ts:22

___

### make

• `Optional` **make**: [`Make`](../namespaces/Module.md#make)<`Plugin`, `Options`\>

Returns an instantiated webpack plugin

#### Overrides

[Module](Module.md).[make](Module.md#make)

#### Defined in

packages/@roots/bud-framework/types/Plugin.d.ts:6

___

### name

• `Optional` **name**: `string` \| `number`

The module name

#### Inherited from

[Module](Module.md).[name](Module.md#name)

#### Defined in

packages/@roots/bud-framework/types/Module.d.ts:10

___

### options

• `Optional` **options**: `any`

Options registered to the extension module

#### Inherited from

[Module](Module.md).[options](Module.md#options)

#### Defined in

packages/@roots/bud-framework/types/Module.d.ts:14

___

### register

• `Optional` **register**: [`Register`](../namespaces/Module.md#register)

General purpose callback. Called first.

#### Inherited from

[Module](Module.md).[register](Module.md#register)

#### Defined in

packages/@roots/bud-framework/types/Module.d.ts:18

___

### when

• `Optional` **when**: [`When`](../namespaces/Module.md#when)<`Options`\>

Returns a boolean determining if a webpack plugin should be used in compilation.

#### Overrides

[Module](Module.md).[when](Module.md#when)

#### Defined in

packages/@roots/bud-framework/types/Plugin.d.ts:14
