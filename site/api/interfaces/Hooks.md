---
id: "Hooks"
title: "Interface: Hooks"
sidebar_label: "Hooks"
sidebar_position: 0
custom_edit_url: null
---

**`interface`** Hooks

### Usage

####  Add a new entry to the
`webpack.externals` configuration:

```js
hooks.on(
  'build/externals',
  externals => ({
    ...externals,
    $: 'jquery',
  }),
)
```

#### Change the `webpack.output.filename` format:

```js
hooks.on(
  'build/output/filename',
  () => '[name].[hash:4]',
)
```

## Hierarchy

- [`Service`](../classes/Service.md)

  ↳ **`Hooks`**

## Properties

### name

• **name**: `string`

#### Inherited from

[Service](../classes/Service.md).[name](../classes/Service.md#name)

#### Defined in

bud-framework/src/Service.ts:60

___

### repository

• **repository**: [`Repository`](../modules/Hooks.md#repository)

Hooks repository

#### Overrides

Service.repository

#### Defined in

bud-framework/src/Hooks.ts:35

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

bud-framework/src/Service.ts:64

## Methods

### filter

▸ **filter**<`T`\>(`id`, `seed?`): `T`

## hooks.filter

The other side of bud.hooks.on. Passes a key and a value. If
any filters are registered on that key they will transform
the output before it is returned.

```js
bud.hooks.filter(
  'namespace.name.event',
  ['array', 'of', 'items'],
)
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `Name` |
| `seed?` | `any` |

#### Returns

`T`

#### Defined in

bud-framework/src/Hooks.ts:73

___

### on

▸ **on**(`id`, `callback`): [`Framework`](../classes/Framework.md)

## hooks.on

Register a function to filter a value.

If a filter calls for this name the function is then run,
passing whatever data along for modification. If more than one
hook is registered to a name, they will be called sequentially
in the order they were registered, with each hook's output used
as the input for the next.

### Usage

```js
app.hooks.on(
  'namespace.name.value',
  value => 'replaced by this string',
)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `Name` |
| `callback` | `any` |

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

bud-framework/src/Hooks.ts:57
