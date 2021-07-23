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

[packages/@roots/bud-framework/src/Configuration.ts:124](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L124)

___

### ci

• **ci**: `boolean`

Feature: CI mode

**`default`** false

#### Defined in

[packages/@roots/bud-framework/src/Configuration.ts:36](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L36)

___

### clean

• **clean**: `boolean`

Feature: Clean dist before compilation

When enabled stale assets will be removed from
the `location/dist` directory prior to the next
compilation.

**`default`** true

#### Defined in

[packages/@roots/bud-framework/src/Configuration.ts:47](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L47)

___

### debug

• **debug**: `boolean`

Feature: produce webpack.debug.js artifact

When enabled a `webpack.debug.js` artifact will be
emitted to the `location/storage` directory.

**`default`** false

#### Defined in

[packages/@roots/bud-framework/src/Configuration.ts:57](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L57)

___

### discover

• **discover**: `boolean`

Discover: automatically register locatable extensions

When enabled, any discovered extensions will be automatically
initialized.

**`default`** false

#### Defined in

[packages/@roots/bud-framework/src/Configuration.ts:67](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L67)

___

### extension

• **extension**: `Object`

Seed values for extension options

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[packages/@roots/bud-framework/src/Configuration.ts:129](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L129)

___

### fileFormat

• **fileFormat**: `string`

File format

**`note`** do not include extension

**`default`** '[name]'

#### Defined in

[packages/@roots/bud-framework/src/Configuration.ts:111](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L111)

___

### hash

• **hash**: `boolean`

Feature: enable filename hashing

**`default`** false

#### Defined in

[packages/@roots/bud-framework/src/Configuration.ts:73](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L73)

___

### hashFormat

• **hashFormat**: `string`

File format (when hashing is enabled)

**`note`** do not include extension

**`default`** '[name].[contenthash:6]'

#### Defined in

[packages/@roots/bud-framework/src/Configuration.ts:119](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L119)

___

### html

• **html**: `boolean`

Feature: emit html template

**`default`** true

#### Defined in

[packages/@roots/bud-framework/src/Configuration.ts:79](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L79)

___

### install

• **install**: `boolean`

Feature: automatically install extension dependencies

**`default`** false

#### Defined in

[packages/@roots/bud-framework/src/Configuration.ts:85](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L85)

___

### location

• **location**: `Definitions`

Location

#### Defined in

[packages/@roots/bud-framework/src/Configuration.ts:29](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L29)

___

### log

• **log**: `boolean`

Feature: log to console

**`default`** false

#### Defined in

[packages/@roots/bud-framework/src/Configuration.ts:91](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L91)

___

### manifest

• **manifest**: `boolean`

Feature: produce asset manifest

**`default`** true

#### Defined in

[packages/@roots/bud-framework/src/Configuration.ts:97](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L97)

___

### minimize

• **minimize**: `boolean`

Feature: minimize enabled

**`default`** true

#### Defined in

[packages/@roots/bud-framework/src/Configuration.ts:103](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L103)

___

### name

• **name**: `string`

Application name

#### Defined in

[packages/@roots/bud-framework/src/Configuration.ts:13](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L13)

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

[packages/@roots/bud-framework/src/Configuration.ts:24](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L24)

___

### server

• **server**: `any`

Server config

#### Defined in

[packages/@roots/bud-framework/src/Configuration.ts:136](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L136)

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

[packages/@roots/bud-framework/src/Configuration.ts:141](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Configuration.ts#L141)
