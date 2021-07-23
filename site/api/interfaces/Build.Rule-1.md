---
id: "Build.Rule-1"
title: "Interface: Rule"
sidebar_label: "Rule"
custom_edit_url: null
---

[Build](../namespaces/Build.md).Rule

**`interface`** Build.Rule

Wrapper for {@link RuleSetRule}

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

[packages/@roots/bud-framework/src/Build.ts:96](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L96)

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

[packages/@roots/bud-framework/src/Build.ts:108](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L108)

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

[packages/@roots/bud-framework/src/Build.ts:104](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L104)

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

[packages/@roots/bud-framework/src/Build.ts:88](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L88)

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

[packages/@roots/bud-framework/src/Build.ts:100](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L100)

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

[packages/@roots/bud-framework/src/Build.ts:92](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L92)

___

### make

▸ **make**(`app`): `RuleSetRule` \| [`Output`](Build.Rule.Output.md)

Returns final {@link RuleSetRule} for inclusion in [Build.config](Build.md#config)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`RuleSetRule` \| [`Output`](Build.Rule.Output.md)

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:115](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L115)

___

### setExclude

▸ **setExclude**(`exclude`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `exclude` | `RegExp` \| [`ExcludeFn`](../namespaces/Build.Rule.md#excludefn) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:98](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L98)

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

[packages/@roots/bud-framework/src/Build.ts:110](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L110)

___

### setParser

▸ **setParser**(`parser`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parser` | [`Parser`](Build.Rule.Parser.md) \| [`ParserFn`](../namespaces/Build.Rule.md#parserfn) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:106](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L106)

___

### setTest

▸ **setTest**(`test`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | `RegExp` \| [`TestFn`](../namespaces/Build.Rule.md#testfn) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:90](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L90)

___

### setType

▸ **setType**(`type`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` \| [`TypeFn`](../namespaces/Build.Rule.md#typefn) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:102](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L102)

___

### setUse

▸ **setUse**(`use`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `use` | [`UseFn`](../namespaces/Build.Rule.md#usefn) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:94](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L94)

___

### test

▸ `Optional` **test**(`app?`): `string` \| `RegExp` \| (`value`: `string`) => `boolean` \| `RuleSetLogicalConditionsAbsolute` \| `RuleSetConditionAbsolute`[]

Wrapping {@link RuleSetRule.test}

#### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/Framework.md) |

#### Returns

`string` \| `RegExp` \| (`value`: `string`) => `boolean` \| `RuleSetLogicalConditionsAbsolute` \| `RuleSetConditionAbsolute`[]

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:80](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L80)

___

### use

▸ `Optional` **use**(`app?`): [`Item`](Build.Item-1.md)[]

Returns an array of [Build.Item](Build.Item-1.md) values, each of which
can be built with [Build.Item.make](Build.Item-1.md#make) to produce {@link RuleSetRule.use} compatible output.

#### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/Framework.md) |

#### Returns

[`Item`](Build.Item-1.md)[]

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:86](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L86)
