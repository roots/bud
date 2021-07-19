---
id: "Server"
title: "Interface: Server"
sidebar_label: "Server"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Service`](../classes/Service.md)

  ↳ **`Server`**

## Properties

### assets

• **assets**: `string`[]

Assets

#### Defined in

[bud-framework/src/Server/index.ts:18](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Server/index.ts#L18)

___

### config

• **config**: [`Config`](../modules/Server.md#config)

Server configuration

#### Defined in

[bud-framework/src/Server/index.ts:28](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Server/index.ts#L28)

___

### instance

• **instance**: `Application`

Server instance

#### Defined in

[bud-framework/src/Server/index.ts:23](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Server/index.ts#L23)

___

### isWatchable

• **isWatchable**: `boolean`

Has files to watch and watch is enabled

#### Defined in

[bud-framework/src/Server/index.ts:33](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Server/index.ts#L33)

___

### middleware

• **middleware**: [`Inventory`](Server.Middleware.Inventory.md)

Registered server middlewares

#### Defined in

[bud-framework/src/Server/index.ts:13](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Server/index.ts#L13)

___

### name

• **name**: `string`

#### Inherited from

[Service](../classes/Service.md).[name](../classes/Service.md#name)

#### Defined in

bud-framework/src/Service.ts:60

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

[bud-framework/src/Server/index.ts:38](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Server/index.ts#L38)

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

bud-framework/src/Service.ts:64

## Methods

### getWatchedFilesArray

▸ **getWatchedFilesArray**(): `string`[]

Retrieve an array of watched files.

#### Returns

`string`[]

#### Defined in

[bud-framework/src/Server/index.ts:47](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Server/index.ts#L47)

___

### inject

▸ **inject**(): `void`

Inject client scripts innto compilation (HMR, dev experience)

#### Returns

`void`

#### Defined in

[bud-framework/src/Server/index.ts:57](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Server/index.ts#L57)

___

### run

▸ **run**(): [`Server`](Server.md)

Run the server instance

#### Returns

[`Server`](Server.md)

#### Defined in

[bud-framework/src/Server/index.ts:52](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Server/index.ts#L52)
