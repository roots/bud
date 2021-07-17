---
id: "module"
title: "Namespace: Module"
sidebar_label: "Module"
sidebar_position: 0
custom_edit_url: null
---

## Type aliases

### Api

Ƭ **Api**: (`app`: `Framework`) => { [key: string]: `any`;  } \| { [key: string]: `any`;  }

#### Defined in

bud-framework/types/Extensions/Module.d.ts:41

___

### Boot

Ƭ **Boot**: (`app`: `Framework`) => `any`

#### Type declaration

▸ (`app`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Framework` |

##### Returns

`any`

#### Defined in

bud-framework/types/Extensions/Module.d.ts:46

___

### Config

Ƭ **Config**: (`app`: `Framework`) => `any`

#### Type declaration

▸ (`app`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Framework` |

##### Returns

`any`

#### Defined in

bud-framework/types/Extensions/Module.d.ts:48

___

### Make

Ƭ **Make**<`Plugin`, `Opts`\>: (`options?`: `Container`<`Opts`\>, `app?`: `Framework`) => `Plugin`

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
| `app?` | `Framework` |

##### Returns

`Plugin`

#### Defined in

bud-framework/types/Extensions/Module.d.ts:50

___

### Name

Ƭ **Name**: keyof `Framework.Extensions`

#### Defined in

bud-framework/types/Extensions/Module.d.ts:40

___

### Options

Ƭ **Options**<`T`\>: `T` \| (`app`: `Framework`) => `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

bud-framework/types/Extensions/Module.d.ts:49

___

### Register

Ƭ **Register**: (`app`: `Framework`) => `any`

#### Type declaration

▸ (`app`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Framework` |

##### Returns

`any`

#### Defined in

bud-framework/types/Extensions/Module.d.ts:47

___

### When

Ƭ **When**<`T`\>: (`app`: `Framework`, `opt?`: `Container`<`T`\>) => `boolean` \| `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

bud-framework/types/Extensions/Module.d.ts:51
