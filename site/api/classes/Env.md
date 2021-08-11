---
id: "Env"
title: "Class: Env"
sidebar_label: "Env"
sidebar_position: 0
custom_edit_url: null
---

**`sealed`**

## Hierarchy

- [`Service`](Service.md)<[`Index`](../namespaces/Framework.md#index)<`any`\>\>

  ↳ **`Env`**

## Constructors

### constructor

• **new Env**(`app`)

Class constructor

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Inherited from

[Service](Service.md).[constructor](Service.md#constructor)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:87

## Properties

### name

• **name**: `string` = `'env'`

{@inheritDoc Service.name}

#### Overrides

Service.name

#### Defined in

[packages/@roots/bud/src/services/Env/index.ts:12](https://github.com/roots/bud/blob/95b5c12b/packages/@roots/bud/src/services/Env/index.ts#L12)

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.md)

Access [Framework](Framework.md) instance

**`readonly`**

#### Returns

[`Framework`](Framework.md)

#### Defined in

packages/@roots/bud-framework/types/Bootstrapper.d.ts:25

___

### envPath

• `get` **envPath**(): `string`

Returns path to .env file

**`readonly`**

#### Returns

`string`

#### Defined in

[packages/@roots/bud/src/services/Env/index.ts:19](https://github.com/roots/bud/blob/95b5c12b/packages/@roots/bud/src/services/Env/index.ts#L19)

## Methods

### bindClass

▸ **bindClass**<`T`\>(`properties`): `void`

Bind a {@link Class} to the [Framework](Framework.md).

**`remarks`**
Constructor parameters can be specified using an array.

**`example`**
Bind to `app.bindingName`:

```js
app.service.bindClass({bindingName: BindingClass})
```

**`example`**
Specify constructor parameters to pass to `BindingClass` during instantiation.

```js
app.service.bindClass({bindingName: [BindingClass, foo, bar]})
```

**`decorator`** `@bind`

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | { [key: string]: `Class` \| [`Class`, `any`[]];  } | Object typing |

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `T` |

#### Returns

`void`

#### Inherited from

[Service](Service.md).[bindClass](Service.md#bindclass)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:127

___

### bindMacro

▸ **bindMacro**<`T`\>(`properties`): `void`

Bind a {@link CallableFunction} to the [Framework](Framework.md)

**`example`**
Bind to `app.boundFnName`

```js
app.service.bindClass({boundFnName: BindingClass})
```

**`decorator`** `@bind`

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | { [key: string]: `CallableFunction`;  } | Object typing |

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `T` |

#### Returns

`void`

#### Inherited from

[Service](Service.md).[bindMacro](Service.md#bindmacro)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:101

___

### boot

▸ `Optional` **boot**(`app`): `any`

Lifecycle method: boot

**`remarks`**
`boot` is called once all services are registered. It should be safe for Services to reference one another.

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](Service.md).[boot](Service.md#boot)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:74

___

### booted

▸ `Optional` **booted**(`app`): `any`

Lifecycle method: booted

**`remarks`**
`booted` is called after all [Service.boot](Service.md#boot) callbacks are complete.

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](Service.md).[booted](Service.md#booted)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:83

___

### bootstrap

▸ **bootstrap**(): `void`

{@inheritDoc Service.bootstrap}

#### Returns

`void`

#### Overrides

[Service](Service.md).[bootstrap](Service.md#bootstrap)

#### Defined in

[packages/@roots/bud/src/services/Env/index.ts:34](https://github.com/roots/bud/blob/95b5c12b/packages/@roots/bud/src/services/Env/index.ts#L34)

___

### bootstrapped

▸ `Optional` **bootstrapped**(`app`): `any`

Lifecycle method: bootstrapped

**`remarks`**
`bootstrapped` is called once all Services have been instantiated.

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](Service.md).[bootstrapped](Service.md#bootstrapped)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:47

___

### getParsedEnv

▸ **getParsedEnv**(): [`Index`](../namespaces/Framework.md#index)<`any`\>

get parsed .env hashmap

#### Returns

[`Index`](../namespaces/Framework.md#index)<`any`\>

#### Defined in

[packages/@roots/bud/src/services/Env/index.ts:27](https://github.com/roots/bud/blob/95b5c12b/packages/@roots/bud/src/services/Env/index.ts#L27)

___

### register

▸ `Optional` **register**(`app`): `any`

Lifecycle method: register

**`remarks`**
`register` is intended for Services to register functionalities, modules, and bind functions and classes.

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](Service.md).[register](Service.md#register)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:56

___

### registered

▸ `Optional` **registered**(`app`): `any`

Lifecycle method: registered

**`remarks`**
`registered` is called after all [Service.register](Service.md#register) callbacks are complete.

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](Service.md).[registered](Service.md#registered)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:65
