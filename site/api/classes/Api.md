---
id: "Api"
title: "Class: Api"
sidebar_label: "Api"
sidebar_position: 0
custom_edit_url: null
---

Provides macros/facades for assisting with common config tasks.

**`remarks`**
[Repository](../namespaces/Store.md#repository) container items are bound to `bud` during [Framework.bootstrap](Framework.md#bootstrap) sequence.

**`sealed`**

## Hierarchy

- `Base`

  ↳ **`Api`**

## Implements

- [`Service`](Service.md)<`Repository`\>

## Properties

### name

• **name**: `string` = `'api'`

#### Implementation of

Service.name

#### Overrides

Base.name

#### Defined in

[packages/@roots/bud/src/services/Api/index.ts:16](https://github.com/roots/bud/blob/e51c85c2/packages/@roots/bud/src/services/Api/index.ts#L16)

___

### repository

• **repository**: `Repository`

#### Implementation of

Service.repository

#### Overrides

Base.repository

#### Defined in

[packages/@roots/bud/src/services/Api/index.ts:18](https://github.com/roots/bud/blob/e51c85c2/packages/@roots/bud/src/services/Api/index.ts#L18)

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.md)

Access [Framework](Framework.md) instance

**`readonly`**

#### Returns

[`Framework`](Framework.md)

#### Defined in

packages/@roots/bud-framework/types/Bootstrapper.d.ts:25
