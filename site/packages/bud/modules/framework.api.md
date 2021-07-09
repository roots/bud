---
id: "framework.api"
title: "Namespace: Api"
sidebar_label: "Api"
custom_edit_url: null
---

[Framework](framework.md).Api

## Namespaces

- [SplitChunks](framework.api.splitchunks.md)

## Type aliases

### Alias

Ƭ **Alias**: (`this`: [`Framework`](../classes/framework.md), `alias`: `Webpack.Configuration`[``"resolve"``][``"alias"``]) => [`Framework`](../classes/framework.md)

#### Type declaration

▸ (`this`, `alias`): [`Framework`](../classes/framework.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Framework`](../classes/framework.md) |
| `alias` | `Webpack.Configuration`[``"resolve"``][``"alias"``] |

##### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/alias/index.d.ts:24

___

### Config

Ƭ **Config**: (`config?`: `any`) => [`Framework`](../classes/framework.md)

#### Type declaration

▸ (`config?`): [`Framework`](../classes/framework.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | `any` |

##### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/config/index.d.ts:36

___

### Define

Ƭ **Define**: (`values`: { [key: string]: `Webpack.DefinePlugin`[``"definitions"``];  }) => [`Framework`](../classes/framework.md)

#### Type declaration

▸ (`values`): [`Framework`](../classes/framework.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `Object` |

##### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/define.d.ts:21

___

### Dev

Ƭ **Dev**: (`this`: [`Framework`](../classes/framework.md), `config?`: `Server.Configuration`) => [`Framework`](../classes/framework.md)

#### Type declaration

▸ (`this`, `config?`): [`Framework`](../classes/framework.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Framework`](../classes/framework.md) |
| `config?` | `Server.Configuration` |

##### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/dev/index.d.ts:21

___

### Input

Ƭ **Input**: `Module` \| `Module`[]

#### Defined in

packages/@roots/bud-api/types/methods/use/index.d.ts:38

___

### SplitChunks

Ƭ **SplitChunks**: (`options?`: [`Options`](framework.api.splitchunks.md#options)) => [`Framework`](../classes/framework.md)

#### Type declaration

▸ (`options?`): [`Framework`](../classes/framework.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`Options`](framework.api.splitchunks.md#options) |

##### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/splitChunks.d.ts:24

___

### Use

Ƭ **Use**: (`source`: [`Input`](framework.api.md#input)) => [`Framework`](../classes/framework.md)

#### Type declaration

▸ (`source`): [`Framework`](../classes/framework.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`Input`](framework.api.md#input) |

##### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/use/index.d.ts:39

___

### Watch

Ƭ **Watch**: (`files`: `Server.Configuration`[``"watch"``][``"files"``], `options?`: `Server.Configuration`[``"watch"``][``"options"``]) => [`Framework`](../classes/framework.md)

#### Type declaration

▸ (`files`, `options?`): [`Framework`](../classes/framework.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `files` | `Server.Configuration`[``"watch"``][``"files"``] |
| `options?` | `Server.Configuration`[``"watch"``][``"options"``] |

##### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/watch.d.ts:22
