---
id: "Dependencies"
title: "Class: Dependencies"
sidebar_label: "Dependencies"
sidebar_position: 0
custom_edit_url: null
---

Service: Dependencies

**`sealed`**

## Hierarchy

- [`Service`](Service.md)<``null``\>

  ↳ **`Dependencies`**

## Constructors

### constructor

• **new Dependencies**(`app`)

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

### manager

• **manager**: `Dependencies`

Handles interacting with package manager

#### Defined in

[packages/@roots/bud/src/services/Dependencies/index.tsx:23](https://github.com/roots/bud/blob/a5a389b4/packages/@roots/bud/src/services/Dependencies/index.tsx#L23)

___

### name

• **name**: `string` = `'dependencies'`

{@inheritDoc Service.name}

#### Overrides

Service.name

#### Defined in

[packages/@roots/bud/src/services/Dependencies/index.tsx:18](https://github.com/roots/bud/blob/a5a389b4/packages/@roots/bud/src/services/Dependencies/index.tsx#L18)

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

#### Inherited from

[Service](Service.md).[bootstrapped](Service.md#bootstrapped)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:47

___

### install

▸ **install**(`deps`): `void`

Install an array of dependencies and/or devDependencies

**`decorator`** `@bind`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deps` | { `name`: `string` ; `source`: `string` ; `type`: ``"dependencies"`` \| ``"devDependencies"`` ; `ver`: `string`  }[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud/src/services/Dependencies/index.tsx:68](https://github.com/roots/bud/blob/a5a389b4/packages/@roots/bud/src/services/Dependencies/index.tsx#L68)

___

### readProjectJson

▸ **readProjectJson**(): `any`

Read project JSON and return as a hash

**`decorator`** `@bind`

#### Returns

`any`

#### Defined in

[packages/@roots/bud/src/services/Dependencies/index.tsx:40](https://github.com/roots/bud/blob/a5a389b4/packages/@roots/bud/src/services/Dependencies/index.tsx#L40)

___

### register

▸ **register**(): `void`

{@inheritDoc Service.register}

#### Returns

`void`

#### Overrides

[Service](Service.md).[register](Service.md#register)

#### Defined in

[packages/@roots/bud/src/services/Dependencies/index.tsx:28](https://github.com/roots/bud/blob/a5a389b4/packages/@roots/bud/src/services/Dependencies/index.tsx#L28)

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

___

### shouldInstall

▸ **shouldInstall**(`dep`): `boolean`

Returns a boolean value representing if a package is eligible for installation

**`decorator`** `@bind`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dep` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/@roots/bud/src/services/Dependencies/index.tsx:50](https://github.com/roots/bud/blob/a5a389b4/packages/@roots/bud/src/services/Dependencies/index.tsx#L50)
