---
id: "Server.Middleware"
title: "Namespace: Middleware"
sidebar_label: "Middleware"
custom_edit_url: null
---

[Server](Server.md).Middleware

## Interfaces

- [Inventory](../interfaces/Server.Middleware.Inventory.md)
- [Options](../interfaces/Server.Middleware.Options.md)
- [Target](../interfaces/Server.Middleware.Target.md)

## Type aliases

### Init

Ƭ **Init**: (`options`: [`Options`](../interfaces/Server.Middleware.Options.md)) => [`Middleware`](Server.Middleware.md)

#### Type declaration

▸ (`options`): [`Middleware`](Server.Middleware.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Options`](../interfaces/Server.Middleware.Options.md) |

##### Returns

[`Middleware`](Server.Middleware.md)

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:86](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Server/index.ts#L86)

___

### Proxy

Ƭ **Proxy**: `Proxy.RequestHandler` & `Handler`

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:88](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Server/index.ts#L88)
