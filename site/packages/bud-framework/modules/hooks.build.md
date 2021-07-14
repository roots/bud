---
id: "hooks.build"
title: "Namespace: Build"
sidebar_label: "Build"
custom_edit_url: null
---

[Hooks](hooks.md).Build

## Interfaces

- [OptimizationOverride](../interfaces/hooks.build.optimizationoverride.md)
- [RulesOverride](../interfaces/hooks.build.rulesoverride.md)

## Type aliases

### Dive

Ƭ **Dive**<`T`, `S`\>: { [K in keyof T as \`build/${S & string}/${K & string}\`]: T[K]}

#### Type parameters

| Name |
| :------ |
| `T` |
| `S` |

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:265](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L265)

___

### Final

Ƭ **Final**: keyof { [K in keyof Top \| keyof Props \| keyof Dive<Config["output"], "output"\> \| "build/output/pathInfo" \| keyof Dive<Config["module"], "module"\> \| keyof Dive<Config["module"]["rules"], "module/rules"\> \| keyof Dive<Config["module"]["rules"]["oneOf"], "module/rules/oneOf"\> \| "build/module/rules/parser" \| keyof Dive<Config["resolve"], "resolve"\> \| keyof Dive<Config["resolveLoader"], "resolveLoader"\> \| "build/cache/name" \| "build/cache/cacheLocation" \| "build/cache/cacheDirectory" \| "build/cache/hashAlgorithm" \| "build/cache/managedPaths" \| "build/cache/version" \| "build/cache/type" \| "build/cache/buildDependencies" \| keyof Dive<Config["experiments"], "experiments"\> \| keyof Dive<Config["watchOptions"], "watchOptions"\> \| keyof Dive<Config["performance"], "performance"\> \| keyof Dive<Config["optimization"], "optimization"\> \| keyof Dive<Config["optimization"]["splitChunks"], "optimization/splitChunks"\> \| keyof Dive<Config["optimization"]["splitChunks"]["cacheGroups"], "optimization/splitChunks/cacheGroups"\> \| keyof Dive<Config["optimization"]["splitChunks"]["cacheGroups"]["vendor"], "optimization/splitChunks/cacheGroups/vendor"\>]: any}

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:275](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L275)

___

### Mode

Ƭ **Mode**: ``"development"`` \| ``"production"``

Bud does not support 'none'

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:236](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L236)

___

### Optimization

Ƭ **Optimization**: `Webpack.Configuration`[``"optimization"``]

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:243](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L243)

___

### Props

Ƭ **Props**: { [K in keyof Config as \`build/${K & string}\`]: Config[K]}

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:269](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L269)

___

### Rules

Ƭ **Rules**: `Webpack.Configuration`[``"module"``][``"rules"``]

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:238](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L238)

___

### Top

Ƭ **Top**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `build` | `Config` |

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:273](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L273)
