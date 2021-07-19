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

[packages/@roots/bud-framework/src/Hooks.ts:84](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Hooks.ts#L84)

___

### LinkedObj

Ƭ **LinkedObj**<`T`\>: { [K in keyof T as \`${K & string}\`]: \`${Hooks.Name & string}\`}

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/@roots/bud-framework/src/Hooks.ts:77](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Hooks.ts#L77)

___

### PublishDict

Ƭ **PublishDict**: { [K in Hooks.Name as \`${K & string}\`]?: any}

bud.publish key/value argument

#### Defined in

[packages/@roots/bud-framework/src/Hooks.ts:89](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Hooks.ts#L89)

___

### Repository

Ƭ **Repository**: { [K in Name as \`${K & string}\`]?: Hook[]}

#### Defined in

[packages/@roots/bud-framework/src/Hooks.ts:359](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Hooks.ts#L359)
