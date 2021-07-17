---
id: "api.methods"
title: "Namespace: methods"
sidebar_label: "Api.methods"
custom_edit_url: null
---

[Api](api.md).methods

## Functions

### alias

▸ `Const` **alias**(`alias`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `alias` | { `alias`: `string` \| ``false`` \| `string`[] ; `name`: `string` ; `onlyModule?`: `boolean`  }[] \| { [index: string]: `string` \| ``false`` \| `string`[];  } |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/alias/index.d.ts:27

___

### config

▸ `Const` **config**(`config?`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | `any` |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/config/index.d.ts:39

___

### define

▸ `Const` **define**(`values`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `Record`<`string`, `CodeValue`\> |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/define.d.ts:24

___

### dev

▸ `Const` **dev**(`config?`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | `Configuration` |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/dev/index.d.ts:24

___

### devtool

▸ `Const` **devtool**(`devtool?`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `devtool?` | `string` \| ``false`` |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/devtool.d.ts:23

___

### entry

▸ `Const` **entry**(`name`, `entrypoint`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `entrypoint` | [`Value`](framework.api.entry.md#value) |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/entry.d.ts:87

▸ `Const` **entry**(`entrypoints`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entrypoints` | [`Input`](../interfaces/framework.api.entry.input.md) |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/entry.d.ts:87

___

### experiments

▸ `Const` **experiments**(`settings`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings` | `Experiments` |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/experiments/index.d.ts:24

___

### externals

▸ `Const` **externals**(`externals`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `externals` | `string` \| `RegExp` \| `ExternalItemObjectKnown` & `ExternalItemObjectUnknown` \| `ExternalItem`[] \| (`data`: `ExternalItemFunctionData`, `callback`: (`err?`: `Error`, `result?`: `string` \| `boolean` \| `string`[] \| { [index: string]: `any`;  }) => `void`) => `void` \| (`data`: `ExternalItemFunctionData`) => `Promise`<`ExternalItemValue`\> |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/externals/index.d.ts:25

___

### hash

▸ `Const` **hash**(`enabled?`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled?` | `boolean` |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/hash/index.d.ts:21

___

### minimize

▸ `Const` **minimize**(`enabled?`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled?` | `boolean` |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/minimize.d.ts:35

___

### persist

▸ `Const` **persist**(`enabled?`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled?` | `boolean` |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/persist.d.ts:23

___

### provide

▸ `Const` **provide**(`packages?`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `packages?` | [`Provided`](../interfaces/framework.api.provided.md) |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/provide.d.ts:27

___

### proxy

▸ `Const` **proxy**(`config?`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | `Object` | - |
| `config.enabled?` | `boolean` | Explicity enable or disable proxy service |
| `config.host?` | `string` | Hostname of the proxy target |
| `config.port?` | `number` | Port of the proxy target |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/proxy.d.ts:53

___

### publicPath

▸ `Const` **publicPath**(): `string`

#### Returns

`string`

#### Defined in

packages/@roots/bud-api/types/methods/publicPath.d.ts:25

___

### run

▸ `Const` **run**(): `void`

#### Returns

`void`

#### Defined in

packages/@roots/bud-api/types/methods/run.d.ts:21

___

### runtime

▸ `Const` **runtime**(`runtime?`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `runtime?` | `boolean` \| ``"single"`` \| ``"multiple"`` \| { `name?`: `string` \| `Function`  } |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/runtime.d.ts:24

___

### setPath

▸ `Const` **setPath**(`name`, `path?`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `any` |
| `path?` | `string` |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/setPath.d.ts:26

▸ `Const` **setPath**(`paths`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `paths` | `any` |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/setPath.d.ts:26

___

### setPublicPath

▸ `Const` **setPublicPath**(`publicPath`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicPath` | `string` \| (`publicPath`: `string`) => `string` |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/setPublicPath.d.ts:33

___

### splitChunks

▸ `Const` **splitChunks**(`options?`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | ``false`` \| `OptimizationSplitChunksOptions` |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/splitChunks.d.ts:27

___

### template

▸ `Const` **template**(`options?`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`Options`](../interfaces/framework.api.options.md) |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/template/index.d.ts:48

___

### use

▸ `Const` **use**(`source`): [`Framework`](../classes/framework.md)

bud.use method

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`Input`](framework.api.md#input) |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/use/index.d.ts:45

___

### watch

▸ `Const` **watch**(`files`, `options?`): [`Framework`](../classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `files` | `string`[] |
| `options?` | `WatchOptions` |

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

packages/@roots/bud-api/types/methods/watch.d.ts:23
