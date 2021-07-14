---
id: "rule"
title: "Interface: Rule"
sidebar_label: "Rule"
sidebar_position: 0
custom_edit_url: null
---

## Methods

### getExclude

▸ **getExclude**(`app`): `RegExp`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/framework.md) |

#### Returns

`RegExp`

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:48](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L48)

___

### getGenerator

▸ **getGenerator**(`app`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/framework.md) |

#### Returns

`any`

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:60](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L60)

___

### getParser

▸ **getParser**(`app`): [`Parser`](../modules/rule.md#parser)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/framework.md) |

#### Returns

[`Parser`](../modules/rule.md#parser)

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:56](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L56)

___

### getTest

▸ **getTest**(`app`): `RegExp`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/framework.md) |

#### Returns

`RegExp`

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:40](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L40)

___

### getType

▸ **getType**(`app`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/framework.md) |

#### Returns

`string`

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:52](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L52)

___

### getUse

▸ **getUse**(`app`): [`Item`](item.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/framework.md) |

#### Returns

[`Item`](item.md)[]

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:44](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L44)

___

### make

▸ **make**(`app`): [`Output`](rule.output.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/framework.md) |

#### Returns

[`Output`](rule.output.md)

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:64](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L64)

___

### setExclude

▸ **setExclude**(`exclude`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `exclude` | `RegExp` \| [`ExcludeFn`](../modules/rule.md#excludefn) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:50](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L50)

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

[packages/@roots/bud-framework/src/Build/Rule.ts:62](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L62)

___

### setParser

▸ **setParser**(`parser`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parser` | [`Parser`](../modules/rule.md#parser) \| [`ParserFn`](../modules/rule.md#parserfn) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:58](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L58)

___

### setTest

▸ **setTest**(`test`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | `RegExp` \| [`TestFn`](../modules/rule.md#testfn) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:42](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L42)

___

### setType

▸ **setType**(`type`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` \| [`TypeFn`](../modules/rule.md#typefn) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:54](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L54)

___

### setUse

▸ **setUse**(`use`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `use` | [`UseFn`](../modules/rule.md#usefn) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:46](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L46)
