---
id: "Dashboard"
title: "Interface: Dashboard"
sidebar_label: "Dashboard"
sidebar_position: 0
custom_edit_url: null
---

**`interface`** Dashboard

## Hierarchy

- [`Service`](../classes/Service.md)

  ↳ **`Dashboard`**

## Properties

### instance

• **instance**: `Instance`

Ink instance

#### Defined in

packages/@roots/bud-framework/src/Dashboard.ts:15

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:74](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Service.ts#L74)

## Methods

### render

▸ **render**(`Component`, `title?`): `Instance`

Render stdout

#### Parameters

| Name | Type |
| :------ | :------ |
| `Component` | `any` |
| `title?` | `string` |

#### Returns

`Instance`

#### Defined in

packages/@roots/bud-framework/src/Dashboard.ts:25

___

### renderError

▸ **renderError**(`body`, `title`): `Instance`

Render error

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | `string` |
| `title` | `string` |

#### Returns

`Instance`

#### Defined in

packages/@roots/bud-framework/src/Dashboard.ts:30

___

### run

▸ **run**(): `void`

Mount and instantiate Dashboard

#### Returns

`void`

#### Defined in

packages/@roots/bud-framework/src/Dashboard.ts:20
