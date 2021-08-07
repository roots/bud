---
id: "Configuration"
title: "Interface: Configuration"
sidebar_label: "Configuration"
sidebar_position: 0
custom_edit_url: null
---

Framework configuration

## Properties

### build

• **build**: `Configuration`

Seed values for webpack config

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:110

___

### ci

• **ci**: `boolean`

Feature: CI mode

**`default`** false

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:34

___

### clean

• **clean**: `boolean`

Feature: Clean dist before compilation

When enabled stale assets will be removed from
the `location/dist` directory prior to the next
compilation.

**`default`** true

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:44

___

### debug

• **debug**: `boolean`

Feature: produce webpack.debug.js artifact

When enabled a `webpack.debug.js` artifact will be
emitted to the `location/storage` directory.

**`default`** false

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:53

___

### discover

• **discover**: `boolean`

Discover: automatically register locatable extensions

When enabled, any discovered extensions will be automatically
initialized.

**`default`** false

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:62

___

### extension

• **extension**: `Object`

Seed values for extension options

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:114

___

### fileFormat

• **fileFormat**: `string`

File format

**`note`** do not include extension

**`default`** '[name]'

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:99

___

### hash

• **hash**: `boolean`

Feature: enable filename hashing

**`default`** false

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:67

___

### hashFormat

• **hashFormat**: `string`

File format (when hashing is enabled)

**`note`** do not include extension

**`default`** '[name].[contenthash:6]'

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:106

___

### html

• **html**: `boolean`

Feature: emit html template

**`default`** true

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:72

___

### install

• **install**: `boolean`

Feature: automatically install extension dependencies

**`default`** false

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:77

___

### location

• **location**: [`Locations`](Framework.Locations.md)

Location

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:28

___

### log

• **log**: `boolean`

Feature: log to console

**`default`** false

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:82

___

### manifest

• **manifest**: `boolean`

Feature: produce asset manifest

**`default`** true

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:87

___

### minimize

• **minimize**: `boolean`

Feature: minimize enabled

**`default`** true

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:92

___

### name

• **name**: `string`

Application name

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:13

___

### patterns

• **patterns**: `Object`

Shared regular expressions for pattern matching.

**`example`**
```js
app.patterns.get('js')
```

#### Index signature

▪ [key: `string`]: `RegExp`

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:22

___

### server

• **server**: `any`

Server config

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:120

___

### theme

• **theme**: `Object`

Theme configuration

#### Type declaration

| Name | Type |
| :------ | :------ |
| `colors` | `Object` |
| `colors.accent` | [`TermColor`](../namespaces/Configuration.md#termcolor) |
| `colors.error` | [`TermColor`](../namespaces/Configuration.md#termcolor) |
| `colors.errorAlt` | [`TermColor`](../namespaces/Configuration.md#termcolor) |
| `colors.faded` | [`TermColor`](../namespaces/Configuration.md#termcolor) |
| `colors.flavor` | [`TermColor`](../namespaces/Configuration.md#termcolor) |
| `colors.foreground` | [`TermColor`](../namespaces/Configuration.md#termcolor) |
| `colors.primary` | [`TermColor`](../namespaces/Configuration.md#termcolor) |
| `colors.primaryAlt` | [`TermColor`](../namespaces/Configuration.md#termcolor) |
| `colors.success` | [`TermColor`](../namespaces/Configuration.md#termcolor) |
| `colors.warning` | [`TermColor`](../namespaces/Configuration.md#termcolor) |
| `columns` | `number` |
| `maxHeight` | `number` |
| `maxWidth` | `number` |
| `screens` | [[`number`, `number`], [`number`, `number`], [`number`, `number`], [`number`, `number`]] |
| `spacing` | `number` |

#### Defined in

packages/@roots/bud-framework/types/Configuration.d.ts:124
