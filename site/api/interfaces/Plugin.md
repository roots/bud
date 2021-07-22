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

[packages/@roots/bud-framework/src/Module.ts:39](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Module.ts#L39)

___

### apply

• `Optional` **apply**: `CallableFunction`

Webpack plugin apply.

#### Inherited from

[Module](Module.md).[apply](Module.md#apply)

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:49](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Module.ts#L49)

___

### boot

• `Optional` **boot**: [`Boot`](../modules/Module.md#boot)

General purpose callback. Called after everything else.

#### Inherited from

[Module](Module.md).[boot](Module.md#boot)

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:34](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Module.ts#L34)

___

### make

• **make**: [`Make`](../modules/Module.md#make)<`Plugin`, `Options`\>

Returns an instantiated webpack plugin

#### Overrides

[Module](Module.md).[make](Module.md#make)

#### Defined in

[packages/@roots/bud-framework/src/Plugin.ts:12](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Plugin.ts#L12)

___

### name

• `Optional` **name**: `string` \| `number`

The module name

#### Inherited from

[Module](Module.md).[name](Module.md#name)

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:19](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Module.ts#L19)

___

### options

• `Optional` **options**: [`Options`](../modules/Module.md#options)<`Options`\>

Options registered with the extension

#### Overrides

[Module](Module.md).[options](Module.md#options)

#### Defined in

[packages/@roots/bud-framework/src/Plugin.ts:11](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Plugin.ts#L11)

___

### register

• `Optional` **register**: [`Register`](../modules/Module.md#register)

General purpose callback. Called first.

#### Inherited from

[Module](Module.md).[register](Module.md#register)

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:29](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Module.ts#L29)

___

### when

• `Optional` **when**: [`When`](../modules/Module.md#when)<`any`\>

Returns a boolean determining if
a webpack plugin should be used in
compilation.

#### Inherited from

[Module](Module.md).[when](Module.md#when)

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:56](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Module.ts#L56)
