---
id: "Extension"
title: "Class: Extension"
sidebar_label: "Extension"
sidebar_position: 0
custom_edit_url: null
---

**`interface`** Extension

Abstract Extension

## Constructors

### constructor

• **new Extension**(`app`, `extension`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |
| `extension` | [`Module`](../interfaces/Module.md)<`any`, `any`\> |

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:27](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extension.ts#L27)

## Properties

### \_app

• `Protected` **\_app**: () => [`Framework`](Framework.md)

#### Type declaration

▸ (): [`Framework`](Framework.md)

##### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:21](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extension.ts#L21)

___

### \_module

• `Protected` **\_module**: [`Module`](../interfaces/Module.md)<`any`, `any`\>

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:19](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extension.ts#L19)

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.md)

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:36](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extension.ts#L36)

___

### make

• `get` **make**(): [`Make`](../modules/Module.md#make)<`any`, `any`\>

#### Returns

[`Make`](../modules/Module.md#make)<`any`, `any`\>

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:67](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extension.ts#L67)

• `set` **make**(`make`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `make` | [`Make`](../modules/Module.md#make)<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:82](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extension.ts#L82)

___

### module

• `get` **module**(): [`Module`](../interfaces/Module.md)<`any`, `any`\>

#### Returns

[`Module`](../interfaces/Module.md)<`any`, `any`\>

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:32](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extension.ts#L32)

___

### name

• `get` **name**(): `string` \| `number`

#### Returns

`string` \| `number`

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:40](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extension.ts#L40)

___

### options

• `get` **options**(): `any`

#### Returns

`any`

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:44](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extension.ts#L44)

• `set` **options**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `any` |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:48](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extension.ts#L48)

___

### when

• `get` **when**(): [`When`](../modules/Module.md#when)<`any`\>

#### Returns

[`When`](../modules/Module.md#when)<`any`\>

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:52](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extension.ts#L52)

• `set` **when**(`when`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `when` | [`When`](../modules/Module.md#when)<`any`\> |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:63](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extension.ts#L63)

## Methods

### boot

▸ `Abstract` **boot**(): [`Extension`](Extension.md)

#### Returns

[`Extension`](Extension.md)

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:25](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extension.ts#L25)

___

### get

▸ **get**(`key`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`any`

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:92](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extension.ts#L92)

___

### makeKey

▸ **makeKey**(`key`): `Name`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Name`

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:87](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extension.ts#L87)

___

### register

▸ `Abstract` **register**(): [`Extension`](Extension.md)

#### Returns

[`Extension`](Extension.md)

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:23](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extension.ts#L23)

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

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:100](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Extension.ts#L100)
