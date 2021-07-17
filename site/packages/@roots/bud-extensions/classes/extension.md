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

## Implements

- [`Module`](../interfaces/module.md)

## Constructors

### constructor

• **new Extension**(`app`, `extension`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Framework` |
| `extension` | [`Module`](../interfaces/module.md)<`any`, `any`\> |

#### Inherited from

Base.constructor

#### Defined in

bud-framework/types/Extensions/Base.d.ts:7

## Properties

### \_app

• `Protected` **\_app**: () => `Framework`

#### Type declaration

▸ (): `Framework`

##### Returns

`Framework`

#### Inherited from

Base.\_app

#### Defined in

bud-framework/types/Extensions/Base.d.ts:7

___

### \_module

• `Protected` **\_module**: [`Module`](../interfaces/module.md)<`any`, `any`\>

#### Inherited from

Base.\_module

#### Defined in

bud-framework/types/Extensions/Base.d.ts:6

## Accessors

### app

• `get` **app**(): `Framework`

#### Returns

`Framework`

#### Defined in

bud-framework/types/Extensions/Base.d.ts:13

___

### make

• `get` **make**(): [`Make`](../modules/module.md#make)<`any`, `any`\>

Returns an instantiated webpack plugin

#### Returns

[`Make`](../modules/module.md#make)<`any`, `any`\>

#### Implementation of

[Module](../interfaces/module.md).[make](../interfaces/module.md#make)

#### Defined in

bud-framework/types/Extensions/Base.d.ts:19

• `set` **make**(`make`): `void`

Returns an instantiated webpack plugin

#### Parameters

| Name | Type |
| :------ | :------ |
| `make` | [`Make`](../modules/module.md#make)<`any`, `any`\> |

#### Returns

`void`

#### Implementation of

[Module](../interfaces/module.md).[make](../interfaces/module.md#make)

#### Defined in

bud-framework/types/Extensions/Base.d.ts:20

___

### module

• `get` **module**(): [`Module`](../interfaces/module.md)<`any`, `any`\>

#### Returns

[`Module`](../interfaces/module.md)<`any`, `any`\>

#### Defined in

bud-framework/types/Extensions/Base.d.ts:12

___

### name

• `get` **name**(): `string` \| `number`

The module name

#### Returns

`string` \| `number`

#### Implementation of

[Module](../interfaces/module.md).[name](../interfaces/module.md#name)

#### Defined in

bud-framework/types/Extensions/Base.d.ts:14

___

### options

• `get` **options**(): `any`

Options registered with the extension

#### Returns

`any`

#### Implementation of

[Module](../interfaces/module.md).[options](../interfaces/module.md#options)

#### Defined in

bud-framework/types/Extensions/Base.d.ts:15

• `set` **options**(`options`): `void`

Options registered with the extension

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `any` |

#### Returns

`void`

#### Implementation of

[Module](../interfaces/module.md).[options](../interfaces/module.md#options)

#### Defined in

bud-framework/types/Extensions/Base.d.ts:16

___

### when

• `get` **when**(): [`When`](../modules/module.md#when)<`any`\>

Returns a boolean determining if
a webpack plugin should be used in
compilation.

#### Returns

[`When`](../modules/module.md#when)<`any`\>

#### Implementation of

[Module](../interfaces/module.md).[when](../interfaces/module.md#when)

#### Defined in

bud-framework/types/Extensions/Base.d.ts:17

• `set` **when**(`when`): `void`

Returns a boolean determining if
a webpack plugin should be used in
compilation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `when` | [`When`](../modules/module.md#when)<`any`\> |

#### Returns

`void`

#### Implementation of

[Module](../interfaces/module.md).[when](../interfaces/module.md#when)

#### Defined in

bud-framework/types/Extensions/Base.d.ts:18

## Methods

### boot

▸ **boot**(): [`Extension`](extension.md)

#### Returns

[`Extension`](extension.md)

#### Implementation of

Module.boot

#### Overrides

Base.boot

#### Defined in

bud-extensions/types/Extension/index.d.ts:4

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

bud-framework/types/Extensions/Base.d.ts:10

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

bud-framework/types/Extensions/Base.d.ts:9

___

### register

▸ **register**(): [`Extension`](extension.md)

#### Returns

[`Extension`](extension.md)

#### Implementation of

Module.register

#### Overrides

Base.register

#### Defined in

bud-extensions/types/Extension/index.d.ts:3

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

bud-framework/types/Extensions/Base.d.ts:11
