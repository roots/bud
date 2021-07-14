---
id: "hooks"
title: "Namespace: Hooks"
sidebar_label: "Hooks"
sidebar_position: 0
custom_edit_url: null
---

## Namespaces

- [Build](hooks.build.md)
- [Extension](hooks.extension.md)
- [Item](hooks.item.md)
- [Loader](hooks.loader.md)
- [Locale](hooks.locale.md)
- [Rule](hooks.rule.md)

## Type aliases

### Hook

Ƭ **Hook**<`T`\>: (`value?`: `T`) => `T` \| `T`

Hook definition

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:105](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L105)

___

### LinkedObj

Ƭ **LinkedObj**<`T`\>: { [K in keyof T as \`${K & string}\`]: \`${Name & string}\`}

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:98](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L98)

___

### Name

Ƭ **Name**: ``"before"`` \| ``"after"`` \| ``"done"`` \| \`${Final}\` \| \`${Final}\` \| \`${Final}\` \| \`${Final}\` \| \`${Final}\` \| \`${Final}\`

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:349](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L349)

___

### PublishDict

Ƭ **PublishDict**: { [K in Name as \`${K & string}\`]?: any}

bud.publish key/value argument

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:110](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L110)

___

### Repository

Ƭ **Repository**: { [K in Name as \`${K & string}\`]?: Hook[]}

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:360](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L360)
