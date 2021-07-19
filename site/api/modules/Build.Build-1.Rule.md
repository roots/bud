---
id: "Build.Build-1.Rule"
title: "Namespace: Rule"
sidebar_label: "Rule"
custom_edit_url: null
---

[Build](Build.md).[Build](Build.Build-1.md).Rule

## Interfaces

- [Options](../interfaces/Build.Build-1.Rule.Options.md)
- [Output](../interfaces/Build.Build-1.Rule.Output.md)
- [Parser](../interfaces/Build.Build-1.Rule.Parser.md)

## Type aliases

### ExcludeFn

Ƭ **ExcludeFn**: (`app?`: [`Framework`](../classes/Framework.Framework-2.md)) => `RegExp`

#### Type declaration

▸ (`app?`): `RegExp`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/Framework.Framework-2.md) |

##### Returns

`RegExp`

#### Defined in

[bud-framework/src/Build/index.ts:125](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L125)

___

### GeneratorFn

Ƭ **GeneratorFn**: (`app?`: [`Framework`](../classes/Framework.Framework-2.md)) => `any`

#### Type declaration

▸ (`app?`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/Framework.Framework-2.md) |

##### Returns

`any`

#### Defined in

[bud-framework/src/Build/index.ts:133](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L133)

___

### ParserFn

Ƭ **ParserFn**: (`app?`: [`Framework`](../classes/Framework.Framework-2.md)) => [`Parser`](../interfaces/Build.Build-1.Rule.Parser.md)

#### Type declaration

▸ (`app?`): [`Parser`](../interfaces/Build.Build-1.Rule.Parser.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/Framework.Framework-2.md) |

##### Returns

[`Parser`](../interfaces/Build.Build-1.Rule.Parser.md)

#### Defined in

[bud-framework/src/Build/index.ts:131](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L131)

___

### TestFn

Ƭ **TestFn**: (`app?`: [`Framework`](../classes/Framework.Framework-2.md)) => `RegExp`

#### Type declaration

▸ (`app?`): `RegExp`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/Framework.Framework-2.md) |

##### Returns

`RegExp`

#### Defined in

[bud-framework/src/Build/index.ts:123](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L123)

___

### TypeFn

Ƭ **TypeFn**: (`app?`: [`Framework`](../classes/Framework.Framework-2.md)) => `string`

#### Type declaration

▸ (`app?`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/Framework.Framework-2.md) |

##### Returns

`string`

#### Defined in

[bud-framework/src/Build/index.ts:126](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L126)

___

### UseFn

Ƭ **UseFn**: (`app?`: [`Framework`](../classes/Framework.Framework-2.md)) => [`Item`](../interfaces/Build.Build-1.Item-1.md)[]

#### Type declaration

▸ (`app?`): [`Item`](../interfaces/Build.Build-1.Item-1.md)[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/Framework.Framework-2.md) |

##### Returns

[`Item`](../interfaces/Build.Build-1.Item-1.md)[]

#### Defined in

[bud-framework/src/Build/index.ts:124](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L124)
