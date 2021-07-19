---
id: "Extensions.Plugin"
title: "Interface: Plugin<Plugin, Options>"
sidebar_label: "Plugin"
custom_edit_url: null
---

[Extensions](../modules/Extensions.md).Plugin

## Type parameters

| Name | Type |
| :------ | :------ |
| `Plugin` | `any` |
| `Options` | `any` |

## Hierarchy

- [`Module`](Extensions.Module-1.md)

  ↳ **`Plugin`**

## Properties

### api

• `Optional` **api**: [`Api`](../modules/Extensions.Module.md#api)

Objects to bind to the framework.

#### Inherited from

[Module](Extensions.Module-1.md).[api](Extensions.Module-1.md#api)

#### Defined in

[bud-framework/src/Extensions/Module.ts:28](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L28)

___

### apply

• `Optional` **apply**: `CallableFunction`

Webpack plugin apply.

#### Inherited from

[Module](Extensions.Module-1.md).[apply](Extensions.Module-1.md#apply)

#### Defined in

[bud-framework/src/Extensions/Module.ts:38](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L38)

___

### boot

• `Optional` **boot**: [`Boot`](../modules/Extensions.Module.md#boot)

General purpose callback. Called after everything else.

#### Inherited from

[Module](Extensions.Module-1.md).[boot](Extensions.Module-1.md#boot)

#### Defined in

[bud-framework/src/Extensions/Module.ts:23](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L23)

___

### make

• **make**: [`Make`](../modules/Extensions.Module.md#make)<`Plugin`, `Options`\>

Returns an instantiated webpack plugin

#### Overrides

[Module](Extensions.Module-1.md).[make](Extensions.Module-1.md#make)

#### Defined in

[bud-framework/src/Extensions/Plugin.ts:5](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Plugin.ts#L5)

___

### name

• `Optional` **name**: `string` \| `number`

The module name

#### Inherited from

[Module](Extensions.Module-1.md).[name](Extensions.Module-1.md#name)

#### Defined in

[bud-framework/src/Extensions/Module.ts:8](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L8)

___

### options

• `Optional` **options**: [`Options`](../modules/Extensions.Module.md#options)<`Options`\>

Options registered with the extension

#### Overrides

[Module](Extensions.Module-1.md).[options](Extensions.Module-1.md#options)

#### Defined in

[bud-framework/src/Extensions/Plugin.ts:4](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Plugin.ts#L4)

___

### register

• `Optional` **register**: [`Register`](../modules/Extensions.Module.md#register)

General purpose callback. Called first.

#### Inherited from

[Module](Extensions.Module-1.md).[register](Extensions.Module-1.md#register)

#### Defined in

[bud-framework/src/Extensions/Module.ts:18](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L18)

___

### when

• `Optional` **when**: [`When`](../modules/Extensions.Module.md#when)<`any`\>

Returns a boolean determining if
a webpack plugin should be used in
compilation.

#### Inherited from

[Module](Extensions.Module-1.md).[when](Extensions.Module-1.md#when)

#### Defined in

[bud-framework/src/Extensions/Module.ts:45](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L45)
