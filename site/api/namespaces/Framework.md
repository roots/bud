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

[packages/@roots/bud-framework/src/Framework/index.ts:249](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L249)

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

[packages/@roots/bud-framework/src/Framework/index.ts:224](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L224)

___

### Mode

Ƭ **Mode**: ``"production"`` \| ``"development"``

Compilation mode

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:229](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L229)

___

### Tapable

Ƭ **Tapable**<`I`\>: (`app`: [`Framework`](../classes/Framework.md)) => `I` \| (`this`: [`Framework`](../classes/Framework.md), `app?`: [`Framework`](../classes/Framework.md)) => `I`

Callback which accepts Framework as a parameter

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `any` |

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:284](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L284)
