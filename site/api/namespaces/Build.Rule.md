---
id: "Build.Rule"
title: "Namespace: Rule"
sidebar_label: "Rule"
custom_edit_url: null
---

[Build](Build.md).Rule

**`namespace`** Build.Rule

## Interfaces

- [Options](../interfaces/Build.Rule.Options.md)
- [Output](../interfaces/Build.Rule.Output.md)
- [Parser](../interfaces/Build.Rule.Parser.md)

## Type aliases

### ExcludeFn

Ƭ **ExcludeFn**: (`app?`: [`Framework`](../classes/Framework.md)) => `RegExp`

#### Type declaration

▸ (`app?`): `RegExp`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/Framework.md) |

##### Returns

`RegExp`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:152](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L152)

___

### GeneratorFn

Ƭ **GeneratorFn**: (`app?`: [`Framework`](../classes/Framework.md)) => `any`

#### Type declaration

▸ (`app?`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/Framework.md) |

##### Returns

`any`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:160](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L160)

___

### ParserFn

Ƭ **ParserFn**: (`app?`: [`Framework`](../classes/Framework.md)) => [`Parser`](../interfaces/Build.Rule.Parser.md)

#### Type declaration

▸ (`app?`): [`Parser`](../interfaces/Build.Rule.Parser.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/Framework.md) |

##### Returns

[`Parser`](../interfaces/Build.Rule.Parser.md)

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:158](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L158)

___

### TestFn

Ƭ **TestFn**: (`app?`: [`Framework`](../classes/Framework.md)) => `RegExp`

#### Type declaration

▸ (`app?`): `RegExp`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/Framework.md) |

##### Returns

`RegExp`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:150](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L150)

___

### TypeFn

Ƭ **TypeFn**: (`app?`: [`Framework`](../classes/Framework.md)) => `string`

#### Type declaration

▸ (`app?`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/Framework.md) |

##### Returns

`string`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:153](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L153)

___

### UseFn

Ƭ **UseFn**: (`app?`: [`Framework`](../classes/Framework.md)) => [`Item`](../interfaces/Build.Item-1.md)[]

#### Type declaration

▸ (`app?`): [`Item`](../interfaces/Build.Item-1.md)[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/Framework.md) |

##### Returns

[`Item`](../interfaces/Build.Item-1.md)[]

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:151](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Build.ts#L151)
