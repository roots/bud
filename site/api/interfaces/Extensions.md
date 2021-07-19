---
id: "Extensions"
title: "Interface: Extensions"
sidebar_label: "Extensions"
sidebar_position: 0
custom_edit_url: null
---

**`interface`** Extensions

Extensions service

## Hierarchy

- [`Service`](../classes/Service.md)

  ↳ **`Extensions`**

## Properties

### name

• **name**: `string`

#### Inherited from

[Service](../classes/Service.md).[name](../classes/Service.md#name)

#### Defined in

bud-framework/src/Service.ts:60

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

bud-framework/src/Service.ts:64

## Methods

### add

▸ **add**(`extension`): `void`

Add an extension

#### Parameters

| Name | Type |
| :------ | :------ |
| `extension` | [`Module`](Module.md)<`any`, `any`\> |

#### Returns

`void`

#### Defined in

bud-framework/src/Extensions.ts:17

___

### make

▸ **make**(): [`PluginOutput`](../modules/Extensions.md#pluginoutput)[]

Produce Webpack Plugins

#### Returns

[`PluginOutput`](../modules/Extensions.md#pluginoutput)[]

#### Defined in

bud-framework/src/Extensions.ts:22
