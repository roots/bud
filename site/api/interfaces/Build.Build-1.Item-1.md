---
id: "Build.Build-1.Item-1"
title: "Interface: Item"
sidebar_label: "Item"
custom_edit_url: null
---

[Build](../modules/Build.md).[Build](../modules/Build.Build-1.md).Item

## Methods

### make

▸ **make**(`app`): [`Output`](Build.Build-1.Item.Output.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.Framework-2.md) |

#### Returns

[`Output`](Build.Build-1.Item.Output.md)

#### Defined in

[bud-framework/src/Build/index.ts:67](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L67)

___

### mergeOptions

▸ **mergeOptions**(`options`, `app`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Options`](../modules/Build.Build-1.Item.md#options) |
| `app` | [`Framework`](../classes/Framework.Framework-2.md) |

#### Returns

`void`

#### Defined in

[bud-framework/src/Build/index.ts:62](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L62)

___

### setLoader

▸ **setLoader**(`loader`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `loader` | (`app?`: [`Framework`](../classes/Framework.Framework-2.md)) => [`Loader`](Build.Build-1.Loader-1.md) |

#### Returns

`void`

#### Defined in

[bud-framework/src/Build/index.ts:58](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L58)

___

### setOptions

▸ **setOptions**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`OptionsFn`](../modules/Build.Build-1.Item.md#optionsfn) |

#### Returns

`void`

#### Defined in

[bud-framework/src/Build/index.ts:60](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L60)
