---
id: "Extensions.Extension"
title: "Class: Extension"
sidebar_label: "Extension"
custom_edit_url: null
---

[Extensions](../modules/Extensions.md).Extension

## Hierarchy

- `Base`

  ↳ **`Extension`**

## Constructors

### constructor

• **new Extension**(`app`, `extension`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.Framework-2.md) |
| `extension` | [`Module`](../interfaces/Extensions.Module-1.md)<`any`, `any`\> |

#### Inherited from

Base.constructor

#### Defined in

[bud-framework/src/Extensions/Base.ts:14](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Base.ts#L14)

## Properties

### \_app

• `Protected` **\_app**: () => [`Framework`](Framework.Framework-2.md)

#### Type declaration

▸ (): [`Framework`](Framework.Framework-2.md)

##### Returns

[`Framework`](Framework.Framework-2.md)

#### Inherited from

Base.\_app

#### Defined in

[bud-framework/src/Extensions/Base.ts:12](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Base.ts#L12)

___

### \_module

• `Protected` **\_module**: [`Module`](../interfaces/Extensions.Module-1.md)<`any`, `any`\>

#### Inherited from

Base.\_module

#### Defined in

[bud-framework/src/Extensions/Base.ts:10](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Base.ts#L10)

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.Framework-2.md)

#### Returns

[`Framework`](Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Extensions/Base.ts:40](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Base.ts#L40)

___

### make

• `get` **make**(): [`Make`](../modules/Extensions.Module.md#make)<`any`, `any`\>

#### Returns

[`Make`](../modules/Extensions.Module.md#make)<`any`, `any`\>

#### Defined in

[bud-framework/src/Extensions/Base.ts:71](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Base.ts#L71)

• `set` **make**(`make`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `make` | [`Make`](../modules/Extensions.Module.md#make)<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[bud-framework/src/Extensions/Base.ts:86](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Base.ts#L86)

___

### module

• `get` **module**(): [`Module`](../interfaces/Extensions.Module-1.md)<`any`, `any`\>

#### Returns

[`Module`](../interfaces/Extensions.Module-1.md)<`any`, `any`\>

#### Defined in

[bud-framework/src/Extensions/Base.ts:36](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Base.ts#L36)

___

### name

• `get` **name**(): `string` \| `number`

#### Returns

`string` \| `number`

#### Defined in

[bud-framework/src/Extensions/Base.ts:44](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Base.ts#L44)

___

### options

• `get` **options**(): `any`

#### Returns

`any`

#### Defined in

[bud-framework/src/Extensions/Base.ts:48](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Base.ts#L48)

• `set` **options**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `any` |

#### Returns

`void`

#### Defined in

[bud-framework/src/Extensions/Base.ts:52](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Base.ts#L52)

___

### when

• `get` **when**(): [`When`](../modules/Extensions.Module.md#when)<`any`\>

#### Returns

[`When`](../modules/Extensions.Module.md#when)<`any`\>

#### Defined in

[bud-framework/src/Extensions/Base.ts:56](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Base.ts#L56)

• `set` **when**(`when`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `when` | [`When`](../modules/Extensions.Module.md#when)<`any`\> |

#### Returns

`void`

#### Defined in

[bud-framework/src/Extensions/Base.ts:67](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Base.ts#L67)

## Methods

### boot

▸ `Abstract` **boot**(): [`Extension`](Extensions.Extension.md)

#### Returns

[`Extension`](Extensions.Extension.md)

#### Defined in

[bud-framework/src/Extensions/Extension.ts:7](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Extension.ts#L7)

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

[bud-framework/src/Extensions/Base.ts:25](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Base.ts#L25)

___

### makeKey

▸ **makeKey**(`key`): `Name`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Name`

#### Inherited from

Base.makeKey

#### Defined in

[bud-framework/src/Extensions/Base.ts:20](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Base.ts#L20)

___

### register

▸ `Abstract` **register**(): [`Extension`](Extensions.Extension.md)

#### Returns

[`Extension`](Extensions.Extension.md)

#### Defined in

[bud-framework/src/Extensions/Extension.ts:5](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Extension.ts#L5)

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

[bud-framework/src/Extensions/Base.ts:32](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Base.ts#L32)
