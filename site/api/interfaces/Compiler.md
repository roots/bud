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

### compile

• **compile**: [`Compile`](../modules/Compiler.md#compile)

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

#### Defined in

[bud-framework/src/Compiler/index.ts:46](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Compiler/index.ts#L46)

___

### instance

• **instance**: [`Instance`](../modules/Compiler.md#instance)

The compiler instance

#### Defined in

[bud-framework/src/Compiler/index.ts:12](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Compiler/index.ts#L12)

___

### isCompiled

• **isCompiled**: `boolean`

Has already been ran

#### Defined in

[bud-framework/src/Compiler/index.ts:17](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Compiler/index.ts#L17)

___

### name

• **name**: `string`

#### Inherited from

[Service](../classes/Service.md).[name](../classes/Service.md#name)

#### Defined in

bud-framework/src/Service.ts:60

___

### progress

• **progress**: `any`

Formatted progress plugin

#### Defined in

[bud-framework/src/Compiler/index.ts:27](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Compiler/index.ts#L27)

___

### stats

• **stats**: `any`

Compiler stats output

#### Defined in

[bud-framework/src/Compiler/index.ts:22](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Compiler/index.ts#L22)

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

bud-framework/src/Service.ts:64

## Methods

### before

▸ **before**(): `any`

## bud.compiler.before

Parses configuration from bud

#### Returns

`any`

#### Defined in

[bud-framework/src/Compiler/index.ts:53](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Compiler/index.ts#L53)

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

[bud-framework/src/Compiler/index.ts:58](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Compiler/index.ts#L58)
