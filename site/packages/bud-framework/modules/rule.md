---
id: "rule"
title: "Namespace: Rule"
sidebar_label: "Rule"
sidebar_position: 0
custom_edit_url: null
---

## Interfaces

- [Options](../interfaces/rule.options.md)
- [Output](../interfaces/rule.output.md)

## Type aliases

### ExcludeFn

Ƭ **ExcludeFn**: (`app?`: [`Framework`](../classes/framework.md)) => `RegExp`

#### Type declaration

▸ (`app?`): `RegExp`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/framework.md) |

##### Returns

`RegExp`

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:7](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L7)

___

### GeneratorFn

Ƭ **GeneratorFn**: (`app?`: [`Framework`](../classes/framework.md)) => `any`

#### Type declaration

▸ (`app?`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/framework.md) |

##### Returns

`any`

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:15](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L15)

___

### Parser

Ƭ **Parser**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `parse` | (`input?`: `string`) => `any` |

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:10](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L10)

___

### ParserFn

Ƭ **ParserFn**: (`app?`: [`Framework`](../classes/framework.md)) => [`Parser`](rule.md#parser)

#### Type declaration

▸ (`app?`): [`Parser`](rule.md#parser)

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/framework.md) |

##### Returns

[`Parser`](rule.md#parser)

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:13](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L13)

___

### TestFn

Ƭ **TestFn**: (`app?`: [`Framework`](../classes/framework.md)) => `RegExp`

#### Type declaration

▸ (`app?`): `RegExp`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/framework.md) |

##### Returns

`RegExp`

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:5](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L5)

___

### TypeFn

Ƭ **TypeFn**: (`app?`: [`Framework`](../classes/framework.md)) => `string`

#### Type declaration

▸ (`app?`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/framework.md) |

##### Returns

`string`

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:8](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L8)

___

### UseFn

Ƭ **UseFn**: (`app?`: [`Framework`](../classes/framework.md)) => [`Item`](../interfaces/item.md)[]

#### Type declaration

▸ (`app?`): [`Item`](../interfaces/item.md)[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `app?` | [`Framework`](../classes/framework.md) |

##### Returns

[`Item`](../interfaces/item.md)[]

#### Defined in

[packages/@roots/bud-framework/src/Build/Rule.ts:6](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Build/Rule.ts#L6)
