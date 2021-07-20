---
id: "index"
title: "@roots/bud-framework"
slug: "/api"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Namespaces

- [Build](modules/Build.md)
- [Compiler](modules/Compiler.md)
- [Extensions](modules/Extensions.md)
- [Framework](modules/Framework.md)
- [Hooks](modules/Hooks.md)
- [Module](modules/Module.md)
- [Server](modules/Server.md)
- [Store](modules/Store.md)

## Classes

- [Bootstrapper](classes/Bootstrapper.md)
- [Discovery](classes/Discovery.md)
- [Extension](classes/Extension.md)
- [Framework](classes/Framework.md)
- [Service](classes/Service.md)
- [Store](classes/Store.md)

## Interfaces

- [Api](interfaces/Api.md)
- [Build](interfaces/Build.md)
- [Cache](interfaces/Cache.md)
- [Compiler](interfaces/Compiler.md)
- [Configuration](interfaces/Configuration.md)
- [Dashboard](interfaces/Dashboard.md)
- [Dependencies](interfaces/Dependencies.md)
- [Env](interfaces/Env.md)
- [Extensions](interfaces/Extensions.md)
- [Hooks](interfaces/Hooks.md)
- [Logger](interfaces/Logger.md)
- [Module](interfaces/Module.md)
- [Plugin](interfaces/Plugin.md)
- [Server](interfaces/Server.md)

## Type aliases

### Access

Ƭ **Access**<`I`\>: (`this`: [`Framework`](classes/Framework.md), `value`: [`Tapable`](modules/Framework.md#tapable)<`I`\> \| `I`) => `I`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `any` |

#### Type declaration

▸ (`this`, `value`): `I`

If a value is a function **access** will call that
function and return the result.

If the value is not a function **access** will return its value.

```js
const isAFunction = (option) => `option value: ${option}`
const isAValue = 'option value: true'

access(isAFunction, true) // => `option value: true`

access(isAValue) // => `option value: true`
```

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Framework`](classes/Framework.md) |
| `value` | [`Tapable`](modules/Framework.md#tapable)<`I`\> \| `I` |

##### Returns

`I`

#### Defined in

[packages/@roots/bud-framework/src/Framework/access.ts:20](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/access.ts#L20)

___

### Make

Ƭ **Make**: (`this`: [`Framework`](classes/Framework.md), `name`: `string`, `tap?`: [`Tapable`](modules/Framework.md#tapable)) => [`Framework`](classes/Framework.md)

#### Type declaration

▸ (`this`, `name`, `tap?`): [`Framework`](classes/Framework.md)

 Make a child compiler.

 **make** takes two parameters:

 - The **name** of the new compiler
 - An optional callback to use for configuring the compiler.

 ```js
 bud.make('scripts', child => child.entry('app', 'app.js'))
 ```

 This function returns the parent bud instance for further chaining. It is also possible to reference the parent instance using [Framework.parent](classes/Framework.md#parent).

 ```js
 make('scripts', child => {
   child.entry('app', 'app.js')
   child.parent.dev({
     // ...
   })
 })
 ```

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Framework`](classes/Framework.md) |
| `name` | `string` |
| `tap?` | [`Tapable`](modules/Framework.md#tapable) |

##### Returns

[`Framework`](classes/Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/make.ts:28](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/make.ts#L28)

___

### When

Ƭ **When**: (`this`: [`Framework`](classes/Framework.md), `test`: (`app`: [`Framework`](classes/Framework.md)) => `boolean` \| `boolean`, `trueCase`: (`app`: [`Framework`](classes/Framework.md)) => `any`, `falseCase?`: (`app`: [`Framework`](classes/Framework.md)) => `any`) => [`Framework`](classes/Framework.md)

#### Type declaration

▸ (`this`, `test`, `trueCase`, `falseCase?`): [`Framework`](classes/Framework.md)

Executes a function if a given test is `true`.

- The first parameter is the conditional check.
- The second parameter is the function to run if `true`.
- The third parameter is optional; executed if the conditional is not `true`.

Only produce a vendor bundle when running in `production` mode:

```js
bud.when(bud.isProduction, () => bud.vendor())
```

Use `eval` sourcemap in development mode and `hidden-source-map` in production:

```js
bud.when(
  bud.isDevelopment,
  () => bud.devtool('eval'),
  () => bud.devtool('hidden-source-map'),
)
```

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Framework`](classes/Framework.md) |
| `test` | (`app`: [`Framework`](classes/Framework.md)) => `boolean` \| `boolean` |
| `trueCase` | (`app`: [`Framework`](classes/Framework.md)) => `any` |
| `falseCase?` | (`app`: [`Framework`](classes/Framework.md)) => `any` |

##### Returns

[`Framework`](classes/Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/when.ts:28](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/when.ts#L28)

## Functions

### access

▸ `Const` **access**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`any`

#### Defined in

[packages/@roots/bud-framework/src/Framework/access.ts:25](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/access.ts#L25)

___

### make

▸ `Const` **make**(`name`, `tap?`): [`Framework`](classes/Framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `tap?` | [`Tapable`](modules/Framework.md#tapable)<`any`\> |

#### Returns

[`Framework`](classes/Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/make.ts:34](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/make.ts#L34)

___

### when

▸ `Const` **when**(`test`, `trueCase`, `falseCase?`): [`Framework`](classes/Framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | `boolean` \| (`app`: [`Framework`](classes/Framework.md)) => `boolean` |
| `trueCase` | (`app`: [`Framework`](classes/Framework.md)) => `any` |
| `falseCase?` | (`app`: [`Framework`](classes/Framework.md)) => `any` |

#### Returns

[`Framework`](classes/Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/when.ts:35](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/when.ts#L35)
