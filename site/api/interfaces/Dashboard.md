---
id: "Dashboard"
title: "Interface: Dashboard"
sidebar_label: "Dashboard"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Service`](../classes/Service.md)

  ↳ **`Dashboard`**

## Properties

### instance

• **instance**: `Instance`

Instance

#### Defined in

[bud-framework/src/Dashboard/index.ts:13](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Dashboard/index.ts#L13)

___

### name

• **name**: `any`

Service name

#### Overrides

[Service](../classes/Service.md).[name](../classes/Service.md#name)

#### Defined in

[bud-framework/src/Dashboard/index.ts:8](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Dashboard/index.ts#L8)

___

### render

• **render**: `any`

Render

#### Defined in

[bud-framework/src/Dashboard/index.ts:28](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Dashboard/index.ts#L28)

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

bud-framework/src/Service.ts:64

## Methods

### register

▸ **register**(): `void`

Register service

#### Returns

`void`

#### Overrides

Service.register

#### Defined in

[bud-framework/src/Dashboard/index.ts:18](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Dashboard/index.ts#L18)

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

[bud-framework/src/Dashboard/index.ts:33](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Dashboard/index.ts#L33)

___

### run

▸ **run**(): `void`

Mount CLI

#### Returns

`void`

#### Defined in

[bud-framework/src/Dashboard/index.ts:23](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Dashboard/index.ts#L23)
