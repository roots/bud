---
id: "item"
title: "Class: Item"
sidebar_label: "Item"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Base`

  ↳ **`Item`**

## Implements

- `Item`

## Constructors

### constructor

• **new Item**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `ConstructorOptions` |

#### Overrides

Base.constructor

#### Defined in

bud-build/types/Item/index.d.ts:5

## Properties

### loader

• `Protected` **loader**: `LoaderFn`

#### Defined in

bud-build/types/Item/index.d.ts:4

___

### options

• `Protected` **options**: `OptionsFn`

#### Defined in

bud-build/types/Item/index.d.ts:5

## Methods

### getLoader

▸ **getLoader**(`app`): `Loader`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Framework` |

#### Returns

`Loader`

#### Defined in

bud-build/types/Item/index.d.ts:7

___

### make

▸ **make**(`app`): `Output`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Framework` |

#### Returns

`Output`

#### Implementation of

Build.Item.make

#### Defined in

bud-build/types/Item/index.d.ts:11

___

### mergeOptions

▸ **mergeOptions**(`options`, `app`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Options` |
| `app` | `Framework` |

#### Returns

`void`

#### Implementation of

Build.Item.mergeOptions

#### Defined in

bud-build/types/Item/index.d.ts:10

___

### normalizeInput

▸ **normalizeInput**<`T`\>(`input`): (`app`: `Framework`) => `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `T` \| (`app`: `Framework`) => `T` |

#### Returns

`fn`

▸ (`app`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Framework` |

##### Returns

`T`

#### Inherited from

Base.normalizeInput

#### Defined in

bud-build/types/shared/Base.d.ts:3

___

### setLoader

▸ **setLoader**(`loader`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `loader` | `Loader` \| `LoaderFn` |

#### Returns

`void`

#### Implementation of

Build.Item.setLoader

#### Defined in

bud-build/types/Item/index.d.ts:8

___

### setOptions

▸ **setOptions**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `OptionsFn` \| `Options` |

#### Returns

`void`

#### Implementation of

Build.Item.setOptions

#### Defined in

bud-build/types/Item/index.d.ts:9
