---
id: "Build.Rule-1"
title: "Interface: Rule"
sidebar_label: "Rule"
custom_edit_url: null
---

[Build](../modules/Build.md).Rule

**`interface`** Build.Rule

## Methods

### getExclude

▸ **getExclude**(`app`): `RegExp`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`RegExp`

#### Defined in

bud-framework/src/Build.ts:83

___

### getGenerator

▸ **getGenerator**(`app`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`any`

#### Defined in

bud-framework/src/Build.ts:99

___

### getParser

▸ **getParser**(`app`): [`Parser`](Build.Rule.Parser.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

[`Parser`](Build.Rule.Parser.md)

#### Defined in

bud-framework/src/Build.ts:93

___

### getTest

▸ **getTest**(`app`): `RegExp`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`RegExp`

#### Defined in

bud-framework/src/Build.ts:75

___

### getType

▸ **getType**(`app`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`string`

#### Defined in

bud-framework/src/Build.ts:89

___

### getUse

▸ **getUse**(`app`): [`Item`](Build.Item-1.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

[`Item`](Build.Item-1.md)[]

#### Defined in

bud-framework/src/Build.ts:79

___

### make

▸ **make**(`app`): [`Output`](Build.Rule.Output.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

[`Output`](Build.Rule.Output.md)

#### Defined in

bud-framework/src/Build.ts:105

___

### setExclude

▸ **setExclude**(`exclude`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `exclude` | `RegExp` \| (`app?`: [`Framework`](../classes/Framework.md)) => `RegExp` |

#### Returns

`void`

#### Defined in

bud-framework/src/Build.ts:85

___

### setGenerator

▸ **setGenerator**(`Generator`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `Generator` | `any` |

#### Returns

`void`

#### Defined in

bud-framework/src/Build.ts:101

___

### setParser

▸ **setParser**(`parser`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parser` | [`Parser`](Build.Rule.Parser.md) \| (`app?`: [`Framework`](../classes/Framework.md)) => [`Parser`](Build.Rule.Parser.md) |

#### Returns

`void`

#### Defined in

bud-framework/src/Build.ts:95

___

### setTest

▸ **setTest**(`test`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | `RegExp` \| (`app?`: [`Framework`](../classes/Framework.md)) => `RegExp` |

#### Returns

`void`

#### Defined in

bud-framework/src/Build.ts:77

___

### setType

▸ **setType**(`type`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` \| (`app?`: [`Framework`](../classes/Framework.md)) => `string` |

#### Returns

`void`

#### Defined in

bud-framework/src/Build.ts:91

___

### setUse

▸ **setUse**(`use`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `use` | (`app?`: [`Framework`](../classes/Framework.md)) => [`Item`](Build.Item-1.md)[] |

#### Returns

`void`

#### Defined in

bud-framework/src/Build.ts:81
