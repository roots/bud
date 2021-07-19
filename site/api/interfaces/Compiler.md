---
id: "Compiler"
title: "Interface: Compiler"
sidebar_label: "Compiler"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Service`](../classes/Service.md)

  ↳ **`Compiler`**

## Properties

### instance

• **instance**: [`Instance`](../modules/Compiler.md#instance)

The compiler instance

#### Defined in

packages/@roots/bud-framework/src/Compiler.ts:19

___

### isCompiled

• **isCompiled**: `boolean`

Has already been ran

#### Defined in

packages/@roots/bud-framework/src/Compiler.ts:24

___

### name

• **name**: `string`

#### Inherited from

[Service](../classes/Service.md).[name](../classes/Service.md#name)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:60](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L60)

___

### progress

• **progress**: `any`

Formatted progress plugin

#### Defined in

packages/@roots/bud-framework/src/Compiler.ts:34

___

### stats

• **stats**: `any`

Compiler stats output

#### Defined in

packages/@roots/bud-framework/src/Compiler.ts:29

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:64](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L64)

## Methods

### before

▸ **before**(): `any`

## bud.compiler.before

Parses configuration from bud

#### Returns

`any`

#### Defined in

packages/@roots/bud-framework/src/Compiler.ts:60

___

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

### callback

▸ **callback**(`err`, `stats`): `void`

Compilation callback

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `StatsError` |
| `stats` | `StatsCompilation` |

#### Returns

`void`

#### Defined in

packages/@roots/bud-framework/src/Compiler.ts:65

___

### compile

▸ **compile**(): [`Instance`](../modules/Compiler.md#instance)

## bud.compiler.compile

Return a compiler instance for a webpack configuration.

### Usage

```js
bud.compiler.compile()
```

```js
bud.compiler.compile({
  entry: {app: 'foo.js'}
})
```

#### Returns

[`Instance`](../modules/Compiler.md#instance)

#### Defined in

packages/@roots/bud-framework/src/Compiler.ts:53

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
