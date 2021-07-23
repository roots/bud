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

• **instance**: [`Instance`](../namespaces/Compiler.md#instance)

The compiler instance

#### Defined in

[packages/@roots/bud-framework/src/Compiler.ts:20](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Compiler.ts#L20)

___

### isCompiled

• **isCompiled**: `boolean`

Has already been ran

#### Defined in

[packages/@roots/bud-framework/src/Compiler.ts:25](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Compiler.ts#L25)

___

### progress

• **progress**: `any`

Formatted progress plugin

#### Defined in

[packages/@roots/bud-framework/src/Compiler.ts:35](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Compiler.ts#L35)

___

### stats

• **stats**: `any`

Compiler stats output

#### Defined in

[packages/@roots/bud-framework/src/Compiler.ts:30](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Compiler.ts#L30)

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:74](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Service.ts#L74)

## Methods

### before

▸ **before**(): `any`

## bud.compiler.before

Parses configuration from bud

#### Returns

`any`

#### Defined in

[packages/@roots/bud-framework/src/Compiler.ts:61](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Compiler.ts#L61)

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

[packages/@roots/bud-framework/src/Compiler.ts:66](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Compiler.ts#L66)

___

### compile

▸ **compile**(): [`Instance`](../namespaces/Compiler.md#instance)

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

[`Instance`](../namespaces/Compiler.md#instance)

#### Defined in

[packages/@roots/bud-framework/src/Compiler.ts:54](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Compiler.ts#L54)
