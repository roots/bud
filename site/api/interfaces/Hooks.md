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

[packages/@roots/bud-framework/src/Service.ts:60](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L60)

___

### repository

• **repository**: [`Repository`](../modules/Hooks.md#repository)

Hooks repository

#### Overrides

Service.repository

#### Defined in

[packages/@roots/bud-framework/src/Hooks.ts:35](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Hooks.ts#L35)

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:64](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L64)

## Methods

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

[packages/@roots/bud-framework/src/Hooks.ts:73](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Hooks.ts#L73)

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

[packages/@roots/bud-framework/src/Hooks.ts:57](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Hooks.ts#L57)

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
