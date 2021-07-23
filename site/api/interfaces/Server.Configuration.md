---
id: "Server.Configuration"
title: "Interface: Configuration"
sidebar_label: "Configuration"
custom_edit_url: null
---

[Server](../namespaces/Server.md).Configuration

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

[packages/@roots/bud-framework/src/Server.ts:160](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Server.ts#L160)

___

### disableHostCheck

• `Optional` **disableHostCheck**: `Options`[]

Escape hatch for Webpack's host check security feature.

#### Defined in

[packages/@roots/bud-framework/src/Server.ts:214](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Server.ts#L214)

___

### filename

• `Optional` **filename**: `string`

Filename to serve as index.

#### Defined in

[packages/@roots/bud-framework/src/Server.ts:179](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Server.ts#L179)

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

[packages/@roots/bud-framework/src/Server.ts:191](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Server.ts#L191)

___

### host

• `Optional` **host**: `string`

The development server host

**`default`** localhost

#### Defined in

[packages/@roots/bud-framework/src/Server.ts:124](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Server.ts#L124)

___

### index

• `Optional` **index**: `string` \| `boolean`

The index path for web server, defaults to "index.html".

#### Defined in

[packages/@roots/bud-framework/src/Server.ts:169](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Server.ts#L169)

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

[packages/@roots/bud-framework/src/Server.ts:203](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Server.ts#L203)

___

### middleware

• `Optional` **middleware**: `Object`

Enabled middlewares

#### Index signature

▪ [key: `string`]: `boolean`

#### Defined in

[packages/@roots/bud-framework/src/Server.ts:116](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Server.ts#L116)

___

### mimeTypes

• `Optional` **mimeTypes**: `MimeTypeMap`

This property for  to register custom
mime types or extension mappings

#### Defined in

[packages/@roots/bud-framework/src/Server.ts:209](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Server.ts#L209)

___

### port

• `Optional` **port**: `number`

The development server port

**`default`** 3000

#### Defined in

[packages/@roots/bud-framework/src/Server.ts:130](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Server.ts#L130)

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

[packages/@roots/bud-framework/src/Server.ts:135](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Server.ts#L135)

___

### publicPath

• `Optional` **publicPath**: `string`

The path that the middleware is bound to.

#### Defined in

[packages/@roots/bud-framework/src/Server.ts:174](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Server.ts#L174)

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

[packages/@roots/bud-framework/src/Server.ts:152](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Server.ts#L152)
