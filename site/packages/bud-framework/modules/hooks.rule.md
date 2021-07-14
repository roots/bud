---
id: "hooks.rule"
title: "Namespace: Rule"
sidebar_label: "Rule"
custom_edit_url: null
---

[Hooks](hooks.md).Rule

## Interfaces

- [Definitions](../interfaces/hooks.rule.definitions.md)

## Type aliases

### Base

Ƭ **Base**: ``"rule"``

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:186](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L186)

___

### Final

Ƭ **Final**: keyof [`Root`](hooks.rule.md#root) \| keyof [`Rule`](hooks.rule.md#rule) \| keyof [`Props`](hooks.rule.md#props) \| keyof [`Options`](hooks.rule.md#options)

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:225](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L225)

___

### Options

Ƭ **Options**: { [K in keyof Rule as \`${K & string}/${keyof Subject & "options"}/${string}\`]: any}

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:220](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L220)

___

### Props

Ƭ **Props**: { [K in keyof Rule as \`${K & string}/${keyof Subject & string}\`]: any}

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:215](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L215)

___

### Root

Ƭ **Root**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `rule` | [`Subject`](hooks.rule.md#subject) |

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:207](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L207)

___

### Rule

Ƭ **Rule**: { [K in keyof Definitions as \`${Base}/${K & string}\`]: any}

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:211](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L211)

___

### Subject

Ƭ **Subject**: `Webpack.RuleSetRule`

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:187](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L187)

___

### WebpackMap

Ƭ **WebpackMap**: { [K in keyof Subject as \`${Base}/${keyof Definitions & string}/${K & string}\`]: Subject[K]}

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:188](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L188)
