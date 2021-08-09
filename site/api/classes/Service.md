---
id: "Service"
title: "Class: Service<T>"
sidebar_label: "Service"
sidebar_position: 0
custom_edit_url: null
---

Atomic unit of [Framework](Framework.md) functionality.

**`remarks`**
Services extend {@link Bootstrapper}, which provides container functions and access to the main [Framework](Framework.md) instance.

All services must be defined during instantiation of the [Framework](Framework.md).

A Service provides functionality through a series of lifecycle callbacks, which are all optional:

- [bootstrap](Service.md#bootstrap) is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
- [bootstrapped](Service.md#bootstrapped) is called once all Services have been instantiated.

- [register](Service.md#register) is intended for Services to register functionalities, modules, and bind functions and classes.
- [registered](Service.md#registered) is called after all [Service.register](Service.md#register) callbacks are complete.

- [boot](Service.md#boot) is called once all services are registered. It should be safe for Services to reference one another.
- [booted](Service.md#booted) is called after all [Service.boot](Service.md#boot) callbacks are complete.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | { [key: string]: `any`;  } | Container repository typing, if applicable |

## Hierarchy

- `Bootstrapper`<`T`\>

  ↳ **`Service`**

  ↳↳ [`Dependencies`](Dependencies.md)

  ↳↳ [`Env`](Env.md)

  ↳↳ [`Logger`](Logger.md)

  ↳↳ [`Store`](Store.md)

## Implemented by

- [`Api`](Api.md)
- [`Cache`](Cache.md)
- [`Dashboard`](Dashboard.md)
- [`Discovery`](Discovery.md)
- [`Extensions`](Extensions.md)
- [`Hooks`](Hooks.md)

## Constructors

### constructor

• **new Service**<`T`\>(`app`)

Class constructor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | { [key: string]: `any`;  } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Overrides

Bootstrapper&lt;T\&gt;.constructor

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:87

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.md)

Access [Framework](Framework.md) instance

**`readonly`**

#### Returns

[`Framework`](Framework.md)

#### Defined in

packages/@roots/bud-framework/types/Bootstrapper.d.ts:25

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

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:83

___

### bootstrap

▸ `Optional` **bootstrap**(`app`): `any`

Lifecycle method: bootstrap

**`remarks`**
`bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:38

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

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:47

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

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:65
