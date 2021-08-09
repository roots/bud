---
id: "Store"
title: "Namespace: Store"
sidebar_label: "Store"
sidebar_position: 0
custom_edit_url: null
---

## Type aliases

### Keys

Ƭ **Keys**: \`${keyof Configuration & string}\` \| \`theme.${keyof Configuration["theme"] & string}\` \| ``"theme.screens"`` \| \`theme.colors.${keyof Configuration["theme"]["colors"] & string}\` \| \`server.${keyof Configuration["server"] & string}\` \| \`server.middleware.${keyof Configuration["server"]["middleware"] & string}\` \| \`server.browser.${keyof Configuration["server"]["browser"] & string}\` \| \`server.${keyof Configuration["server"] & string}.${string}\` \| \`env.${string}\` \| \`location.${keyof Configuration["location"] & string}\` \| \`patterns.${keyof Configuration["patterns"] & string}\` \| \`build.${keyof Webpack.Configuration}\` \| \`build.module.${keyof Webpack.Configuration["module"]}\` \| \`build.module.${keyof Webpack.Configuration["module"]}.${string}\` \| \`extension.${string}\` \| \`build.${keyof Webpack.Configuration}.${string}\`

#### Defined in

packages/@roots/bud-framework/types/Store.d.ts:19

___

### Repository

Ƭ **Repository**: { [K in Keys & string]?: any}

#### Defined in

packages/@roots/bud-framework/types/Store.d.ts:20
