---
id: "Store"
title: "Class: Store"
sidebar_label: "Store"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Service`](Service.md)<[`Repo`](../modules/Store.md#repo)\>

  ↳ **`Store`**

## Properties

### name

• **name**: `string` = `'service/store'`

#### Overrides

[Service](Service.md).[name](Service.md#name)

#### Defined in

bud-framework/src/Store.ts:5

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.md)

#### Returns

[`Framework`](Framework.md)

#### Defined in

bud-framework/src/Service.ts:64

## Methods

### get

▸ **get**<`T`\>(`path`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | [`Keys`](../modules/Store.md#keys) |

#### Returns

`T`

#### Overrides

Service.get

#### Defined in

bud-framework/src/Store.ts:7
