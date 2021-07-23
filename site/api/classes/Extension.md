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

[packages/@roots/bud-framework/src/Extension.ts:28](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Extension.ts#L28)

## Properties

### \_app

• `Protected` **\_app**: () => [`Framework`](Framework.md)

#### Type declaration

▸ (): [`Framework`](Framework.md)

##### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:22](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Extension.ts#L22)

___

### \_module

• `Protected` **\_module**: [`Module`](../interfaces/Module.md)<`any`, `any`\>

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:20](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Extension.ts#L20)

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.md)

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:37](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Extension.ts#L37)

___

### make

• `get` **make**(): [`Make`](../namespaces/Module.md#make)<`any`, `any`\>

#### Returns

[`Make`](../namespaces/Module.md#make)<`any`, `any`\>

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:68](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Extension.ts#L68)

• `set` **make**(`make`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `make` | [`Make`](../namespaces/Module.md#make)<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:83](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Extension.ts#L83)

___

### module

• `get` **module**(): [`Module`](../interfaces/Module.md)<`any`, `any`\>

#### Returns

[`Module`](../interfaces/Module.md)<`any`, `any`\>

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:33](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Extension.ts#L33)

___

### name

• `get` **name**(): `string` \| `number`

#### Returns

`string` \| `number`

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:41](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Extension.ts#L41)

___

### options

• `get` **options**(): `any`

#### Returns

`any`

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:45](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Extension.ts#L45)

• `set` **options**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `any` |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:49](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Extension.ts#L49)

___

### when

• `get` **when**(): [`When`](../namespaces/Module.md#when)<`any`\>

#### Returns

[`When`](../namespaces/Module.md#when)<`any`\>

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:53](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Extension.ts#L53)

• `set` **when**(`when`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `when` | [`When`](../namespaces/Module.md#when)<`any`\> |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:64](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Extension.ts#L64)

## Methods

### boot

▸ `Abstract` **boot**(): [`Extension`](Extension.md)

#### Returns

[`Extension`](Extension.md)

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:26](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Extension.ts#L26)

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

[packages/@roots/bud-framework/src/Extension.ts:93](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Extension.ts#L93)

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

[packages/@roots/bud-framework/src/Extension.ts:88](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Extension.ts#L88)

___

### register

▸ `Abstract` **register**(): [`Extension`](Extension.md)

#### Returns

[`Extension`](Extension.md)

#### Defined in

[packages/@roots/bud-framework/src/Extension.ts:24](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Extension.ts#L24)

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

[packages/@roots/bud-framework/src/Extension.ts:101](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Extension.ts#L101)
