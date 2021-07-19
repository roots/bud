---
id: "Compiler.Compiler-2"
title: "Interface: Compiler"
sidebar_label: "Compiler"
custom_edit_url: null
---

[Compiler](../modules/Compiler.md).Compiler

## Hierarchy

- [`Service`](../classes/Service.Service-1.md)

  ↳ **`Compiler`**

## Properties

### compile

• **compile**: [`Compile`](../modules/Compiler.Compiler-1.md#compile)

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

[bud-framework/src/Compiler/index.ts:42](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Compiler/index.ts#L42)

___

### instance

• **instance**: [`Instance`](../modules/Compiler.Compiler-1.md#instance)

The compiler instance

#### Defined in

[bud-framework/src/Compiler/index.ts:8](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Compiler/index.ts#L8)

___

### isCompiled

• **isCompiled**: `boolean`

Has already been ran

#### Defined in

[bud-framework/src/Compiler/index.ts:13](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Compiler/index.ts#L13)

___

### name

• **name**: `string`

#### Inherited from

[Service](../classes/Service.Service-1.md).[name](../classes/Service.Service-1.md#name)

#### Defined in

[bud-framework/src/Service/index.ts:51](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Service/index.ts#L51)

___

### progress

• **progress**: `any`

Formatted progress plugin

#### Defined in

[bud-framework/src/Compiler/index.ts:23](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Compiler/index.ts#L23)

___

### stats

• **stats**: `any`

Compiler stats output

#### Defined in

[bud-framework/src/Compiler/index.ts:18](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Compiler/index.ts#L18)

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.Framework-2.md)

#### Returns

[`Framework`](../classes/Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Service/index.ts:55](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Service/index.ts#L55)

## Methods

### before

▸ **before**(): `any`

## bud.compiler.before

Parses configuration from bud

#### Returns

`any`

#### Defined in

[bud-framework/src/Compiler/index.ts:49](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Compiler/index.ts#L49)

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

[bud-framework/src/Compiler/index.ts:54](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Compiler/index.ts#L54)
