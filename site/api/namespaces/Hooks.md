---
id: "Hooks"
title: "Namespace: Hooks"
sidebar_label: "Hooks"
sidebar_position: 0
custom_edit_url: null
---

## Type aliases

### Hook

Ƭ **Hook**<`T`\>: (`value?`: `T`) => `T` \| `T`

Hook definition

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[packages/@roots/bud-framework/src/Hooks.ts:87](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Hooks.ts#L87)

___

### PublishDict

Ƭ **PublishDict**: { [K in Hooks.Name as \`${K & string}\`]?: any}

bud.publish key/value argument

#### Defined in

[packages/@roots/bud-framework/src/Hooks.ts:92](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Hooks.ts#L92)

___

### Repository

Ƭ **Repository**: { [K in Name as \`${K & string}\`]?: Hook[]}

#### Defined in

[packages/@roots/bud-framework/src/Hooks.ts:362](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Hooks.ts#L362)
