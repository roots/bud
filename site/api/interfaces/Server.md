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

[packages/@roots/bud-framework/src/Server/index.ts:18](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Server/index.ts#L18)

___

### config

• **config**: [`Config`](../modules/Server.md#config)

Server configuration

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:28](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Server/index.ts#L28)

___

### instance

• **instance**: `Application`

Server instance

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:23](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Server/index.ts#L23)

___

### isWatchable

• **isWatchable**: `boolean`

Has files to watch and watch is enabled

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:33](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Server/index.ts#L33)

___

### middleware

• **middleware**: [`Inventory`](Server.Middleware.Inventory.md)

Registered server middlewares

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:13](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Server/index.ts#L13)

___

### name

• **name**: `string`

#### Inherited from

[Service](../classes/Service.md).[name](../classes/Service.md#name)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:60](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L60)

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

[packages/@roots/bud-framework/src/Server/index.ts:38](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Server/index.ts#L38)

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:64](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L64)

## Methods

### boot

▸ `Optional` **boot**(`app`): `any`

Boot

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/Service.md).[boot](../classes/Service.md#boot)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:43](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L43)

___

### booted

▸ `Optional` **booted**(`app`): `any`

Post boot callback

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/Service.md).[booted](../classes/Service.md#booted)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:49](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L49)

___

### bootstrap

▸ `Optional` **bootstrap**(`app`): `any`

Bootstrap

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/Service.md).[bootstrap](../classes/Service.md#bootstrap)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:19](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L19)

___

### bootstrapped

▸ `Optional` **bootstrapped**(`app`): `any`

Bootstrapped

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/Service.md).[bootstrapped](../classes/Service.md#bootstrapped)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:25](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L25)

___

### getWatchedFilesArray

▸ **getWatchedFilesArray**(): `string`[]

Retrieve an array of watched files.

#### Returns

`string`[]

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:47](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Server/index.ts#L47)

___

### inject

▸ **inject**(): `void`

Inject client scripts innto compilation (HMR, dev experience)

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:57](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Server/index.ts#L57)

___

### register

▸ `Optional` **register**(`app`): `any`

Register

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/Service.md).[register](../classes/Service.md#register)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:31](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L31)

___

### registered

▸ `Optional` **registered**(`app`): `any`

Post registered callback

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/Service.md).[registered](../classes/Service.md#registered)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:37](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L37)

___

### run

▸ **run**(): [`Server`](Server.md)

Run the server instance

#### Returns

[`Server`](Server.md)

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:52](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Server/index.ts#L52)
