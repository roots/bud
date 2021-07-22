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

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:74](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Service.ts#L74)

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

[packages/@roots/bud-framework/src/Extensions.ts:17](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extensions.ts#L17)

___

### make

▸ **make**(): [`PluginOutput`](../modules/Extensions.md#pluginoutput)[]

Produce Webpack Plugins

#### Returns

[`PluginOutput`](../modules/Extensions.md#pluginoutput)[]

#### Defined in

[packages/@roots/bud-framework/src/Extensions.ts:22](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extensions.ts#L22)
