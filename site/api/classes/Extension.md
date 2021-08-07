---
id: "Extension"
title: "Class: Extension"
sidebar_label: "Extension"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Extension**(`app`, `extension`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |
| `extension` | [`Module`](../interfaces/Module.md)<`any`, `any`\> |

#### Defined in

packages/@roots/bud-framework/types/Extension.d.ts:10

## Properties

### \_app

• `Protected` **\_app**: () => [`Framework`](Framework.md)

#### Type declaration

▸ (): [`Framework`](Framework.md)

##### Returns

[`Framework`](Framework.md)

#### Defined in

packages/@roots/bud-framework/types/Extension.d.ts:7

___

### \_module

• `Protected` **\_module**: [`Module`](../interfaces/Module.md)<`any`, `any`\>

#### Defined in

packages/@roots/bud-framework/types/Extension.d.ts:6

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.md)

#### Returns

[`Framework`](Framework.md)

#### Defined in

packages/@roots/bud-framework/types/Extension.d.ts:12

___

### apply

• `get` **apply**(): `any`

#### Returns

`any`

#### Defined in

packages/@roots/bud-framework/types/Extension.d.ts:22

___

### make

• `get` **make**(): [`Make`](../namespaces/Module.md#make)<`any`, `any`\>

**`property`** {Module.Make} make

#### Returns

[`Make`](../namespaces/Module.md#make)<`any`, `any`\>

#### Defined in

packages/@roots/bud-framework/types/Extension.d.ts:21

• `set` **make**(`make`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `make` | [`Make`](../namespaces/Module.md#make)<`any`, `any`\> |

#### Returns

`void`

#### Defined in

packages/@roots/bud-framework/types/Extension.d.ts:23

___

### module

• `get` **module**(): [`Module`](../interfaces/Module.md)<`any`, `any`\>

#### Returns

[`Module`](../interfaces/Module.md)<`any`, `any`\>

#### Defined in

packages/@roots/bud-framework/types/Extension.d.ts:11

___

### name

• `get` **name**(): `string` \| `number`

#### Returns

`string` \| `number`

#### Defined in

packages/@roots/bud-framework/types/Extension.d.ts:13

___

### options

• `get` **options**(): `any`

#### Returns

`any`

#### Defined in

packages/@roots/bud-framework/types/Extension.d.ts:14

• `set` **options**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `any` |

#### Returns

`void`

#### Defined in

packages/@roots/bud-framework/types/Extension.d.ts:15

___

### when

• `get` **when**(): [`When`](../namespaces/Module.md#when)<`any`\>

#### Returns

[`When`](../namespaces/Module.md#when)<`any`\>

#### Defined in

packages/@roots/bud-framework/types/Extension.d.ts:16

• `set` **when**(`when`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `when` | [`When`](../namespaces/Module.md#when)<`any`\> |

#### Returns

`void`

#### Defined in

packages/@roots/bud-framework/types/Extension.d.ts:17

## Methods

### boot

▸ `Abstract` **boot**(): [`Extension`](Extension.md)

#### Returns

[`Extension`](Extension.md)

#### Defined in

packages/@roots/bud-framework/types/Extension.d.ts:9

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

packages/@roots/bud-framework/types/Extension.d.ts:25

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

packages/@roots/bud-framework/types/Extension.d.ts:24

___

### register

▸ `Abstract` **register**(): [`Extension`](Extension.md)

#### Returns

[`Extension`](Extension.md)

#### Defined in

packages/@roots/bud-framework/types/Extension.d.ts:8

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

packages/@roots/bud-framework/types/Extension.d.ts:26
