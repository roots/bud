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

[packages/@roots/bud-framework/src/Server.ts:93](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Server.ts#L93)

___

### Proxy

Ƭ **Proxy**: `Proxy.RequestHandler` & `Handler`

#### Defined in

[packages/@roots/bud-framework/src/Server.ts:95](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Server.ts#L95)
