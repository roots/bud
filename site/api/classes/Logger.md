---
id: "Logger"
title: "Class: Logger"
sidebar_label: "Logger"
sidebar_position: 0
custom_edit_url: null
---

**`sealed`**

## Hierarchy

- [`Service`](Service.md)

  ↳ **`Logger`**

## Implements

- `Contract`

## Constructors

### constructor

• **new Logger**(`app`)

Class constructor

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Overrides

[Service](Service.md).[constructor](Service.md#constructor)

#### Defined in

[packages/@roots/bud/src/services/Logger/index.ts:25](https://github.com/roots/bud/blob/0f52a7c3/packages/@roots/bud/src/services/Logger/index.ts#L25)

## Properties

### instance

• **instance**: `Signale`<`DefaultMethods`\>

Logger instance get accessor

#### Implementation of

Contract.instance

#### Defined in

[packages/@roots/bud/src/services/Logger/index.ts:20](https://github.com/roots/bud/blob/0f52a7c3/packages/@roots/bud/src/services/Logger/index.ts#L20)

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

#### Implementation of

Contract.bindClass

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

#### Implementation of

Contract.bindMacro

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

#### Implementation of

Contract.boot

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

#### Implementation of

Contract.booted

#### Inherited from

[Service](Service.md).[booted](Service.md#booted)

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

#### Implementation of

Contract.bootstrap

#### Inherited from

[Service](Service.md).[bootstrap](Service.md#bootstrap)

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

#### Implementation of

Contract.bootstrapped

#### Inherited from

[Service](Service.md).[bootstrapped](Service.md#bootstrapped)

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

#### Implementation of

Contract.register

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

#### Implementation of

Contract.registered

#### Inherited from

[Service](Service.md).[registered](Service.md#registered)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:65
