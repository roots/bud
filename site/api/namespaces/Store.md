---
id: "Store"
title: "Namespace: Store"
sidebar_label: "Store"
sidebar_position: 0
custom_edit_url: null
---

## Type aliases

### Keys

Ƭ **Keys**: keyof [`Configuration`](../interfaces/Configuration.md) & `string` \| \`theme.${string}\` \| \`server.${string}\` \| \`env.${string}\` \| \`location.${string}\` \| \`patterns.${string}\` \| ``"project"`` \| \`project.${string}\` \| \`compilation.${string}\` \| ``"build.resolve"`` \| \`build.${string}\` \| ``"hash"`` \| ``"hashFormat"`` \| ``"fileFormat"`` \| ``"ci"`` \| ``"clean"`` \| ``"define"`` \| ``"debug"`` \| ``"discover"`` \| ``"html"`` \| ``"manifest"`` \| ``"extension"`` \| \`extension.${string}\`

#### Defined in

packages/@roots/bud-framework/types/Store.d.ts:18

___

### Repository

Ƭ **Repository**: { [K in Keys & string]?: any}

#### Defined in

packages/@roots/bud-framework/types/Store.d.ts:19
