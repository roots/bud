---
id: "Server.Configuration"
title: "Interface: Configuration"
sidebar_label: "Configuration"
custom_edit_url: null
---

[Server](../modules/Server.md).Configuration

Server configuration

## Properties

### browser

• `Optional` **browser**: `Object`

Client features

#### Type declaration

| Name | Type |
| :------ | :------ |
| `indicator?` | `boolean` |
| `log?` | `boolean` |
| `overlay?` | `boolean` |

#### Defined in

packages/@roots/bud-framework/src/Server.ts:159

___

### disableHostCheck

• `Optional` **disableHostCheck**: `Options`[]

Escape hatch for Webpack's host check security feature.

#### Defined in

packages/@roots/bud-framework/src/Server.ts:213

___

### filename

• `Optional` **filename**: `string`

Filename to serve as index.

#### Defined in

packages/@roots/bud-framework/src/Server.ts:178

___

### headers

• `Optional` **headers**: `Record`<`string`, `string`\> \| `HeadersHandle`

This property for  passing  custom
HTTP headers on each request.

**`example`**

```json
{ "X-Custom-Header": "yes" }
```

#### Defined in

packages/@roots/bud-framework/src/Server.ts:190

___

### host

• `Optional` **host**: `string`

The development server host

**`default`** localhost

#### Defined in

packages/@roots/bud-framework/src/Server.ts:123

___

### index

• `Optional` **index**: `string` \| `boolean`

The index path for web server, defaults to "index.html".

#### Defined in

packages/@roots/bud-framework/src/Server.ts:168

___

### methods

• `Optional` **methods**: `string`[]

This property for  passing  the
list of HTTP request methods accepted

**`example`**

```json
['GET', 'HEAD']
```

#### Defined in

packages/@roots/bud-framework/src/Server.ts:202

___

### middleware

• `Optional` **middleware**: `Object`

Enabled middlewares

#### Index signature

▪ [key: `string`]: `boolean`

#### Defined in

packages/@roots/bud-framework/src/Server.ts:115

___

### mimeTypes

• `Optional` **mimeTypes**: `MimeTypeMap`

This property for  to register custom
mime types or extension mappings

#### Defined in

packages/@roots/bud-framework/src/Server.ts:208

___

### port

• `Optional` **port**: `number`

The development server port

**`default`** 3000

#### Defined in

packages/@roots/bud-framework/src/Server.ts:129

___

### proxy

• `Optional` **proxy**: `Object`

Proxy destination

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `host?` | `string` | Proxy destination host  **`default`** localhost |
| `port?` | `number` | Proxy destination port  **`default`** 8000 |

#### Defined in

packages/@roots/bud-framework/src/Server.ts:134

___

### publicPath

• `Optional` **publicPath**: `string`

The path that the middleware is bound to.

#### Defined in

packages/@roots/bud-framework/src/Server.ts:173

___

### watch

• `Optional` **watch**: `Object`

Files which should reload the browser when changed.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `files` | `string`[] |
| `options` | `WatchOptions` |

#### Defined in

packages/@roots/bud-framework/src/Server.ts:151
