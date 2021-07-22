---
id: "Module"
title: "Namespace: Module"
sidebar_label: "Module"
sidebar_position: 0
custom_edit_url: null
---

**`namespace`** Module

## Type aliases

### Api

Ƭ **Api**: (`app`: [`Framework`](../classes/Framework.md)) => { [key: string]: `any`;  } \| { [key: string]: `any`;  }

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:65](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Module.ts#L65)

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

[packages/@roots/bud-framework/src/Module.ts:69](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Module.ts#L69)

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

[packages/@roots/bud-framework/src/Module.ts:71](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Module.ts#L71)

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

[packages/@roots/bud-framework/src/Module.ts:75](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Module.ts#L75)

___

### Name

Ƭ **Name**: keyof [`Extensions`](../interfaces/Framework.Extensions.md)

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:63](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Module.ts#L63)

___

### Options

Ƭ **Options**<`T`\>: `T` \| (`app`: [`Framework`](../classes/Framework.md)) => `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:73](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Module.ts#L73)

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

[packages/@roots/bud-framework/src/Module.ts:70](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Module.ts#L70)

___

### When

Ƭ **When**<`T`\>: (`app`: [`Framework`](../classes/Framework.md), `opt?`: `Container`<`T`\>) => `boolean` \| `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[packages/@roots/bud-framework/src/Module.ts:80](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Module.ts#L80)
