---
id: "hooks.build.optimizationoverride"
title: "Interface: OptimizationOverride"
sidebar_label: "OptimizationOverride"
custom_edit_url: null
---

[Hooks](../modules/hooks.md).[Build](../modules/hooks.build.md).OptimizationOverride

## Hierarchy

- [`Optimization`](../modules/hooks.build.md#optimization)

  ↳ **`OptimizationOverride`**

## Properties

### checkWasmTypes

• `Optional` **checkWasmTypes**: `boolean`

Check for incompatible wasm types when importing/exporting from/to ESM.

#### Inherited from

Optimization.checkWasmTypes

#### Defined in

node_modules/webpack/types.d.ts:7333

___

### chunkIds

• `Optional` **chunkIds**: ``false`` \| ``"natural"`` \| ``"named"`` \| ``"deterministic"`` \| ``"size"`` \| ``"total-size"``

Define the algorithm to choose chunk ids (named: readable ids for better debugging, deterministic: numeric hash ids for better long term caching, size: numeric ids focused on minimal initial download size, total-size: numeric ids focused on minimal total download size, false: no algorithm used, as custom one can be provided via plugin).

#### Inherited from

Optimization.chunkIds

#### Defined in

node_modules/webpack/types.d.ts:7338

___

### concatenateModules

• `Optional` **concatenateModules**: `boolean`

Concatenate modules when possible to generate less modules, more efficient code and enable more optimizations by the minimizer.

#### Inherited from

Optimization.concatenateModules

#### Defined in

node_modules/webpack/types.d.ts:7349

___

### emitOnErrors

• `Optional` **emitOnErrors**: `boolean`

Emit assets even when errors occur. Critical errors are emitted into the generated code and will cause errors at runtime.

#### Inherited from

Optimization.emitOnErrors

#### Defined in

node_modules/webpack/types.d.ts:7354

___

### flagIncludedChunks

• `Optional` **flagIncludedChunks**: `boolean`

Also flag chunks as loaded which contain a subset of the modules.

#### Inherited from

Optimization.flagIncludedChunks

#### Defined in

node_modules/webpack/types.d.ts:7359

___

### innerGraph

• `Optional` **innerGraph**: `boolean`

Creates a module-internal dependency graph for top level symbols, exports and imports, to improve unused exports detection.

#### Inherited from

Optimization.innerGraph

#### Defined in

node_modules/webpack/types.d.ts:7364

___

### mangleExports

• `Optional` **mangleExports**: `boolean` \| ``"deterministic"`` \| ``"size"``

Rename exports when possible to generate shorter code (depends on optimization.usedExports and optimization.providedExports, true/"deterministic": generate short deterministic names optimized for caching, "size": generate the shortest possible names).

#### Inherited from

Optimization.mangleExports

#### Defined in

node_modules/webpack/types.d.ts:7369

___

### mangleWasmImports

• `Optional` **mangleWasmImports**: `boolean`

Reduce size of WASM by changing imports to shorter strings.

#### Inherited from

Optimization.mangleWasmImports

#### Defined in

node_modules/webpack/types.d.ts:7374

___

### mergeDuplicateChunks

• `Optional` **mergeDuplicateChunks**: `boolean`

Merge chunks which contain the same modules.

#### Inherited from

Optimization.mergeDuplicateChunks

#### Defined in

node_modules/webpack/types.d.ts:7379

___

### minimize

• `Optional` **minimize**: `boolean`

Enable minimizing the output. Uses optimization.minimizer.

#### Inherited from

Optimization.minimize

#### Defined in

node_modules/webpack/types.d.ts:7384

___

### minimizer

• `Optional` **minimizer**: (`WebpackPluginInstance` \| ``"..."`` \| (`compiler`: `Compiler`) => `void`)[]

Minimizer(s) to use for minimizing the output.

#### Inherited from

Optimization.minimizer

#### Defined in

node_modules/webpack/types.d.ts:7389

___

### moduleIds

• `Optional` **moduleIds**: ``false`` \| ``"natural"`` \| ``"named"`` \| ``"deterministic"`` \| ``"size"`` \| ``"hashed"``

Define the algorithm to choose module ids (natural: numeric ids in order of usage, named: readable ids for better debugging, hashed: (deprecated) short hashes as ids for better long term caching, deterministic: numeric hash ids for better long term caching, size: numeric ids focused on minimal initial download size, false: no algorithm used, as custom one can be provided via plugin).

#### Inherited from

Optimization.moduleIds

#### Defined in

node_modules/webpack/types.d.ts:7398

___

### noEmitOnErrors

• `Optional` **noEmitOnErrors**: `boolean`

Avoid emitting assets when errors occur (deprecated: use 'emitOnErrors' instead).

#### Inherited from

Optimization.noEmitOnErrors

#### Defined in

node_modules/webpack/types.d.ts:7403

___

### nodeEnv

• `Optional` **nodeEnv**: `string` \| ``false``

Set process.env.NODE_ENV to a specific value.

#### Inherited from

Optimization.nodeEnv

#### Defined in

node_modules/webpack/types.d.ts:7408

___

### portableRecords

• `Optional` **portableRecords**: `boolean`

Generate records with relative paths to be able to move the context folder.

#### Inherited from

Optimization.portableRecords

#### Defined in

node_modules/webpack/types.d.ts:7413

___

### providedExports

• `Optional` **providedExports**: `boolean`

Figure out which exports are provided by modules to generate more efficient code.

#### Inherited from

Optimization.providedExports

#### Defined in

node_modules/webpack/types.d.ts:7418

___

### realContentHash

• `Optional` **realContentHash**: `boolean`

Use real [contenthash] based on final content of the assets.

#### Inherited from

Optimization.realContentHash

#### Defined in

node_modules/webpack/types.d.ts:7423

___

### removeAvailableModules

• `Optional` **removeAvailableModules**: `boolean`

Removes modules from chunks when these modules are already included in all parents.

#### Inherited from

Optimization.removeAvailableModules

#### Defined in

node_modules/webpack/types.d.ts:7428

___

### removeEmptyChunks

• `Optional` **removeEmptyChunks**: `boolean`

Remove chunks which are empty.

#### Inherited from

Optimization.removeEmptyChunks

#### Defined in

node_modules/webpack/types.d.ts:7433

___

### runtimeChunk

• `Optional` **runtimeChunk**: `boolean` \| ``"single"`` \| ``"multiple"`` \| { `name?`: `string` \| `Function`  }

Create an additional chunk which contains only the webpack runtime and chunk hash maps.

#### Inherited from

Optimization.runtimeChunk

#### Defined in

node_modules/webpack/types.d.ts:7438

___

### sideEffects

• `Optional` **sideEffects**: `boolean` \| ``"flag"``

Skip over modules which contain no side effects when exports are not used (false: disabled, 'flag': only use manually placed side effects flag, true: also analyse source code for side effects).

#### Inherited from

Optimization.sideEffects

#### Defined in

node_modules/webpack/types.d.ts:7452

___

### splitChunks

• **splitChunks**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `cacheGroups` | `any` |

#### Overrides

Optimization.splitChunks

#### Defined in

[packages/@roots/bud-framework/src/Hooks/index.ts:246](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Hooks/index.ts#L246)

___

### usedExports

• `Optional` **usedExports**: `boolean` \| ``"global"``

Figure out which exports are used by modules to mangle export names, omit unused exports and generate more efficient code (true: analyse used exports for each runtime, "global": analyse exports globally for all runtimes combined).

#### Inherited from

Optimization.usedExports

#### Defined in

node_modules/webpack/types.d.ts:7462
