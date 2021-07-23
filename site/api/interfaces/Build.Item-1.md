---
id: "Build.Item-1"
title: "Interface: Item"
sidebar_label: "Item"
custom_edit_url: null
---

[Build](../namespaces/Build.md).Item

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

[packages/@roots/bud-framework/src/Build.ts:68](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L68)

___

### mergeOptions

▸ **mergeOptions**(`options`, `app`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Options`](../namespaces/Build.Item.md#options) |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:63](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L63)

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

[packages/@roots/bud-framework/src/Build.ts:59](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L59)

___

### setOptions

▸ **setOptions**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`OptionsFn`](../namespaces/Build.Item.md#optionsfn) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:61](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L61)
