---
id: "extension"
title: "Class: Extension"
sidebar_label: "Extension"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Base`

  ↳ **`Extension`**

## Constructors

### constructor

• **new Extension**(`app`, `extension`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |
| `extension` | [`Module`](../interfaces/module.md)<`any`, `any`\> |

#### Inherited from

Base.constructor

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Base.ts:12](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Base.ts#L12)

## Properties

### \_app

• `Protected` **\_app**: () => [`Framework`](framework.md)

#### Type declaration

▸ (): [`Framework`](framework.md)

##### Returns

[`Framework`](framework.md)

#### Inherited from

Base.\_app

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Base.ts:12](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Base.ts#L12)

___

### \_module

• `Protected` **\_module**: [`Module`](../interfaces/module.md)<`any`, `any`\>

#### Inherited from

Base.\_module

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Base.ts:10](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Base.ts#L10)

## Accessors

### app

• `get` **app**(): [`Framework`](framework.md)

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Base.ts:40](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Base.ts#L40)

___

### make

• `get` **make**(): [`Make`](../modules/module.md#make)<`any`, `any`\>

#### Returns

[`Make`](../modules/module.md#make)<`any`, `any`\>

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Base.ts:71](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Base.ts#L71)

• `set` **make**(`make`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `make` | [`Make`](../modules/module.md#make)<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Base.ts:86](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Base.ts#L86)

___

### module

• `get` **module**(): [`Module`](../interfaces/module.md)<`any`, `any`\>

#### Returns

[`Module`](../interfaces/module.md)<`any`, `any`\>

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Base.ts:36](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Base.ts#L36)

___

### name

• `get` **name**(): `string` \| `number`

#### Returns

`string` \| `number`

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Base.ts:44](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Base.ts#L44)

___

### options

• `get` **options**(): `any`

#### Returns

`any`

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Base.ts:48](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Base.ts#L48)

• `set` **options**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `any` |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Base.ts:52](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Base.ts#L52)

___

### when

• `get` **when**(): [`When`](../modules/module.md#when)<`any`\>

#### Returns

[`When`](../modules/module.md#when)<`any`\>

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Base.ts:56](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Base.ts#L56)

• `set` **when**(`when`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `when` | [`When`](../modules/module.md#when)<`any`\> |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Base.ts:67](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Base.ts#L67)

## Methods

### boot

▸ `Abstract` **boot**(): [`Extension`](extension.md)

#### Returns

[`Extension`](extension.md)

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Extension.ts:7](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Extension.ts#L7)

___

### get

▸ **get**(`key`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`any`

#### Inherited from

Base.get

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Base.ts:25](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Base.ts#L25)

___

### makeKey

▸ **makeKey**(`key`): [`Name`](../modules/hooks.md#name)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`Name`](../modules/hooks.md#name)

#### Inherited from

Base.makeKey

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Base.ts:20](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Base.ts#L20)

___

### register

▸ `Abstract` **register**(): [`Extension`](extension.md)

#### Returns

[`Extension`](extension.md)

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Extension.ts:5](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Extension.ts#L5)

___

### set

▸ **set**(`key`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Inherited from

Base.set

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Base.ts:32](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Base.ts#L32)
