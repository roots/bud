---
id: "methods"
title: "Namespace: methods"
sidebar_label: "methods"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### alias

▸ `Const` **alias**(`alias`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `alias` | { `alias`: `string` \| ``false`` \| `string`[] ; `name`: `string` ; `onlyModule?`: `boolean`  }[] \| { [index: string]: `string` \| ``false`` \| `string`[];  } |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/alias/index.d.ts:27

___

### config

▸ `Const` **config**(`config?`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | `any` |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/config/index.d.ts:39

___

### define

▸ `Const` **define**(`values`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `Record`<`string`, `CodeValue`\> |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/define.d.ts:24

___

### dev

▸ `Const` **dev**(`config?`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | `Configuration` |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/dev/index.d.ts:24

___

### devtool

▸ `Const` **devtool**(`devtool?`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `devtool?` | `string` \| ``false`` |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/devtool.d.ts:23

___

### entry

▸ `Const` **entry**(`name`, `entrypoint`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `entrypoint` | `Value` |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/entry.d.ts:87

▸ `Const` **entry**(`entrypoints`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entrypoints` | `Input` |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/entry.d.ts:87

___

### experiments

▸ `Const` **experiments**(`settings`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings` | `Experiments` |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/experiments/index.d.ts:24

___

### externals

▸ `Const` **externals**(`externals`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `externals` | `string` \| `RegExp` \| `ExternalItemObjectKnown` & `ExternalItemObjectUnknown` \| `ExternalItem`[] \| (`data`: `ExternalItemFunctionData`, `callback`: (`err?`: `Error`, `result?`: `string` \| `boolean` \| `string`[] \| { [index: string]: `any`;  }) => `void`) => `void` \| (`data`: `ExternalItemFunctionData`) => `Promise`<`ExternalItemValue`\> |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/externals/index.d.ts:25

___

### hash

▸ `Const` **hash**(`enabled?`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled?` | `boolean` |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/hash/index.d.ts:21

___

### minimize

▸ `Const` **minimize**(`enabled?`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled?` | `boolean` |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/minimize.d.ts:35

___

### persist

▸ `Const` **persist**(`enabled?`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled?` | `boolean` |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/persist.d.ts:23

___

### provide

▸ `Const` **provide**(`packages?`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `packages?` | `Provided` |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/provide.d.ts:27

___

### proxy

▸ `Const` **proxy**(`config?`): `Framework`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | `Object` | - |
| `config.enabled?` | `boolean` | Explicity enable or disable proxy service |
| `config.host?` | `string` | Hostname of the proxy target |
| `config.port?` | `number` | Port of the proxy target |

#### Returns

`Framework`

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

▸ `Const` **runtime**(`runtime?`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `runtime?` | `boolean` \| ``"single"`` \| ``"multiple"`` \| { `name?`: `string` \| `Function`  } |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/runtime.d.ts:24

___

### setPath

▸ `Const` **setPath**(`name`, `path?`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `any` |
| `path?` | `string` |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/setPath.d.ts:26

▸ `Const` **setPath**(`paths`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `paths` | `any` |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/setPath.d.ts:26

___

### setPublicPath

▸ `Const` **setPublicPath**(`publicPath`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicPath` | `string` \| (`publicPath`: `string`) => `string` |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/setPublicPath.d.ts:33

___

### splitChunks

▸ `Const` **splitChunks**(`options?`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | ``false`` \| `OptimizationSplitChunksOptions` |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/splitChunks.d.ts:27

___

### template

▸ `Const` **template**(`options?`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Options` |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/template/index.d.ts:48

___

### use

▸ `Const` **use**(`source`): `Framework`

bud.use method

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `Input` |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/use/index.d.ts:45

___

### watch

▸ `Const` **watch**(`files`, `options?`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `files` | `string`[] |
| `options?` | `WatchOptions` |

#### Returns

`Framework`

#### Defined in

packages/@roots/bud-api/types/methods/watch.d.ts:23
