---
id: "Build.Build-1.Rule-1"
title: "Interface: Rule"
sidebar_label: "Rule"
custom_edit_url: null
---

[Build](../modules/Build.md).[Build](../modules/Build.Build-1.md).Rule

## Methods

### getExclude

▸ **getExclude**(`app`): `RegExp`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.Framework-2.md) |

#### Returns

`RegExp`

#### Defined in

[bud-framework/src/Build/index.ts:79](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L79)

___

### getGenerator

▸ **getGenerator**(`app`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.Framework-2.md) |

#### Returns

`any`

#### Defined in

[bud-framework/src/Build/index.ts:91](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L91)

___

### getParser

▸ **getParser**(`app`): [`Parser`](Build.Build-1.Rule.Parser.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.Framework-2.md) |

#### Returns

[`Parser`](Build.Build-1.Rule.Parser.md)

#### Defined in

[bud-framework/src/Build/index.ts:87](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L87)

___

### getTest

▸ **getTest**(`app`): `RegExp`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.Framework-2.md) |

#### Returns

`RegExp`

#### Defined in

[bud-framework/src/Build/index.ts:71](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L71)

___

### getType

▸ **getType**(`app`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.Framework-2.md) |

#### Returns

`string`

#### Defined in

[bud-framework/src/Build/index.ts:83](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L83)

___

### getUse

▸ **getUse**(`app`): [`Item`](Build.Build-1.Item-1.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.Framework-2.md) |

#### Returns

[`Item`](Build.Build-1.Item-1.md)[]

#### Defined in

[bud-framework/src/Build/index.ts:75](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L75)

___

### make

▸ **make**(`app`): [`Output`](Build.Build-1.Rule.Output.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.Framework-2.md) |

#### Returns

[`Output`](Build.Build-1.Rule.Output.md)

#### Defined in

[bud-framework/src/Build/index.ts:95](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L95)

___

### setExclude

▸ **setExclude**(`exclude`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `exclude` | `RegExp` \| [`ExcludeFn`](../modules/Build.Build-1.Rule.md#excludefn) |

#### Returns

`void`

#### Defined in

[bud-framework/src/Build/index.ts:81](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L81)

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

[bud-framework/src/Build/index.ts:93](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L93)

___

### setParser

▸ **setParser**(`parser`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parser` | [`Parser`](Build.Build-1.Rule.Parser.md) \| [`ParserFn`](../modules/Build.Build-1.Rule.md#parserfn) |

#### Returns

`void`

#### Defined in

[bud-framework/src/Build/index.ts:89](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L89)

___

### setTest

▸ **setTest**(`test`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | `RegExp` \| [`TestFn`](../modules/Build.Build-1.Rule.md#testfn) |

#### Returns

`void`

#### Defined in

[bud-framework/src/Build/index.ts:73](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L73)

___

### setType

▸ **setType**(`type`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` \| [`TypeFn`](../modules/Build.Build-1.Rule.md#typefn) |

#### Returns

`void`

#### Defined in

[bud-framework/src/Build/index.ts:85](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L85)

___

### setUse

▸ **setUse**(`use`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `use` | [`UseFn`](../modules/Build.Build-1.Rule.md#usefn) |

#### Returns

`void`

#### Defined in

[bud-framework/src/Build/index.ts:77](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L77)
