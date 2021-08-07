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

packages/@roots/bud-framework/types/Module.d.ts:50

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

packages/@roots/bud-framework/types/Module.d.ts:55

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

packages/@roots/bud-framework/types/Module.d.ts:57

___

### Make

Ƭ **Make**<`Plugin`, `Opts`\>: (`options?`: [`Container`](../classes/Container.md)<`Opts`\>, `app?`: [`Framework`](../classes/Framework.md)) => `Plugin`

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
| `options?` | [`Container`](../classes/Container.md)<`Opts`\> |
| `app?` | [`Framework`](../classes/Framework.md) |

##### Returns

`Plugin`

#### Defined in

packages/@roots/bud-framework/types/Module.d.ts:59

___

### Name

Ƭ **Name**: keyof [`Extensions`](../interfaces/Framework.Extensions.md)

#### Defined in

packages/@roots/bud-framework/types/Module.d.ts:49

___

### Options

Ƭ **Options**<`T`\>: `T` \| (`app`: [`Framework`](../classes/Framework.md)) => `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

packages/@roots/bud-framework/types/Module.d.ts:58

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

packages/@roots/bud-framework/types/Module.d.ts:56

___

### When

Ƭ **When**<`T`\>: (`app`: [`Framework`](../classes/Framework.md), `opt?`: [`Container`](../classes/Container.md)<`T`\>) => `boolean` \| `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

packages/@roots/bud-framework/types/Module.d.ts:60
