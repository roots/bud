---
id: "Bud"
title: "Class: Bud"
sidebar_label: "Bud"
sidebar_position: 0
custom_edit_url: null
---

Bud is a frontend build framework combining the best parts of Symfony Encore and Laravel Mix

**`remarks`**
Many methods/properties are assigned to Bud's parent class [Framework](Framework.md), and not [Bud](Bud.md) itself.
If you are looking for a reference and it's not here check the definition of [Framework](Framework.md).

## Hierarchy

- [`Framework`](Framework.md)

  ↳ **`Bud`**

## Constructors

### constructor

• **new Bud**(`options`)

Class constructor

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Options`](../interfaces/Framework.Options.md) |

#### Overrides

[Framework](Framework.md).[constructor](Framework.md#constructor)

#### Defined in

[packages/@roots/bud/src/Bud/index.ts:25](https://github.com/roots/bud/blob/e51c85c2/packages/@roots/bud/src/Bud/index.ts#L25)

## Properties

### implementation

• **implementation**: [`Constructor`](../namespaces/Framework.md#constructor)

Concrete implementation of the [Framework interface](Framework.md)

**`remark`**
Fulfills [Framework.implementation](Framework.md#implementation)

#### Overrides

[Framework](Framework.md).[implementation](Framework.md#implementation)

#### Defined in

[packages/@roots/bud/src/Bud/index.ts:20](https://github.com/roots/bud/blob/e51c85c2/packages/@roots/bud/src/Bud/index.ts#L20)

## Accessors

### hasChildren

• `get` **hasChildren**(): `boolean`

Has children

**`readonly`**

#### Returns

`boolean`

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:67

___

### isDevelopment

• `get` **isDevelopment**(): `boolean`

True when [Framework.mode](Framework.md#mode) is `development`

#### Returns

`boolean`

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:208

___

### isParent

• `get` **isParent**(): `boolean`

Is parent

**`readonly`**

#### Returns

`boolean`

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:52

___

### isProduction

• `get` **isProduction**(): `boolean`

True when [Framework.mode](Framework.md#mode) is `production`

#### Returns

`boolean`

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:204
