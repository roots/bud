---
id: "Configuration"
title: "Interface: Configuration"
sidebar_label: "Configuration"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### build

• **build**: `Configuration`

Seed values for webpack config

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:123

___

### ci

• **ci**: `boolean`

Feature: CI mode

**`default`** false

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:35

___

### clean

• **clean**: `boolean`

Feature: Clean dist before compilation

When enabled stale assets will be removed from
the `location/dist` directory prior to the next
compilation.

**`default`** true

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:46

___

### debug

• **debug**: `boolean`

Feature: produce webpack.debug.js artifact

When enabled a `webpack.debug.js` artifact will be
emitted to the `location/storage` directory.

**`default`** false

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:56

___

### discover

• **discover**: `boolean`

Discover: automatically register locatable extensions

When enabled, any discovered extensions will be automatically
initialized.

**`default`** false

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:66

___

### extension

• **extension**: `Object`

Seed values for extension options

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:128

___

### fileFormat

• **fileFormat**: `string`

File format

**`note`** do not include extension

**`default`** '[name]'

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:110

___

### hash

• **hash**: `boolean`

Feature: enable filename hashing

**`default`** false

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:72

___

### hashFormat

• **hashFormat**: `string`

File format (when hashing is enabled)

**`note`** do not include extension

**`default`** '[name].[contenthash:6]'

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:118

___

### html

• **html**: `boolean`

Feature: emit html template

**`default`** true

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:78

___

### install

• **install**: `boolean`

Feature: automatically install extension dependencies

**`default`** false

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:84

___

### location

• **location**: `Definitions`

Location

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:28

___

### log

• **log**: `boolean`

Feature: log to console

**`default`** false

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:90

___

### manifest

• **manifest**: `boolean`

Feature: produce asset manifest

**`default`** true

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:96

___

### minimize

• **minimize**: `boolean`

Feature: minimize enabled

**`default`** true

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:102

___

### name

• **name**: `string`

Application name

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:12

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

packages/@roots/bud-framework/src/Configuration.ts:23

___

### server

• **server**: `any`

Server config

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:135

___

### theme

• **theme**: `Object`

Theme configuration

#### Type declaration

| Name | Type |
| :------ | :------ |
| `colors` | `Object` |
| `colors.accent` | `TermColor` |
| `colors.error` | `TermColor` |
| `colors.errorAlt` | `TermColor` |
| `colors.faded` | `TermColor` |
| `colors.flavor` | `TermColor` |
| `colors.foreground` | `TermColor` |
| `colors.primary` | `TermColor` |
| `colors.primaryAlt` | `TermColor` |
| `colors.success` | `TermColor` |
| `colors.warning` | `TermColor` |
| `columns` | `number` |
| `maxHeight` | `number` |
| `maxWidth` | `number` |
| `screens` | [[`number`, `number`], [`number`, `number`], [`number`, `number`], [`number`, `number`]] |
| `spacing` | `number` |

#### Defined in

packages/@roots/bud-framework/src/Configuration.ts:140
