---
id: "Build.Item-1"
title: "Interface: Item"
sidebar_label: "Item"
custom_edit_url: null
---

[Build](../modules/Build.md).Item

**`interface`** Build.Item

## Methods

### make

▸ **make**(`app`): [`Output`](Build.Item.Output.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

[`Output`](Build.Item.Output.md)

#### Defined in

bud-framework/src/Build.ts:68

___

### mergeOptions

▸ **mergeOptions**(`options`, `app`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Options`](../modules/Build.Item.md#options) |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`void`

#### Defined in

bud-framework/src/Build.ts:66

___

### setLoader

▸ **setLoader**(`loader`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `loader` | (`app?`: [`Framework`](../classes/Framework.md)) => [`Loader`](Build.Loader-1.md) |

#### Returns

`void`

#### Defined in

bud-framework/src/Build.ts:62

___

### setOptions

▸ **setOptions**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | (`app?`: [`Framework`](../classes/Framework.md)) => [`Options`](../modules/Build.Item.md#options) |

#### Returns

`void`

#### Defined in

bud-framework/src/Build.ts:64
