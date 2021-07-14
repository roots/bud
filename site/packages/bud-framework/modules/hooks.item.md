---
id: "hooks.item"
title: "Namespace: Item"
sidebar_label: "Item"
custom_edit_url: null
---

[Hooks](hooks.md).Item

## Interfaces

- [Definitions](../interfaces/hooks.item.definitions.md)

## Type aliases

### Base

Ƭ **Base**: ``"item"``

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:140](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L140)

___

### Final

Ƭ **Final**: keyof [`Root`](hooks.item.md#root) \| keyof [`Item`](hooks.item.md#item) \| keyof [`Props`](hooks.item.md#props) \| keyof [`Options`](hooks.item.md#options)

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:178](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L178)

___

### Item

Ƭ **Item**: { [K in keyof Definitions as \`${Base}/${K & string}\`]: any}

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:163](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L163)

___

### OptionKey

Ƭ **OptionKey**<`K`\>: \`${K & string}/${SubjectKeys & "options"}/${string}\`

#### Type parameters

| Name |
| :------ |
| `K` |

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:171](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L171)

___

### Options

Ƭ **Options**: { [K in keyof Item as OptionKey<K\>]: any}

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:174](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L174)

___

### OptionsKey

Ƭ **OptionsKey**: \`${string}\`

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:144](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L144)

___

### Props

Ƭ **Props**: { [K in keyof Item as \`${K & string}/${SubjectKeys}\`]: any}

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:167](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L167)

___

### Root

Ƭ **Root**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `item` | [`Subject`](hooks.item.md#subject) |

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:159](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L159)

___

### Subject

Ƭ **Subject**: `Webpack.RuleSetUseItem`

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:141](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L141)

___

### SubjectKeys

Ƭ **SubjectKeys**: ``"loader"`` \| ``"options"``

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:142](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L142)
