---
id: "Server"
title: "Interface: Server"
sidebar_label: "Server"
sidebar_position: 0
custom_edit_url: null
---

**`interface`** Server

## Hierarchy

- [`Service`](../classes/Service.md)

  ↳ **`Server`**

## Properties

### assets

• **assets**: `string`[]

Assets

#### Defined in

packages/@roots/bud-framework/src/Server.ts:25

___

### config

• **config**: [`Config`](../modules/Server.md#config)

Server configuration

#### Defined in

packages/@roots/bud-framework/src/Server.ts:35

___

### instance

• **instance**: `Application`

Server instance

#### Defined in

packages/@roots/bud-framework/src/Server.ts:30

___

### isWatchable

• **isWatchable**: `boolean`

Has files to watch and watch is enabled

#### Defined in

packages/@roots/bud-framework/src/Server.ts:40

___

### middleware

• **middleware**: [`Inventory`](Server.Middleware.Inventory.md)

Registered server middlewares

#### Defined in

packages/@roots/bud-framework/src/Server.ts:20

___

### watcher

• **watcher**: `Object`

Watcher instance

#### Index signature

▪ [key: `string`]: `any`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `close` | `CallableFunction` |
| `on` | `CallableFunction` |

#### Defined in

packages/@roots/bud-framework/src/Server.ts:45

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:74](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Service.ts#L74)

## Methods

### getWatchedFilesArray

▸ **getWatchedFilesArray**(): `string`[]

Retrieve an array of watched files.

#### Returns

`string`[]

#### Defined in

packages/@roots/bud-framework/src/Server.ts:54

___

### inject

▸ **inject**(): `void`

Inject client scripts innto compilation (HMR, dev experience)

#### Returns

`void`

#### Defined in

packages/@roots/bud-framework/src/Server.ts:64

___

### run

▸ **run**(): [`Server`](Server.md)

Run the server instance

#### Returns

[`Server`](Server.md)

#### Defined in

packages/@roots/bud-framework/src/Server.ts:59
