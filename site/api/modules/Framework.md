---
id: "Framework"
title: "Namespace: Framework"
sidebar_label: "Framework"
sidebar_position: 0
custom_edit_url: null
---

**`namespace`** Framework

## Interfaces

- [Extensions](../interfaces/Framework.Extensions.md)
- [Instances](../interfaces/Framework.Instances.md)
- [Options](../interfaces/Framework.Options.md)
- [Services](../interfaces/Framework.Services.md)

## Type aliases

### Constructor

Ƭ **Constructor**: (`options`: [`Options`](../interfaces/Framework.Options.md)) => [`Framework`](../classes/Framework.md)

#### Type declaration

• (`options`)

Framework Constructor

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Options`](../interfaces/Framework.Options.md) |

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:252](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Framework/index.ts#L252)

___

### Index

Ƭ **Index**<`T`\>: `Object`

Utility: Returns hash of a given object type

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Index signature

▪ [key: `string`]: `T`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:227](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Framework/index.ts#L227)

___

### Mode

Ƭ **Mode**: ``"production"`` \| ``"development"``

Compilation mode

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:232](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Framework/index.ts#L232)

___

### Tapable

Ƭ **Tapable**<`I`\>: (`app`: [`Framework`](../classes/Framework.md)) => `I` \| (`this`: [`Framework`](../classes/Framework.md), `app?`: [`Framework`](../classes/Framework.md)) => `I`

Callback which accepts Framework as a parameter

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `any` |

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:287](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Framework/index.ts#L287)
