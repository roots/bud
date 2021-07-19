---
id: "Extension"
title: "Class: Extension"
sidebar_label: "Extension"
sidebar_position: 0
custom_edit_url: null
---

**`interface`** Extension

Abstract class

## Constructors

### constructor

• **new Extension**(`app`, `extension`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |
| `extension` | [`Module`](../interfaces/Module.md)<`any`, `any`\> |

#### Defined in

bud-framework/src/Extension.ts:23

## Properties

### \_app

• `Protected` **\_app**: () => [`Framework`](Framework.md)

#### Type declaration

▸ (): [`Framework`](Framework.md)

##### Returns

[`Framework`](Framework.md)

#### Defined in

bud-framework/src/Extension.ts:21

___

### \_module

• `Protected` **\_module**: [`Module`](../interfaces/Module.md)<`any`, `any`\>

#### Defined in

bud-framework/src/Extension.ts:19

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.md)

#### Returns

[`Framework`](Framework.md)

#### Defined in

bud-framework/src/Extension.ts:49

___

### make

• `get` **make**(): [`Make`](../modules/Module.md#make)<`any`, `any`\>

#### Returns

[`Make`](../modules/Module.md#make)<`any`, `any`\>

#### Defined in

bud-framework/src/Extension.ts:80

• `set` **make**(`make`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `make` | [`Make`](../modules/Module.md#make)<`any`, `any`\> |

#### Returns

`void`

#### Defined in

bud-framework/src/Extension.ts:95

___

### module

• `get` **module**(): [`Module`](../interfaces/Module.md)<`any`, `any`\>

#### Returns

[`Module`](../interfaces/Module.md)<`any`, `any`\>

#### Defined in

bud-framework/src/Extension.ts:45

___

### name

• `get` **name**(): `string` \| `number`

#### Returns

`string` \| `number`

#### Defined in

bud-framework/src/Extension.ts:53

___

### options

• `get` **options**(): `any`

#### Returns

`any`

#### Defined in

bud-framework/src/Extension.ts:57

• `set` **options**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `any` |

#### Returns

`void`

#### Defined in

bud-framework/src/Extension.ts:61

___

### when

• `get` **when**(): [`When`](../modules/Module.md#when)<`any`\>

#### Returns

[`When`](../modules/Module.md#when)<`any`\>

#### Defined in

bud-framework/src/Extension.ts:65

• `set` **when**(`when`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `when` | [`When`](../modules/Module.md#when)<`any`\> |

#### Returns

`void`

#### Defined in

bud-framework/src/Extension.ts:76

## Methods

### boot

▸ `Abstract` **boot**(): [`Extension`](Extension.md)

#### Returns

[`Extension`](Extension.md)

#### Defined in

bud-framework/src/Extension.ts:101

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

bud-framework/src/Extension.ts:34

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

bud-framework/src/Extension.ts:29

___

### register

▸ `Abstract` **register**(): [`Extension`](Extension.md)

#### Returns

[`Extension`](Extension.md)

#### Defined in

bud-framework/src/Extension.ts:99

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

bud-framework/src/Extension.ts:41
