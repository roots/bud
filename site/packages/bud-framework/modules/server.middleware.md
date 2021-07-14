---
id: "server.middleware"
title: "Namespace: Middleware"
sidebar_label: "Middleware"
custom_edit_url: null
---

[Server](server.md).Middleware

## Interfaces

- [Inventory](../interfaces/server.middleware.inventory.md)
- [Options](../interfaces/server.middleware.options.md)
- [Target](../interfaces/server.middleware.target.md)

## Type aliases

### Init

Ƭ **Init**: (`options`: [`Options`](../interfaces/server.middleware.options.md)) => [`Middleware`](server.middleware.md)

#### Type declaration

▸ (`options`): [`Middleware`](server.middleware.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Options`](../interfaces/server.middleware.options.md) |

##### Returns

[`Middleware`](server.middleware.md)

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:86](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Server/index.ts#L86)

___

### Proxy

Ƭ **Proxy**: `Proxy.RequestHandler` & `Handler`

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:88](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Server/index.ts#L88)
