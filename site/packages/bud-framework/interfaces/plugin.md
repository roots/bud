---
id: "plugin"
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

- [`Module`](module.md)

  ↳ **`Plugin`**

## Properties

### api

• `Optional` **api**: [`Api`](../modules/module.md#api)

Objects to bind to the framework.

#### Inherited from

[Module](module.md).[api](module.md#api)

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:28](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L28)

___

### apply

• `Optional` **apply**: `CallableFunction`

Webpack plugin apply.

#### Inherited from

[Module](module.md).[apply](module.md#apply)

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:38](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L38)

___

### boot

• `Optional` **boot**: [`Boot`](../modules/module.md#boot)

General purpose callback. Called after everything else.

#### Inherited from

[Module](module.md).[boot](module.md#boot)

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:23](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L23)

___

### make

• **make**: [`Make`](../modules/module.md#make)<`Plugin`, `Options`\>

Returns an instantiated webpack plugin

#### Overrides

[Module](module.md).[make](module.md#make)

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Plugin.ts:5](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Plugin.ts#L5)

___

### name

• `Optional` **name**: `string` \| `number`

The module name

#### Inherited from

[Module](module.md).[name](module.md#name)

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:8](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L8)

___

### options

• `Optional` **options**: [`Options`](../modules/module.md#options)<`Options`\>

Options registered with the extension

#### Overrides

[Module](module.md).[options](module.md#options)

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Plugin.ts:4](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Plugin.ts#L4)

___

### register

• `Optional` **register**: [`Register`](../modules/module.md#register)

General purpose callback. Called first.

#### Inherited from

[Module](module.md).[register](module.md#register)

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:18](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L18)

___

### when

• `Optional` **when**: [`When`](../modules/module.md#when)<`any`\>

Returns a boolean determining if
a webpack plugin should be used in
compilation.

#### Inherited from

[Module](module.md).[when](module.md#when)

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:45](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L45)
