---
id: "configuration"
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

[packages/@roots/bud-framework/src/Configuration/index.ts:119](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L119)

___

### ci

• **ci**: `boolean`

Feature: CI mode

**`default`** false

#### Defined in

[packages/@roots/bud-framework/src/Configuration/index.ts:31](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L31)

___

### clean

• **clean**: `boolean`

Feature: Clean dist before compilation

When enabled stale assets will be removed from
the `location/dist` directory prior to the next
compilation.

**`default`** true

#### Defined in

[packages/@roots/bud-framework/src/Configuration/index.ts:42](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L42)

___

### debug

• **debug**: `boolean`

Feature: produce webpack.debug.js artifact

When enabled a `webpack.debug.js` artifact will be
emitted to the `location/storage` directory.

**`default`** false

#### Defined in

[packages/@roots/bud-framework/src/Configuration/index.ts:52](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L52)

___

### discover

• **discover**: `boolean`

Discover: automatically register locatable extensions

When enabled, any discovered extensions will be automatically
initialized.

**`default`** false

#### Defined in

[packages/@roots/bud-framework/src/Configuration/index.ts:62](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L62)

___

### extension

• **extension**: `Object`

Seed values for extension options

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[packages/@roots/bud-framework/src/Configuration/index.ts:124](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L124)

___

### fileFormat

• **fileFormat**: `string`

File format

**`note`** do not include extension

**`default`** '[name]'

#### Defined in

[packages/@roots/bud-framework/src/Configuration/index.ts:106](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L106)

___

### hash

• **hash**: `boolean`

Feature: enable filename hashing

**`default`** false

#### Defined in

[packages/@roots/bud-framework/src/Configuration/index.ts:68](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L68)

___

### hashFormat

• **hashFormat**: `string`

File format (when hashing is enabled)

**`note`** do not include extension

**`default`** '[name].[contenthash:6]'

#### Defined in

[packages/@roots/bud-framework/src/Configuration/index.ts:114](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L114)

___

### html

• **html**: `boolean`

Feature: emit html template

**`default`** true

#### Defined in

[packages/@roots/bud-framework/src/Configuration/index.ts:74](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L74)

___

### install

• **install**: `boolean`

Feature: automatically install extension dependencies

**`default`** false

#### Defined in

[packages/@roots/bud-framework/src/Configuration/index.ts:80](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L80)

___

### location

• **location**: [`Definitions`](hooks.locale.definitions.md)

Location

#### Defined in

[packages/@roots/bud-framework/src/Configuration/index.ts:24](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L24)

___

### log

• **log**: `boolean`

Feature: log to console

**`default`** false

#### Defined in

[packages/@roots/bud-framework/src/Configuration/index.ts:86](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L86)

___

### manifest

• **manifest**: `boolean`

Feature: produce asset manifest

**`default`** true

#### Defined in

[packages/@roots/bud-framework/src/Configuration/index.ts:92](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L92)

___

### minimize

• **minimize**: `boolean`

Feature: minimize enabled

**`default`** true

#### Defined in

[packages/@roots/bud-framework/src/Configuration/index.ts:98](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L98)

___

### name

• **name**: `string`

Application name

#### Defined in

[packages/@roots/bud-framework/src/Configuration/index.ts:8](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L8)

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

[packages/@roots/bud-framework/src/Configuration/index.ts:19](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L19)

___

### server

• **server**: `any`

Server config

#### Defined in

[packages/@roots/bud-framework/src/Configuration/index.ts:131](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L131)

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

[packages/@roots/bud-framework/src/Configuration/index.ts:136](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Configuration/index.ts#L136)
