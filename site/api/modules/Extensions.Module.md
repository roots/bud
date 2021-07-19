---
id: "Extensions.Module"
title: "Namespace: Module"
sidebar_label: "Module"
custom_edit_url: null
---

[Extensions](Extensions.md).Module

## Type aliases

### Api

Ƭ **Api**: (`app`: [`Framework`](../classes/Framework.Framework-2.md)) => { [key: string]: `any`;  } \| { [key: string]: `any`;  }

#### Defined in

[bud-framework/src/Extensions/Module.ts:51](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L51)

___

### Boot

Ƭ **Boot**: (`app`: [`Framework`](../classes/Framework.Framework-2.md)) => `any`

#### Type declaration

▸ (`app`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.Framework-2.md) |

##### Returns

`any`

#### Defined in

[bud-framework/src/Extensions/Module.ts:55](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L55)

___

### Config

Ƭ **Config**: (`app`: [`Framework`](../classes/Framework.Framework-2.md)) => `any`

#### Type declaration

▸ (`app`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.Framework-2.md) |

##### Returns

`any`

#### Defined in

[bud-framework/src/Extensions/Module.ts:57](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L57)

___

### Make

Ƭ **Make**<`Plugin`, `Opts`\>: (`options?`: `Container`<`Opts`\>, `app?`: [`Framework`](../classes/Framework.Framework-2.md)) => `Plugin`

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
| `app?` | [`Framework`](../classes/Framework.Framework-2.md) |

##### Returns

`Plugin`

#### Defined in

[bud-framework/src/Extensions/Module.ts:61](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L61)

___

### Name

Ƭ **Name**: keyof [`Extensions`](../interfaces/Framework.Framework-1.Extensions.md)

#### Defined in

[bud-framework/src/Extensions/Module.ts:49](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L49)

___

### Options

Ƭ **Options**<`T`\>: `T` \| (`app`: [`Framework`](../classes/Framework.Framework-2.md)) => `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[bud-framework/src/Extensions/Module.ts:59](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L59)

___

### Register

Ƭ **Register**: (`app`: [`Framework`](../classes/Framework.Framework-2.md)) => `any`

#### Type declaration

▸ (`app`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.Framework-2.md) |

##### Returns

`any`

#### Defined in

[bud-framework/src/Extensions/Module.ts:56](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L56)

___

### When

Ƭ **When**<`T`\>: (`app`: [`Framework`](../classes/Framework.Framework-2.md), `opt?`: `Container`<`T`\>) => `boolean` \| `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[bud-framework/src/Extensions/Module.ts:66](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Extensions/Module.ts#L66)
