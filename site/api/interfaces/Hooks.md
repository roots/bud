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

### repository

• **repository**: [`Repository`](../namespaces/Hooks.md#repository)

Hooks repository

#### Overrides

Service.repository

#### Defined in

[packages/@roots/bud-framework/src/Hooks.ts:40](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Hooks.ts#L40)

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:74](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Service.ts#L74)

## Methods

### filter

▸ **filter**<`T`\>(`id`, `seed?`): `T`

hooks.filter

The other side of bud.hooks.on. Passes a key and a value. If
any filters are registered on that key they will transform
the output before it is returned.

## Usage

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

[packages/@roots/bud-framework/src/Hooks.ts:80](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Hooks.ts#L80)

___

### on

▸ **on**(`id`, `callback`): [`Framework`](../classes/Framework.md)

hooks.on

Register a function to filter a value.

If a filter calls for this name the function is then run,
passing whatever data along for modification. If more than one
hook is registered to a name, they will be called sequentially
in the order they were registered, with each hook's output used
as the input for the next.

## Usage

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

[packages/@roots/bud-framework/src/Hooks.ts:62](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Hooks.ts#L62)
