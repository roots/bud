---
id: "Extensions.Extensions-2"
title: "Interface: Extensions"
sidebar_label: "Extensions"
custom_edit_url: null
---

[Extensions](../modules/Extensions.md).Extensions

## Hierarchy

- [`Service`](../classes/Service.Service-1.md)

  ↳ **`Extensions`**

## Properties

### name

• **name**: `string`

#### Inherited from

[Service](../classes/Service.Service-1.md).[name](../classes/Service.Service-1.md#name)

#### Defined in

[bud-framework/src/Service/index.ts:51](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Service/index.ts#L51)

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.Framework-2.md)

#### Returns

[`Framework`](../classes/Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Service/index.ts:55](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Service/index.ts#L55)

## Methods

### add

▸ **add**(`extension`): `void`

Add an extension

#### Parameters

| Name | Type |
| :------ | :------ |
| `extension` | [`Module`](Extensions.Module-1.md)<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[bud-framework/src/Extensions/Extensions.ts:9](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Extensions.ts#L9)

___

### make

▸ **make**(): [`PluginOutput`](../modules/Extensions.Extensions-1.md#pluginoutput)[]

Produce Webpack Plugins

#### Returns

[`PluginOutput`](../modules/Extensions.Extensions-1.md#pluginoutput)[]

#### Defined in

[bud-framework/src/Extensions/Extensions.ts:14](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Extensions.ts#L14)
