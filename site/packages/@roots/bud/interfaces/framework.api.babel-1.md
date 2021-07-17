---
id: "framework.api.babel-1"
title: "Interface: Babel"
sidebar_label: "Framework.Api.Babel"
custom_edit_url: null
---

[Framework](../modules/framework.md).[Api](../modules/framework.api.md).Babel

## Properties

### log

• **log**: `any`

## babel.log

#### Defined in

packages/@roots/bud-babel/types/interface.d.ts:30

___

### plugins

• **plugins**: [`Registry`](framework.api.babel.registry.md)

## babel.plugins

#### Defined in

packages/@roots/bud-babel/types/interface.d.ts:34

___

### presets

• **presets**: [`Registry`](framework.api.babel.registry.md)

## babel.presets

#### Defined in

packages/@roots/bud-babel/types/interface.d.ts:38

___

### setPluginOptions

• **setPluginOptions**: (`plugin`: `string`, `options`: `any`) => [`Babel`](framework.api.babel-1.md)

#### Type declaration

▸ (`plugin`, `options`): [`Babel`](framework.api.babel-1.md)

## babel.setPluginOptions

##### Parameters

| Name | Type |
| :------ | :------ |
| `plugin` | `string` |
| `options` | `any` |

##### Returns

[`Babel`](framework.api.babel-1.md)

#### Defined in

packages/@roots/bud-babel/types/interface.d.ts:64

## Methods

### init

▸ **init**(`app`): [`Babel`](framework.api.babel-1.md)

## babel.init

Initialize class.

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/framework.md) |

#### Returns

[`Babel`](framework.api.babel-1.md)

#### Defined in

packages/@roots/bud-babel/types/interface.d.ts:44

___

### setPlugin

▸ **setPlugin**(`plugin`): [`Babel`](framework.api.babel-1.md)

## babel.setPlugin

Add a babel plugin.

### Usage

```js
bud.babel.setPlugin(MyPlugin, {plugin: 'options'})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `plugin` | [`Registrable`](../modules/framework.api.babel.md#registrable) |

#### Returns

[`Babel`](framework.api.babel-1.md)

#### Defined in

packages/@roots/bud-babel/types/interface.d.ts:56

___

### setPlugins

▸ **setPlugins**(`plugins`): [`Babel`](framework.api.babel-1.md)

## babel.setPlugins

#### Parameters

| Name | Type |
| :------ | :------ |
| `plugins` | (`string` \| [`NormalizedPlugin`](../modules/framework.api.babel.md#normalizedplugin))[] |

#### Returns

[`Babel`](framework.api.babel-1.md)

#### Defined in

packages/@roots/bud-babel/types/interface.d.ts:60

___

### setPreset

▸ **setPreset**(`preset`): [`Babel`](framework.api.babel-1.md)

## babel.setPlugin

Add a babel plugin.

### Usage

```js
bud.babel.setPlugin(MyPlugin, {plugin: 'options'})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `preset` | [`Registrable`](../modules/framework.api.babel.md#registrable) |

#### Returns

[`Babel`](framework.api.babel-1.md)

#### Defined in

packages/@roots/bud-babel/types/interface.d.ts:76

___

### setPresetOptions

▸ **setPresetOptions**(`preset`, `options`): [`Babel`](framework.api.babel-1.md)

## babel.setPresetOptions

#### Parameters

| Name | Type |
| :------ | :------ |
| `preset` | `string` |
| `options` | `any` |

#### Returns

[`Babel`](framework.api.babel-1.md)

#### Defined in

packages/@roots/bud-babel/types/interface.d.ts:84

___

### setPresets

▸ **setPresets**(`presets`): [`Babel`](framework.api.babel-1.md)

## babel.setPresets

#### Parameters

| Name | Type |
| :------ | :------ |
| `presets` | (`string` \| [`NormalizedPlugin`](../modules/framework.api.babel.md#normalizedplugin))[] |

#### Returns

[`Babel`](framework.api.babel-1.md)

#### Defined in

packages/@roots/bud-babel/types/interface.d.ts:80
