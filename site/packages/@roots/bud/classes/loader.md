---
id: "loader"
title: "Class: Loader"
sidebar_label: "Loader"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Base`

  ↳ **`Loader`**

## Implements

- `Loader`

## Constructors

### constructor

• **new Loader**(`src`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `Input` |

#### Overrides

Base.constructor

#### Defined in

packages/@roots/bud-build/types/Loader/index.d.ts:4

## Properties

### src

• `Protected` **src**: `Src`

#### Defined in

packages/@roots/bud-build/types/Loader/index.d.ts:4

## Methods

### make

▸ **make**(`app`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Returns

`string`

#### Implementation of

Build.Loader.make

#### Defined in

packages/@roots/bud-build/types/Loader/index.d.ts:6

___

### normalizeInput

▸ **normalizeInput**<`T`\>(`input`): (`app`: [`Framework`](framework.md)) => `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `T` \| (`app`: [`Framework`](framework.md)) => `T` |

#### Returns

`fn`

▸ (`app`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

##### Returns

`T`

#### Inherited from

Base.normalizeInput

#### Defined in

packages/@roots/bud-build/types/shared/Base.d.ts:3
