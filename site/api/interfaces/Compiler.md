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

[packages/@roots/bud-framework/src/Compiler.ts:19](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Compiler.ts#L19)

___

### isCompiled

• **isCompiled**: `boolean`

Has already been ran

#### Defined in

[packages/@roots/bud-framework/src/Compiler.ts:24](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Compiler.ts#L24)

___

### progress

• **progress**: `any`

Formatted progress plugin

#### Defined in

[packages/@roots/bud-framework/src/Compiler.ts:34](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Compiler.ts#L34)

___

### stats

• **stats**: `any`

Compiler stats output

#### Defined in

[packages/@roots/bud-framework/src/Compiler.ts:29](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Compiler.ts#L29)

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:74](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Service.ts#L74)

## Methods

### before

▸ **before**(): `any`

## bud.compiler.before

Parses configuration from bud

#### Returns

`any`

#### Defined in

[packages/@roots/bud-framework/src/Compiler.ts:60](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Compiler.ts#L60)

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

[packages/@roots/bud-framework/src/Compiler.ts:65](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Compiler.ts#L65)

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

[packages/@roots/bud-framework/src/Compiler.ts:53](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Compiler.ts#L53)
