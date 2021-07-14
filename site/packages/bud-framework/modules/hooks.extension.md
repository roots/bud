---
id: "hooks.extension"
title: "Namespace: Extension"
sidebar_label: "Extension"
custom_edit_url: null
---

[Hooks](hooks.md).Extension

## Type aliases

### Base

Ƭ **Base**: ``"extension"``

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:336](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L336)

___

### Final

Ƭ **Final**: keyof { [K in keyof Extensions as "extension" \| \`extension/${K}\` \| \`extension/${K}/${\`${keyof Subject & string}\` \| \`${keyof Subject & string}/${string}\`}\`]: any}

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:339](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L339)

___

### Subject

Ƭ **Subject**: [`Module`](../interfaces/module.md)

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:337](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L337)
