---
id: "framework.api.babel"
title: "Namespace: Babel"
sidebar_label: "Framework.Api.Babel"
custom_edit_url: null
---

[Framework](framework.md).[Api](framework.api.md).Babel

## Interfaces

- [Registry](../interfaces/framework.api.babel.registry.md)

## Type aliases

### NormalizedPlugin

Ƭ **NormalizedPlugin**: [`string`, `any`]

#### Defined in

packages/@roots/bud-babel/types/interface.d.ts:91

___

### Options

Ƭ **Options**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `config?` | `boolean` \| `string` |
| `plugins?` | [`Plugin`](framework.api.babel.md#plugin)[] |

#### Defined in

packages/@roots/bud-babel/types/interface.d.ts:87

___

### Plugin

Ƭ **Plugin**: `string` \| [`NormalizedPlugin`](framework.api.babel.md#normalizedplugin) \| `CallableFunction`

#### Defined in

packages/@roots/bud-babel/types/interface.d.ts:92

___

### Registrable

Ƭ **Registrable**: `string` \| [`NormalizedPlugin`](framework.api.babel.md#normalizedplugin)

#### Defined in

packages/@roots/bud-babel/types/interface.d.ts:93
