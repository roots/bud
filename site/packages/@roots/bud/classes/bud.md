---
id: "bud"
title: "Class: Bud"
sidebar_label: "Bud"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Framework`](framework.md)

  ↳ **`Bud`**

## Constructors

### constructor

• **new Bud**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.config?` | `Configuration` |
| `options.mode?` | ``"production"`` \| ``"development"`` |
| `options.name?` | `string` |
| `options.parent?` | [`Framework`](framework.md) |

#### Inherited from

[Framework](framework.md).[constructor](framework.md#constructor)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:248

## Properties

### \_mode

• **\_mode**: `Mode`

#### Inherited from

[Framework](framework.md).[_mode](framework.md#_mode)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:229

___

### \_services

• **\_services**: `Container`<`Service`\>

#### Inherited from

[Framework](framework.md).[_services](framework.md#_services)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:221

___

### alias

• **alias**: [`Alias`](../modules/framework.api.md#alias)

## alias

Register shorthand for resolving modules
using webpack aliases. Useful for
situations that may otherwise require
brittle relative paths.

### Usage

```js
app.alias({
  '@scripts': app.path('src', 'scripts'),
})
```

#### Overrides

[Framework](framework.md).[alias](framework.md#alias)

#### Defined in

packages/@roots/bud/types/Bud.d.ts:32

___

### api

• **api**: [`Api`](api.api-1.md)

## api

Service providing config api methods

#### Overrides

[Framework](framework.md).[api](framework.md#api)

#### Defined in

packages/@roots/bud/types/Bud.d.ts:21

___

### assets

• **assets**: `Assets`

## assets

Copy static assets during compilation.

You may specify paths with a string literal or glob pattern.

### Usage

**Copy src/images to dist/images**

```js
app.assets(['src/images'])
```

#### Inherited from

[Framework](framework.md).[assets](framework.md#assets)

#### Defined in

packages/@roots/bud/types/extensions/copy-webpack-plugin/index.d.ts:20

___

### babel

• **babel**: [`Babel`](../interfaces/framework.api.babel-1.md)

## babel

Configure babel.

#### Inherited from

[Framework](framework.md).[babel](framework.md#babel)

#### Defined in

packages/@roots/bud-babel/types/interface.d.ts:9

___

### build

• **build**: [`Build`](build.build-1.md)

## build

Service handling config compilation

#### Overrides

[Framework](framework.md).[build](framework.md#build)

#### Defined in

packages/@roots/bud/types/Bud.d.ts:22

___

### cache

• **cache**: [`Cache`](cache.cache-1.md)

## cache

Service handling compiler cache

#### Overrides

[Framework](framework.md).[cache](framework.md#cache)

#### Defined in

packages/@roots/bud/types/Bud.d.ts:23

___

### children

• **children**: `Container`<[`Framework`](framework.md)\>

## children

Compiler instance container.

#### Inherited from

[Framework](framework.md).[children](framework.md#children)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:38

___

### compiler

• **compiler**: [`Compiler`](compiler.compiler-1.md)

## compiler

Service handling build compilation

#### Overrides

[Framework](framework.md).[compiler](framework.md#compiler)

#### Defined in

packages/@roots/bud/types/Bud.d.ts:24

___

### config

• **config**: [`Config`](../modules/framework.api.md#config)

## config

Modify bud's baseline config.

Values defined in this function are more
likely to be overwritten by framework hooks

### Usage

```js
app.config({
  theme: {
    colors: {
      foreground: '#FFFFFF',
      faded: '#6C758F',
      primary: '#545DD7',
      primaryAlt: '#663399',
      error: '#dc3545',
      errorAlt: '#b22222',
      warning: '#FF611A',
      success: '#46D46A',
      accent: '#ff69b4',
      flavor: '#78C5D7',
    },
  },
})
```

#### Inherited from

[Framework](framework.md).[config](framework.md#config)

#### Defined in

packages/@roots/bud-api/types/methods/config/index.d.ts:33

___

### dashboard

• **dashboard**: `Dashboard`

## dashboard

Service providing CLI interface

#### Inherited from

[Framework](framework.md).[dashboard](framework.md#dashboard)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:74

___

### define

• **define**: [`Define`](../modules/framework.api.md#define)

## define

Define application variables.

### Usage

```ts file='bud.config.js'
app.define({
  APP_NAME: 'My Application',
})
```

#### Inherited from

[Framework](framework.md).[define](framework.md#define)

#### Defined in

packages/@roots/bud-api/types/methods/define.d.ts:18

___

### dependencies

• **dependencies**: [`Dependencies`](dependencies.dependencies-1.md)

Dependencies service

#### Overrides

[Framework](framework.md).[dependencies](framework.md#dependencies)

#### Defined in

packages/@roots/bud/types/Bud.d.ts:25

___

### dev

• **dev**: [`Dev`](../modules/framework.api.md#dev)

## dev

Configure development server.

### Usage

```js
app.dev({
  host: 'my-local-site.example',
  port: 5000,
})
```

#### Inherited from

[Framework](framework.md).[dev](framework.md#dev)

#### Defined in

packages/@roots/bud-api/types/methods/dev/index.d.ts:18

___

### devtool

• **devtool**: [`Devtool`](../modules/framework.api.md#devtool)

## devtool

Enable and configure sourcemaps using any of [Webpack's
devtool utilities](https://webpack.js.org/configuration/devtool/).

### Usage

```js
app.devtool('inline-cheap-module-source-map')
```

#### Inherited from

[Framework](framework.md).[devtool](framework.md#devtool)

#### Defined in

packages/@roots/bud-api/types/methods/devtool.d.ts:17

___

### discovery

• **discovery**: [`Discovery`](discovery.discovery-1.md)

Discovery service

#### Overrides

[Framework](framework.md).[discovery](framework.md#discovery)

#### Defined in

packages/@roots/bud/types/Bud.d.ts:26

___

### entry

• **entry**: [`Entry`](../interfaces/framework.api.entry-1.md)

## entry

Generate application entrypoints from source asset paths.

### Globbing

Uses [fast-glob](https://git.io/JkGbw) syntax.

#### Supported patterns

- `*` matches any number of characters, but not `/`
- `?` matches a single character, but not `/`
- `**` matches any number of characters, including `/`,
  as long as it's the only thing in a path part
- `{}` allows for a comma-separated list  of "or" expressions
- `!` at the beginning of a pattern will negate the match

### Usage

Create an entrypoint from a single file:

```js
app.entry('app', 'app.js')
```

Create an entrypoint from multiple files:

```js
app.entry('app', ['js/app.js', 'css/app.css'])
```

Create an entrypoint comprised of all js assets:

```js
app.entry('app', '*.js')
```

You may create more than one entrypoint using object syntax:

```js
app.entry({
  scripts: '*.js',
  styles: ['*.css', '*.scss'],
})
```

Declare entrypoint dependencies:

```js
app.entry({
 react: {
   import: ['react', 'react-dom']
 },
 app: {
   import: ['app.js'],
   dependOn: ['react'],
 },
})
```

#### Inherited from

[Framework](framework.md).[entry](framework.md#entry)

#### Defined in

packages/@roots/bud-api/types/methods/entry.d.ts:66

___

### env

• **env**: [`Env`](env.env-1.md)

Envvar service

#### Overrides

[Framework](framework.md).[env](framework.md#env)

#### Defined in

packages/@roots/bud/types/Bud.d.ts:27

___

### experiments

• **experiments**: [`Experiments`](../modules/framework.api.md#experiments)

## experiments

Configure experimental webpack options.

### Usage

```js
bud.experiments({
 lazyCompilation: true,
})
```

#### Inherited from

[Framework](framework.md).[experiments](framework.md#experiments)

#### Defined in

packages/@roots/bud-api/types/methods/experiments/index.d.ts:18

___

### extensions

• **extensions**: [`Extensions`](extensions.extensions-1.md)

Extensions service

#### Overrides

[Framework](framework.md).[extensions](framework.md#extensions)

#### Defined in

packages/@roots/bud/types/Bud.d.ts:28

___

### externals

• **externals**: `Externals`

## externals

Specify a non-standard resolution strategy for modules
with a matching name.

### Usage

```js
bud.externals({
  'jQuery': 'window.jquery',
})
```

#### Inherited from

[Framework](framework.md).[externals](framework.md#externals)

#### Defined in

packages/@roots/bud-api/types/methods/externals/index.d.ts:19

___

### hash

• **hash**: [`Hash`](../modules/framework.api.md#hash)

## hash

Enable filename hashing of built assets.

### Usage

```js
bud.hash()
```

#### Inherited from

[Framework](framework.md).[hash](framework.md#hash)

#### Defined in

packages/@roots/bud-api/types/methods/hash/index.d.ts:15

___

### hooks

• **hooks**: [`Hooks`](hooks.md)

Hooks service

#### Overrides

[Framework](framework.md).[hooks](framework.md#hooks)

#### Defined in

packages/@roots/bud/types/Bud.d.ts:29

___

### implementation

• **implementation**: (`options`: { `config?`: `Configuration` ; `mode?`: ``"production"`` \| ``"development"`` ; `name?`: `string` ; `parent?`: [`Framework`](framework.md)  }) => [`Framework`](framework.md)

#### Type declaration

• **new Bud**(`options`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.config?` | `Configuration` |
| `options.mode?` | ``"production"`` \| ``"development"`` |
| `options.name?` | `string` |
| `options.parent?` | [`Framework`](framework.md) |

#### Overrides

[Framework](framework.md).[implementation](framework.md#implementation)

#### Defined in

packages/@roots/bud/types/Bud.d.ts:15

___

### isChild

• **isChild**: `boolean`

## isChild

Returns true if current compiler is a child compiler

#### Inherited from

[Framework](framework.md).[isChild](framework.md#ischild)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:44

___

### logger

• **logger**: [`Logger`](logger.md)

Logger service

#### Overrides

[Framework](framework.md).[logger](framework.md#logger)

#### Defined in

packages/@roots/bud/types/Bud.d.ts:30

___

### minimize

• **minimize**: [`Minimize`](../modules/framework.api.md#minimize)

## minimize

`bud.minimize` enables minification of built assets.

### Usage

Enable:

```js
bud.minimize()
```

Explicitly disable:

```js
bud.minimize(false)
```

Explicitly enable:

```js
bud.minimize(true)
```

#### Inherited from

[Framework](framework.md).[minimize](framework.md#minimize)

#### Defined in

packages/@roots/bud-api/types/methods/minimize.d.ts:29

___

### name

• **name**: `string`

## name

Application name

#### Inherited from

[Framework](framework.md).[name](framework.md#name)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:24

___

### parent

• **parent**: [`Framework`](framework.md)

## parent

If a child instance, returns the parent.

If the parent instance, returns {Framework}

#### Inherited from

[Framework](framework.md).[parent](framework.md#parent)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:32

___

### persist

• **persist**: [`Persist`](../modules/framework.api.md#persist)

## persist

Cache webpack builds to the filesystem.

### Usage

```js
app.persist({
  type: 'memory',
})
```

#### Inherited from

[Framework](framework.md).[persist](framework.md#persist)

#### Defined in

packages/@roots/bud-api/types/methods/persist.d.ts:17

___

### postcss

• **postcss**: [`PostCss`](../interfaces/framework.api.postcss-1.md)

## bud.postcss

Configure postcss.

#### Inherited from

[Framework](framework.md).[postcss](framework.md#postcss)

#### Defined in

packages/@roots/bud-postcss/types/interface.d.ts:11

___

### proto

• **proto**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `config` | `Configuration` |
| `services` | `any` |

#### Inherited from

[Framework](framework.md).[proto](framework.md#proto)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:225

___

### provide

• **provide**: [`Provide`](../modules/framework.api.md#provide)

## provide

Makes a variable/module available throughout the entire
application without needing to import it explicitly.

### Usage

```js
bud.provide({
  jquery: '$',
})
```

#### Inherited from

[Framework](framework.md).[provide](framework.md#provide)

#### Defined in

packages/@roots/bud-api/types/methods/provide.d.ts:18

___

### proxy

• **proxy**: `Proxy`

## proxy

Set proxy settings for the development server.

By default it proxies whatever is running on localhost on port 8000.

### Usage

Enable:

```js
bud.proxy()
```

Disable:

```js
bud.proxy({enabled: false})
```

Specify host and port:

```js
bud.proxy({
 host: 'example.test',
 port: 3000,
})
```

#### Inherited from

[Framework](framework.md).[proxy](framework.md#proxy)

#### Defined in

packages/@roots/bud-api/types/methods/proxy.d.ts:34

___

### publicPath

• **publicPath**: `PublicPath`

## publicPath

By default it is assumed that assets are served from webroot (`/`).
You can use this method to replace this value for apps  served from
a subdirectory.

### Usage

Set the default path for a [@roots/sage project](https://github.com/roots/sage):

```js
bud.publicPath('/app/themes/sage/dist')
```

#### Inherited from

[Framework](framework.md).[publicPath](framework.md#publicpath)

#### Defined in

packages/@roots/bud-api/types/methods/publicPath.d.ts:19

___

### run

• **run**: [`Run`](../modules/framework.api.md#run)

## run

Run the build

### Usage

```js
bud.run()
```

#### Inherited from

[Framework](framework.md).[run](framework.md#run)

#### Defined in

packages/@roots/bud-api/types/methods/run.d.ts:15

___

### runtime

• **runtime**: [`Runtime`](../modules/framework.api.md#runtime)

## runtime

Generate a runtime chunk intended to be inlined on the page.

Useful for code splitting and dynamic imports.

### Usage

```js
bud.runtime()
```

#### Inherited from

[Framework](framework.md).[runtime](framework.md#runtime)

#### Defined in

packages/@roots/bud-api/types/methods/runtime.d.ts:18

___

### server

• **server**: [`Server`](server.md)

Dev server service

#### Overrides

[Framework](framework.md).[server](framework.md#server)

#### Defined in

packages/@roots/bud/types/Bud.d.ts:31

___

### setPath

• **setPath**: `SetPath`

## setPath

Set a directory. The project directory should be an absolute path.
All other directories should be relative (src, dist, etc.)

```js
bud.setPath('src', 'custom/src')
```

#### Inherited from

[Framework](framework.md).[setPath](framework.md#setpath)

#### Defined in

packages/@roots/bud-api/types/methods/setPath.d.ts:14

___

### setPublicPath

• **setPublicPath**: `SetPublicPath`

## setPublicPath

By default it is assumed that assets are served from webroot (`/`).
You can use this method to replace this value for apps served from
a subdirectory.

### Usage

Set the default path using a string

```js
app.setPublicPath('/app/themes/sage/dist')
```

Set the publicPath using a function.

```js
app.setPublicPath(publicPath => {
  return `web/assets/${publicPath}`
})
```

#### Inherited from

[Framework](framework.md).[setPublicPath](framework.md#setpublicpath)

#### Defined in

packages/@roots/bud-api/types/methods/setPublicPath.d.ts:27

___

### splitChunks

• **splitChunks**: [`SplitChunks`](../modules/framework.api.splitchunks.md)

## splitChunks

Useful for bundling vendor modules separately from application code.

### Usage

```js
bud.splitChunks({
 chunks: 'all',
})
```

#### Inherited from

[Framework](framework.md).[splitChunks](framework.md#splitchunks)

#### Defined in

packages/@roots/bud-api/types/methods/splitChunks.d.ts:18

___

### store

• **store**: `Store`

Key Value store service

#### Inherited from

[Framework](framework.md).[store](framework.md#store)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:106

___

### template

• **template**: [`Template`](../modules/framework.api.md#template)

## template

Enable and/or configure a generated HTML template

### Usage

```js
app.template({
  enabled: true, // default: true
  template: 'public/index.html',
  replace: {
    APP_NAME: name,
    APP_DESCRIPTION: description,
    PUBLIC_URL: app.env.get('PUBLIC_URL'),
  },
})
```

#### Inherited from

[Framework](framework.md).[template](framework.md#template)

#### Defined in

packages/@roots/bud-api/types/methods/template/index.d.ts:24

___

### use

• **use**: [`Use`](../modules/framework.api.md#use)

## use

Register an extension or set of extensions

### Usage

Add packaged bud extensions:

```js
bud.use([
  require('@roots/bud-babel'),
  require('@roots/bud-react'),
])
```

Add an extension inline (also works with an array of extensions):

```js
bud.use({
 name: 'my-webpack-plugin',
 make: () => new MyWebpackPlugin(),
})
```

Add a webpack plugin inline (also work with an array of plugins):

```js
bud.use(new MyWebpackPlugin())
```

#### Inherited from

[Framework](framework.md).[use](framework.md#use)

#### Defined in

packages/@roots/bud-api/types/methods/use/index.d.ts:35

___

### watch

• **watch**: [`Watch`](../modules/framework.api.md#watch)

## watch

Configure the list of files that, when modified,
will force the browser to reload (even in hot mode).

### Usage

```js
app.watch(['templates/*.html'])
```

#### Inherited from

[Framework](framework.md).[watch](framework.md#watch)

#### Defined in

packages/@roots/bud-api/types/methods/watch.d.ts:16

___

### write

• **write**: (`content`: `any`, `props`: `any`) => `void`

#### Type declaration

▸ (`content`, `props`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `any` |
| `props` | `any` |

##### Returns

`void`

#### Inherited from

[Framework](framework.md).[write](framework.md#write)

#### Defined in

packages/@roots/bud-dashboard/types/interface.d.ts:5

## Accessors

### isDevelopment

• `get` **isDevelopment**(): `boolean`

#### Returns

`boolean`

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:248

___

### isProduction

• `get` **isProduction**(): `boolean`

#### Returns

`boolean`

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:247

___

### mode

• `get` **mode**(): `Mode`

#### Returns

`Mode`

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:245

• `set` **mode**(`mode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `Mode` |

#### Returns

`void`

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:246

___

### services

• `get` **services**(): `Container`<`Service`\>

#### Returns

`Container`<`Service`\>

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:243

• `set` **services**(`services`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `services` | `Container`<`Service`\> |

#### Returns

`void`

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:244

## Methods

### access

▸ **access**<`I`\>(`value`): `I`

app.access

If a value is a function it will call that
function and return the result.

If the value is not a function it will return its value.

```js
const isAFunction = (option) => `option value: ${option}`
const isAValue = 'option value: true'

access(isAFunction, true)
// => `option value: true`

access(isAValue)
// => `option value: true`
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `I` \| (`app`: [`Bud`](bud.md)) => `I` |

#### Returns

`I`

#### Inherited from

[Framework](framework.md).[access](framework.md#access)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:126

___

### bootstrap

▸ **bootstrap**(`services`): [`Framework`](framework.md)

app.bootstrap

#### Parameters

| Name | Type |
| :------ | :------ |
| `services` | `Object` |

#### Returns

[`Framework`](framework.md)

#### Inherited from

[Framework](framework.md).[bootstrap](framework.md#bootstrap)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:143

___

### container

▸ **container**(`repository?`): `Container`<`any`\>

app.container

#### Parameters

| Name | Type |
| :------ | :------ |
| `repository?` | `any` |

#### Returns

`Container`<`any`\>

#### Inherited from

[Framework](framework.md).[container](framework.md#container)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:130

___

### debug

▸ **debug**(`message?`, ...`optionalArgs`): `void`

log (log level: debug)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Inherited from

[Framework](framework.md).[debug](framework.md#debug)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:189

___

### error

▸ **error**(`message`, ...`optionalArgs`): `void`

log (log level: error)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Inherited from

[Framework](framework.md).[error](framework.md#error)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:193

___

### get

▸ **get**(`name?`): [`Framework`](framework.md)

app.get

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

[`Framework`](framework.md)

#### Inherited from

[Framework](framework.md).[get](framework.md#get)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:134

___

### info

▸ **info**(`message?`, ...`optionalArgs`): `void`

log (log level: info)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Inherited from

[Framework](framework.md).[info](framework.md#info)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:185

___

### lifecycle

▸ **lifecycle**(): [`Framework`](framework.md)

app.lifecycle

#### Returns

[`Framework`](framework.md)

#### Inherited from

[Framework](framework.md).[lifecycle](framework.md#lifecycle)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:149

___

### log

▸ **log**(`message?`, ...`optionalArgs`): `void`

log a message

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Inherited from

[Framework](framework.md).[log](framework.md#log)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:173

___

### make

▸ **make**(`name`, `tap?`): [`Framework`](framework.md)

app.make

**`note`** multi-compiler api is experimental

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `tap?` | (`app`: [`Framework`](framework.md)) => [`Framework`](framework.md) |

#### Returns

[`Framework`](framework.md)

#### Inherited from

[Framework](framework.md).[make](framework.md#make)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:139

___

### path

▸ **path**(`key`, ...`path`): `string`

app.path

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | ``"project"`` \| ``"src"`` \| ``"dist"`` \| ``"publicPath"`` \| ``"storage"`` \| ``"modules"`` |
| `...path` | `string`[] |

#### Returns

`string`

#### Inherited from

[Framework](framework.md).[path](framework.md#path)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:153

___

### pipe

▸ **pipe**(`fns`, `value?`): [`Framework`](framework.md)

app.pipe

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`input`: [`Framework`](framework.md)) => [`Framework`](framework.md)[] |
| `value?` | [`Framework`](framework.md) |

#### Returns

[`Framework`](framework.md)

#### Inherited from

[Framework](framework.md).[pipe](framework.md#pipe)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:157

___

### sequence

▸ **sequence**(`fns`): [`Framework`](framework.md)

app.sequence

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`app`: [`Framework`](framework.md)) => `any`[] |

#### Returns

[`Framework`](framework.md)

#### Inherited from

[Framework](framework.md).[sequence](framework.md#sequence)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:161

___

### set

▸ **set**(`name`, `instance`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `instance` | [`Framework`](framework.md) |

#### Returns

`void`

#### Inherited from

[Framework](framework.md).[set](framework.md#set)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:255

___

### success

▸ **success**(`message?`, ...`optionalArgs`): `void`

log a message

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Inherited from

[Framework](framework.md).[success](framework.md#success)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:177

___

### tap

▸ **tap**(`fn`, `bound?`): [`Framework`](framework.md)

app.tap

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`app?`: [`Framework`](framework.md)) => `any` \| (`app?`: [`Framework`](framework.md)) => `any` |
| `bound?` | `boolean` |

#### Returns

[`Framework`](framework.md)

#### Inherited from

[Framework](framework.md).[tap](framework.md#tap)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:165

___

### warn

▸ **warn**(`message?`, ...`optionalArgs`): `void`

log (log level: warn)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Inherited from

[Framework](framework.md).[warn](framework.md#warn)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:181

___

### when

▸ **when**(`test`, `trueCase`, `falseCase?`): [`Framework`](framework.md)

app.when

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | `boolean` \| (`app`: [`Framework`](framework.md)) => `boolean` |
| `trueCase` | (`app`: [`Framework`](framework.md)) => `any` |
| `falseCase?` | (`app`: [`Framework`](framework.md)) => `any` |

#### Returns

[`Framework`](framework.md)

#### Inherited from

[Framework](framework.md).[when](framework.md#when)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:169
