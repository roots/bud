---
id: "Store"
title: "Class: Store"
sidebar_label: "Store"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Service`](Service.md)<[`Repo`](../namespaces/Store.md#repo)\>

  ↳ **`Store`**

## Properties

### name

• **name**: `string` = `'service/store'`

#### Overrides

Service.name

#### Defined in

[packages/@roots/bud-framework/src/Store.ts:6](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Store.ts#L6)

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.md)

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:74](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Service.ts#L74)

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
| `path` | [`Keys`](../namespaces/Store.md#keys) |

#### Returns

`T`

#### Overrides

Service.get

#### Defined in

[packages/@roots/bud-framework/src/Store.ts:8](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Store.ts#L8)
