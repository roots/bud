---
id: "Build.Rule-1"
title: "Interface: Rule"
sidebar_label: "Rule"
custom_edit_url: null
---

[Build](../modules/Build.md).Rule

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

[packages/@roots/bud-framework/src/Build.ts:95](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Build.ts#L95)

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

[packages/@roots/bud-framework/src/Build.ts:107](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Build.ts#L107)

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

[packages/@roots/bud-framework/src/Build.ts:103](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Build.ts#L103)

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

[packages/@roots/bud-framework/src/Build.ts:87](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Build.ts#L87)

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

[packages/@roots/bud-framework/src/Build.ts:99](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Build.ts#L99)

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

[packages/@roots/bud-framework/src/Build.ts:91](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Build.ts#L91)

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

[packages/@roots/bud-framework/src/Build.ts:114](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Build.ts#L114)

___

### setExclude

▸ **setExclude**(`exclude`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `exclude` | `RegExp` \| [`ExcludeFn`](../modules/Build.Rule.md#excludefn) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:97](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Build.ts#L97)

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

[packages/@roots/bud-framework/src/Build.ts:109](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Build.ts#L109)

___

### setParser

▸ **setParser**(`parser`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parser` | [`Parser`](Build.Rule.Parser.md) \| [`ParserFn`](../modules/Build.Rule.md#parserfn) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:105](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Build.ts#L105)

___

### setTest

▸ **setTest**(`test`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | `RegExp` \| [`TestFn`](../modules/Build.Rule.md#testfn) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:89](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Build.ts#L89)

___

### setType

▸ **setType**(`type`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` \| [`TypeFn`](../modules/Build.Rule.md#typefn) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:101](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Build.ts#L101)

___

### setUse

▸ **setUse**(`use`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `use` | [`UseFn`](../modules/Build.Rule.md#usefn) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:93](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Build.ts#L93)

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

[packages/@roots/bud-framework/src/Build.ts:79](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Build.ts#L79)

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

[packages/@roots/bud-framework/src/Build.ts:85](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Build.ts#L85)
