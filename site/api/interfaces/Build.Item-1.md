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

[packages/@roots/bud-framework/src/Build.ts:67](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Build.ts#L67)

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

[packages/@roots/bud-framework/src/Build.ts:62](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Build.ts#L62)

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

[packages/@roots/bud-framework/src/Build.ts:58](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Build.ts#L58)

___

### setOptions

▸ **setOptions**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`OptionsFn`](../modules/Build.Item.md#optionsfn) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:60](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Build.ts#L60)
