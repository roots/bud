---
id: "framework.api.postcss-1"
title: "Interface: PostCss"
sidebar_label: "Framework.Api.PostCss"
custom_edit_url: null
---

[Framework](../modules/framework.md).[Api](../modules/framework.api.md).PostCss

## Properties

### plugins

• **plugins**: [`Registry`](framework.api.postcss.registry.md)

Registered plugins

#### Defined in

packages/@roots/bud-postcss/types/interface.d.ts:34

## Methods

### setPlugin

▸ **setPlugin**(`plugin`): [`PostCss`](framework.api.postcss-1.md)

Set a plugin

#### Parameters

| Name | Type |
| :------ | :------ |
| `plugin` | `string` \| [`NormalizedPlugin`](../modules/framework.api.postcss.md#normalizedplugin) |

#### Returns

[`PostCss`](framework.api.postcss-1.md)

#### Defined in

packages/@roots/bud-postcss/types/interface.d.ts:38

___

### setPluginOptions

▸ **setPluginOptions**(`plugin`, `options`): [`PostCss`](framework.api.postcss-1.md)

Set plugin options

#### Parameters

| Name | Type |
| :------ | :------ |
| `plugin` | `string` |
| `options` | `any` |

#### Returns

[`PostCss`](framework.api.postcss-1.md)

#### Defined in

packages/@roots/bud-postcss/types/interface.d.ts:46

___

### setPlugins

▸ **setPlugins**(`plugins`): [`PostCss`](framework.api.postcss-1.md)

Set plugins

#### Parameters

| Name | Type |
| :------ | :------ |
| `plugins` | (`string` \| [`NormalizedPlugin`](../modules/framework.api.postcss.md#normalizedplugin))[] |

#### Returns

[`PostCss`](framework.api.postcss-1.md)

#### Defined in

packages/@roots/bud-postcss/types/interface.d.ts:42

___

### unsetPlugin

▸ **unsetPlugin**(`plugin`): [`PostCss`](framework.api.postcss-1.md)

Remove a plugin

#### Parameters

| Name | Type |
| :------ | :------ |
| `plugin` | `string` |

#### Returns

[`PostCss`](framework.api.postcss-1.md)

#### Defined in

packages/@roots/bud-postcss/types/interface.d.ts:50
