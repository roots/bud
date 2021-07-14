---
id: "module"
title: "Namespace: Module"
sidebar_label: "Module"
sidebar_position: 0
custom_edit_url: null
---

## Type aliases

### Api

Ƭ **Api**: (`app`: [`Framework`](../classes/framework.md)) => { [key: string]: `any`;  } \| { [key: string]: `any`;  }

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:51](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L51)

___

### Boot

Ƭ **Boot**: (`app`: [`Framework`](../classes/framework.md)) => `any`

#### Type declaration

▸ (`app`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/framework.md) |

##### Returns

`any`

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:55](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L55)

___

### Config

Ƭ **Config**: (`app`: [`Framework`](../classes/framework.md)) => `any`

#### Type declaration

▸ (`app`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/framework.md) |

##### Returns

`any`

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:57](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L57)

___

### Make

Ƭ **Make**<`Plugin`, `Opts`\>: (`options?`: [`Container`](../classes/container.md)<`Opts`\>, `app?`: [`Framework`](../classes/framework.md)) => `Plugin`

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
| `options?` | [`Container`](../classes/container.md)<`Opts`\> |
| `app?` | [`Framework`](../classes/framework.md) |

##### Returns

`Plugin`

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:61](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L61)

___

### Name

Ƭ **Name**: keyof [`Extensions`](../interfaces/framework.extensions.md)

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:49](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L49)

___

### Options

Ƭ **Options**<`T`\>: `T` \| (`app`: [`Framework`](../classes/framework.md)) => `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:59](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L59)

___

### Register

Ƭ **Register**: (`app`: [`Framework`](../classes/framework.md)) => `any`

#### Type declaration

▸ (`app`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/framework.md) |

##### Returns

`any`

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:56](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L56)

___

### When

Ƭ **When**<`T`\>: (`app`: [`Framework`](../classes/framework.md), `opt?`: [`Container`](../classes/container.md)<`T`\>) => `boolean` \| `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[packages/@roots/bud-framework/src/Extensions/Module.ts:66](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Extensions/Module.ts#L66)
