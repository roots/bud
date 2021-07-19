---
id: "Module"
title: "Namespace: Module"
sidebar_label: "Module"
sidebar_position: 0
custom_edit_url: null
---

## Type aliases

### Api

Ƭ **Api**: (`app`: [`Framework`](../classes/Framework.md)) => { [key: string]: `any`;  } \| { [key: string]: `any`;  }

#### Defined in

bud-framework/src/Module.ts:58

___

### Boot

Ƭ **Boot**: (`app`: [`Framework`](../classes/Framework.md)) => `any`

#### Type declaration

▸ (`app`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

##### Returns

`any`

#### Defined in

bud-framework/src/Module.ts:62

___

### Config

Ƭ **Config**: (`app`: [`Framework`](../classes/Framework.md)) => `any`

#### Type declaration

▸ (`app`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

##### Returns

`any`

#### Defined in

bud-framework/src/Module.ts:64

___

### Make

Ƭ **Make**<`Plugin`, `Opts`\>: (`options?`: `Container`<`Opts`\>, `app?`: [`Framework`](../classes/Framework.md)) => `Plugin`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Plugin` | `any` |
| `Opts` | `any` |

#### Type declaration

▸ (`options?`, `app?`): `Plugin`

##### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Container`<`Opts`\> |
| `app?` | [`Framework`](../classes/Framework.md) |

##### Returns

`Plugin`

#### Defined in

bud-framework/src/Module.ts:68

___

### Name

Ƭ **Name**: keyof [`Extensions`](../interfaces/Framework.Extensions.md)

#### Defined in

bud-framework/src/Module.ts:56

___

### Options

Ƭ **Options**<`T`\>: `T` \| (`app`: [`Framework`](../classes/Framework.md)) => `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

bud-framework/src/Module.ts:66

___

### Register

Ƭ **Register**: (`app`: [`Framework`](../classes/Framework.md)) => `any`

#### Type declaration

▸ (`app`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

##### Returns

`any`

#### Defined in

bud-framework/src/Module.ts:63

___

### When

Ƭ **When**<`T`\>: (`app`: [`Framework`](../classes/Framework.md), `opt?`: `Container`<`T`\>) => `boolean` \| `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

bud-framework/src/Module.ts:73
