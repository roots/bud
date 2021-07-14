---
id: "framework.api"
title: "Namespace: Api"
sidebar_label: "Api"
custom_edit_url: null
---

[Framework](framework.md).Api

## Namespaces

- [SplitChunks](framework.api.splitchunks.md)

## Interfaces

- [Options](../interfaces/framework.api.options.md)
- [Provided](../interfaces/framework.api.provided.md)

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

Ƭ **Define**: (`this`: [`Framework`](../classes/framework.md), `values`: `DefinePlugin`[``"definitions"``]) => [`Framework`](../classes/framework.md)

#### Type declaration

▸ (`this`, `values`): [`Framework`](../classes/framework.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Framework`](../classes/framework.md) |
| `values` | `DefinePlugin`[``"definitions"``] |

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

### Experiments

Ƭ **Experiments**: (`this`: [`Framework`](../classes/framework.md), `settings`: `Webpack.Configuration`[``"experiments"``]) => [`Framework`](../classes/framework.md)

#### Type declaration

▸ (`this`, `settings`): [`Framework`](../classes/framework.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Framework`](../classes/framework.md) |
| `settings` | `Webpack.Configuration`[``"experiments"``] |

##### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/experiments/index.d.ts:21

___

### Input

Ƭ **Input**: `Module` \| `Module`[]

#### Defined in

packages/@roots/bud-api/types/methods/use/index.d.ts:38

___

### Persist

Ƭ **Persist**: (`this`: [`Framework`](../classes/framework.md), `enabled?`: `boolean`) => [`Framework`](../classes/framework.md)

#### Type declaration

▸ (`this`, `enabled?`): [`Framework`](../classes/framework.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Framework`](../classes/framework.md) |
| `enabled?` | `boolean` |

##### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/persist.d.ts:20

___

### Provide

Ƭ **Provide**: (`this`: [`Framework`](../classes/framework.md), `packages?`: [`Provided`](../interfaces/framework.api.provided.md)) => [`Framework`](../classes/framework.md)

#### Type declaration

▸ (`this`, `packages?`): [`Framework`](../classes/framework.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Framework`](../classes/framework.md) |
| `packages?` | [`Provided`](../interfaces/framework.api.provided.md) |

##### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/provide.d.ts:21

___

### Run

Ƭ **Run**: (`this`: [`Framework`](../classes/framework.md)) => `void`

#### Type declaration

▸ (`this`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Framework`](../classes/framework.md) |

##### Returns

`void`

#### Defined in

packages/@roots/bud-api/types/methods/run.d.ts:18

___

### Runtime

Ƭ **Runtime**: (`this`: [`Framework`](../classes/framework.md), `runtime?`: `Webpack.Configuration`[``"optimization"``][``"runtimeChunk"``]) => [`Framework`](../classes/framework.md)

#### Type declaration

▸ (`this`, `runtime?`): [`Framework`](../classes/framework.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Framework`](../classes/framework.md) |
| `runtime?` | `Webpack.Configuration`[``"optimization"``][``"runtimeChunk"``] |

##### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/runtime.d.ts:21

___

### SplitChunks

Ƭ **SplitChunks**: (`this`: [`Framework`](../classes/framework.md), `options?`: [`Options`](framework.api.splitchunks.md#options)) => [`Framework`](../classes/framework.md)

#### Type declaration

▸ (`this`, `options?`): [`Framework`](../classes/framework.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Framework`](../classes/framework.md) |
| `options?` | [`Options`](framework.api.splitchunks.md#options) |

##### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/splitChunks.d.ts:21

___

### Template

Ƭ **Template**: (`this`: [`Framework`](../classes/framework.md), `options?`: [`Options`](../interfaces/framework.api.options.md)) => [`Framework`](../classes/framework.md)

#### Type declaration

▸ (`this`, `options?`): [`Framework`](../classes/framework.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Framework`](../classes/framework.md) |
| `options?` | [`Options`](../interfaces/framework.api.options.md) |

##### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/template/index.d.ts:27

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
