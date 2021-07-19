---
id: "Plugin"
title: "Interface: Plugin<Plugin, Options>"
sidebar_label: "Plugin"
sidebar_position: 0
custom_edit_url: null
---

**`interface`** Plugin

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

• `Optional` **api**: [`Api`](../modules/Module.md#api)

Objects to bind to the framework.

#### Inherited from

[Module](Module.md).[api](Module.md#api)

#### Defined in

bud-framework/src/Module.ts:35

___

### apply

• `Optional` **apply**: `CallableFunction`

Webpack plugin apply.

#### Inherited from

[Module](Module.md).[apply](Module.md#apply)

#### Defined in

bud-framework/src/Module.ts:45

___

### boot

• `Optional` **boot**: [`Boot`](../modules/Module.md#boot)

General purpose callback. Called after everything else.

#### Inherited from

[Module](Module.md).[boot](Module.md#boot)

#### Defined in

bud-framework/src/Module.ts:30

___

### make

• **make**: [`Make`](../modules/Module.md#make)<`Plugin`, `Options`\>

Returns an instantiated webpack plugin

#### Overrides

[Module](Module.md).[make](Module.md#make)

#### Defined in

bud-framework/src/Plugin.ts:8

___

### name

• `Optional` **name**: `string` \| `number`

The module name

#### Inherited from

[Module](Module.md).[name](Module.md#name)

#### Defined in

bud-framework/src/Module.ts:15

___

### options

• `Optional` **options**: [`Options`](../modules/Module.md#options)<`Options`\>

Options registered with the extension

#### Overrides

[Module](Module.md).[options](Module.md#options)

#### Defined in

bud-framework/src/Plugin.ts:7

___

### register

• `Optional` **register**: [`Register`](../modules/Module.md#register)

General purpose callback. Called first.

#### Inherited from

[Module](Module.md).[register](Module.md#register)

#### Defined in

bud-framework/src/Module.ts:25

___

### when

• `Optional` **when**: [`When`](../modules/Module.md#when)<`any`\>

Returns a boolean determining if
a webpack plugin should be used in
compilation.

#### Inherited from

[Module](Module.md).[when](Module.md#when)

#### Defined in

bud-framework/src/Module.ts:52
