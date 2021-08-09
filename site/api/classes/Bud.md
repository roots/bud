---
id: "Bud"
title: "Class: Bud"
sidebar_label: "Bud"
sidebar_position: 0
custom_edit_url: null
---

Bud is a frontend build framework combining the best parts of Symfony Encore and Laravel Mix

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

[packages/@roots/bud/src/Bud/index.ts:30](https://github.com/roots/bud/blob/96454777/packages/@roots/bud/src/Bud/index.ts#L30)

## Properties

### access

• **access**: `access`<`any`\>

Access a value which may or may not be a function.

**`remarks`**
If a value is a function **access** will call that function and return the result.

If the value is not a function **access** will return its value.

**`example`**
```js
const isAFunction = (option) => `option value: ${option}`
const isAValue = 'option value: true'

access(isAFunction, true) // => `option value: true`
access(isAValue) // => `option value: true`
```

#### Inherited from

[Framework](Framework.md).[access](Framework.md#access)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:236

___

### alias

• **alias**: `Alias`

Register shorthand for resolving modules using webpack aliases.

**`remarks`**
Useful for situations that may otherwise require brittle relative paths.

**`example`**
```js
app.alias({
  '@scripts': app.path('src', 'scripts'),
})
```

#### Inherited from

[Framework](Framework.md).[alias](Framework.md#alias)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:19

___

### api

• **api**: `Api`

Macros for assisting with common config tasks

**`internal`**

**`virtual`**

#### Inherited from

[Framework](Framework.md).[api](Framework.md#api)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:81

___

### assets

• **assets**: `Assets`

Copy static assets during compilation.

**`remarks`**
You may specify paths with a string literal or glob pattern.

**`example`**
Copy **src/images** to **dist/images**

```js
app.assets(['src/images'])
```

#### Inherited from

[Framework](Framework.md).[assets](Framework.md#assets)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:33

___

### bootstrap

• **bootstrap**: `bootstrap`

Initializes and binds [Framework.services](Framework.md#services)

**`example`**
```js
new FrameworkImplementation(...constructorParams).bootstrap()
```

#### Inherited from

[Framework](Framework.md).[bootstrap](Framework.md#bootstrap)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:245

___

### build

• **build**: `Build`

Build configuration container

**`example`**
[Build.config](Build.md#config) property contains the build config object:

```js
build.config
```

**`example`**
Rebuild the configuration:

```js
build.rebuild()
```

**`virtual`**

#### Inherited from

[Framework](Framework.md).[build](Framework.md#build)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:101

___

### cache

• **cache**: `Cache`

Determines cache validity and generates version string based on SHA-1 hashed build configuration and project manifest files.

**`virtual`**

#### Inherited from

[Framework](Framework.md).[cache](Framework.md#cache)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:107

___

### children

• **children**: [`Container`](Container.md)<[`Instances`](../interfaces/Framework.Instances.md)\>

Child [Framework](Framework.md) instances

**`remarks`**
Is `null` if the current instance is a child instance.

**`default`** null

#### Inherited from

[Framework](Framework.md).[children](Framework.md#children)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:61

___

### compiler

• **compiler**: `Compiler`

Compiles [Framework.build](Framework.md#build) configuration and stats/errors/progress reporting.

**`virtual`**

#### Inherited from

[Framework](Framework.md).[compiler](Framework.md#compiler)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:113

___

### config

• **config**: `Config`

Modify the [Framework](Framework.md) baseline config.

**`remarks`**
Values defined in this function are more likely to be overwritten by [Framework](Framework.md) hooks, etc.
If there is a more direct way to make your change it is better to not use this function.

Still, this function provides utility for certain use cases.

**`example`**
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

[Framework](Framework.md).[config](Framework.md#config)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:63

___

### container

• **container**: `container`<`any`\>

Create a new [Container](Container.md) instance

**`example`**
```js
const myContainer = bud.container({key: 'value'})

myContainer.get('key') // returns 'value'
```

#### Inherited from

[Framework](Framework.md).[container](Framework.md#container)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:256

___

### dashboard

• **dashboard**: `Dashboard`

Presents build progress, stats and errors from [Framework.compiler](Framework.md#compiler) and [Framework.server](Framework.md#server)
over the CLI.

**`virtual`**

#### Inherited from

[Framework](Framework.md).[dashboard](Framework.md#dashboard)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:120

___

### define

• **define**: `Define`

Define application variables.

**`example`**
```ts file='bud.config.js'
app.define({
  APP_NAME: 'My Application',
})
```

#### Inherited from

[Framework](Framework.md).[define](Framework.md#define)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:74

___

### dependencies

• **dependencies**: `Dependencies`

Utilities for interfacing with user package manager software

**`virtual`**

#### Inherited from

[Framework](Framework.md).[dependencies](Framework.md#dependencies)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:126

___

### dev

• **dev**: `Dev`

Configure development server.

**`example`**
```js
app.dev({
  host: 'my-local-site.example',
  port: 5000,
})
```

#### Inherited from

[Framework](Framework.md).[dev](Framework.md#dev)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:86

___

### devtool

• **devtool**: `Devtool`

Enable and configure sourcemaps using any of [Webpack's
devtool utilities](https://webpack.js.org/configuration/devtool/).

**`example`**
```js
app.devtool('inline-cheap-module-source-map')
```

#### Inherited from

[Framework](Framework.md).[devtool](Framework.md#devtool)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:96

___

### discovery

• **discovery**: `Discovery`

Project information and peer dependency management utilities

**`virtual`**

#### Inherited from

[Framework](Framework.md).[discovery](Framework.md#discovery)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:132

___

### entry

• **entry**: `Entry`

Generate application entrypoints from source asset paths.

**`remarks`**
**Globbing**

Uses [fast-glob](https://git.io/JkGbw) syntax.

**Supported patterns**

- `*` matches any number of characters, but not `/`
- `?` matches a single character, but not `/`
- `**` matches any number of characters, including `/`,
  as long as it's the only thing in a path part
- `{}` allows for a comma-separated list  of "or" expressions
- `!` at the beginning of a pattern will negate the match

**`example`**
Create an entrypoint from a single file:

```js
app.entry('app', 'app.js')
```

**`example`**
Create an entrypoint from multiple files:

```js
app.entry('app', ['js/app.js', 'css/app.css'])
```

**`example`**
Create an entrypoint comprised of all js assets:

```js
app.entry('app', '*.js')
```

**`example`**
You may create more than one entrypoint using object syntax:

```js
app.entry({
  scripts: '*.js',
  styles: ['*.css', '*.scss'],
})
```

**`example`**
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

[Framework](Framework.md).[entry](Framework.md#entry)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:160

___

### env

• **env**: `Env`

.env container

**`virtual`**

#### Inherited from

[Framework](Framework.md).[env](Framework.md#env)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:138

___

### experiments

• **experiments**: `Experiments`

Configure experimental webpack options.

**`example`**
```js
bud.experiments({
 lazyCompilation: true,
})
```

#### Inherited from

[Framework](Framework.md).[experiments](Framework.md#experiments)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:171

___

### extensions

• **extensions**: `Extensions`

Container service for [Framework](Framework.md) extensions.

**`remarks`**
Extensions can be defined as a [Module](../interfaces/Module.md), which is more generic.

They can also be defined as a {@link Plugin} which is a [Module](../interfaces/Module.md)
specifically yielding a {@link WebpackPluginInstance}.

When adding a [Module](../interfaces/Module.md) or {@link Plugin} to the container
with [Extensions.add](Extensions.md#add) it is cast to the [Extension](Extension.md) type.

**`virtual`**

#### Inherited from

[Framework](Framework.md).[extensions](Framework.md#extensions)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:153

___

### externals

• **externals**: `Externals`

Specify a non-standard resolution strategy for modules
with a matching name.

**`example`**
```js
bud.externals({
  'jQuery': 'window.jquery',
})
```

#### Inherited from

[Framework](Framework.md).[externals](Framework.md#externals)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:183

___

### get

• **get**: `get`

Returns a [Framework](Framework.md) instance from the [Framework.children](Framework.md#children) container

**`remarks`**
An optional [tap](Bud.md#tap) function can be provided to configure the [Framework](Framework.md) instance.

**`example`**
```js
const name = 'plugin'
const tapFn = plugin => plugin.entry('main', 'main.js')

bud.get(name, tapFn)
```

#### Inherited from

[Framework](Framework.md).[get](Framework.md#get)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:271

___

### hash

• **hash**: `Hash`

Enable filename hashing of built assets.

**`example`**
```js
bud.hash()
```

#### Inherited from

[Framework](Framework.md).[hash](Framework.md#hash)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:192

___

### hooks

• **hooks**: `Hooks`

Service allowing for fitering [Framework](Framework.md) values through callbacks.

**`example`**
Add a new entry to the `webpack.externals` configuration:

```js
hooks.on(
  'build/externals',
  externals => ({
    ...externals,
    $: 'jquery',
  }),
)
```

**`example`**
Change the `webpack.output.filename` format:

```js
hooks.on(
  'build/output/filename',
  () => '[name].[hash:4]',
)
```

**`virtual`**

#### Inherited from

[Framework](Framework.md).[hooks](Framework.md#hooks)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:182

___

### implementation

• **implementation**: [`Constructor`](../namespaces/Framework.md#constructor)

Concrete implementation of the [Framework interface](Framework.md)

**`remark`**
Fulfills [Framework.implementation](Framework.md#implementation)

#### Overrides

[Framework](Framework.md).[implementation](Framework.md#implementation)

#### Defined in

[packages/@roots/bud/src/Bud/index.ts:25](https://github.com/roots/bud/blob/96454777/packages/@roots/bud/src/Bud/index.ts#L25)

___

### logger

• **logger**: `Logger`

Logging service

**`virtual`**

#### Inherited from

[Framework](Framework.md).[logger](Framework.md#logger)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:188

___

### make

• **make**: `make`

Instantiate a child instance and add to [Framework.children](Framework.md#children) container

**`remarks`**
**make** takes two parameters:

- The **name** of the new compiler
- An optional callback to use for configuring the compiler.

**`example`**
```js
bud.make('scripts', child => child.entry('app', 'app.js'))
```

**`example`**
This function returns the parent bud instance for further chaining.

It is also possible to reference the parent instance using [Framework.parent](Framework.md#parent).

```js
make('scripts', child => {
  child.entry('app', 'app.js')
  child.parent.dev({
    // ...
  })
})
```

#### Inherited from

[Framework](Framework.md).[make](Framework.md#make)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:300

___

### minimize

• **minimize**: `Minimize`

Enables minification of built assets.

**`example`**
Enable:

```js
bud.minimize()
```

**`example`**
Explicitly disable:

```js
bud.minimize(false)
```

**`example`**
Explicitly enable:

```js
bud.minimize(true)
```

#### Inherited from

[Framework](Framework.md).[minimize](Framework.md#minimize)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:217

___

### mode

• **mode**: [`Mode`](../namespaces/Framework.md#mode)

Compilation mode

**`remarks`**
Unlike webpack, there is no 'none' mode.

**`default`** 'production'

#### Inherited from

[Framework](Framework.md).[mode](Framework.md#mode)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:37

___

### name

• **name**: `string`

Framework name

**`remarks`**
The name of the parent compiler is used as a base when sourcing configuration files.
So, in an implementation that uses the name `app`, the Framework will be sourcing
`app.config.js`, `app.development.config.js`, etc.

#### Inherited from

[Framework](Framework.md).[name](Framework.md#name)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:28

___

### parent

• **parent**: [`Framework`](Framework.md)

Parent [Framework](Framework.md) instance

**`remarks`**
Is `null` if the current instance is the parent instance.

**`default`** null

#### Inherited from

[Framework](Framework.md).[parent](Framework.md#parent)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:46

___

### path

• **path**: `path`

Returns a [Framework.Locations](../interfaces/Framework.Locations.md) value as an absolute path

#### Inherited from

[Framework](Framework.md).[path](Framework.md#path)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:304

___

### persist

• **persist**: `Persist`

Cache webpack builds to the filesystem.

**`example`**
```js
app.persist({
  type: 'memory',
})
```

#### Inherited from

[Framework](Framework.md).[persist](Framework.md#persist)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:228

___

### pipe

• **pipe**: `pipe`

Pipe a value through an array of functions. The return value of each callback is used as input for the next.

**`remarks`**
If no value is provided the value is assumed to be the [Framework](Framework.md) itself

[sequence](Bud.md#sequence) is a non-mutational version of this method.

**`example`**
```js
app.pipe(
  [
    value => value + 1,
    value => value + 1,
  ],
  1, // initial value
) // resulting value is 3
```

#### Inherited from

[Framework](Framework.md).[pipe](Framework.md#pipe)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:324

___

### provide

• **provide**: `Provide`

Makes a variable/module available throughout the entire
application without needing to import it explicitly.

**`example`**
```js
bud.provide({
  jquery: '$',
})
```

#### Inherited from

[Framework](Framework.md).[provide](Framework.md#provide)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:240

___

### proxy

• **proxy**: `Proxy`

Set proxy settings for the development server.

By default it proxies whatever is running on localhost on port 8000.

**`example`**
Enable:

```js
bud.proxy()
```

**`example`**
Disable:

```js
bud.proxy({enabled: false})
```

**`example`**
Specify host and port:

```js
bud.proxy({
 host: 'example.test',
 port: 3000,
})
```

#### Inherited from

[Framework](Framework.md).[proxy](Framework.md#proxy)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:270

___

### publicPath

• **publicPath**: `PublicPath`

By default it is assumed that assets are served from webroot (`/`).
You can use this method to replace this value for apps  served from
a subdirectory.

**`example`**
Set the default path for a [@roots/sage project](https://github.com/roots/sage):

```js
bud.publicPath('/app/themes/sage/dist')
```

#### Inherited from

[Framework](Framework.md).[publicPath](Framework.md#publicpath)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:283

___

### run

• **run**: `Run`

Run the build

**`example`**
```js
bud.run()
```

#### Inherited from

[Framework](Framework.md).[run](Framework.md#run)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:292

___

### runtime

• **runtime**: `Runtime`

Generate a runtime chunk intended to be inlined on the page.

Useful for code splitting and dynamic imports.

**`example`**
```js
bud.runtime()
```

#### Inherited from

[Framework](Framework.md).[runtime](Framework.md#runtime)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:303

___

### sequence

• **sequence**: <T\>(`fns`: `Callback`[], `value?`: `T`) => [`Framework`](Framework.md)

Run a value through an array of syncronous, non-mutational functions.

**`remarks`**
Unlike [pipe](Bud.md#pipe) the value returned from each function is ignored.

#### Type declaration

▸ <`T`\>(`fns`, `value?`): [`Framework`](Framework.md)

Run a value through an array of syncronous, non-mutational functions.

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`Framework`](Framework.md) |

##### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | `Callback`[] |
| `value?` | `T` |

##### Returns

[`Framework`](Framework.md)

#### Inherited from

[Framework](Framework.md).[sequence](Framework.md#sequence)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:345

___

### server

• **server**: `Server`

Development server and browser devtools

**`virtual`**

#### Inherited from

[Framework](Framework.md).[server](Framework.md#server)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:194

___

### services

• **services**: [`Services`](../interfaces/Framework.Services.md)

Framework services

**`remarks`**
Can be set directly on the child instance or passed as a property in the [Framework constructor options](../interfaces/Framework.Options.md).

#### Inherited from

[Framework](Framework.md).[services](Framework.md#services)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:74

___

### setPath

• **setPath**: `setPath`

Set a [Framework.Locations](../interfaces/Framework.Locations.md) value

**`remarks`**
The [`project` directory](../interfaces/Framework.Locations.md) should be an absolute path.
All other directories should be relative (src, dist, etc.)

**`see`** [Framework.Locations](../interfaces/Framework.Locations.md)

**`example`**
```js
bud.setPath('src', 'custom/src')
```

#### Inherited from

[Framework](Framework.md).[setPath](Framework.md#setpath)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:338

___

### setPublicPath

• **setPublicPath**: `SetPublicPath`

By default it is assumed that assets are served from webroot (`/`).
You can use this method to replace this value for apps served from
a subdirectory.

**`example`**
Set the default path using a string

```js
app.setPublicPath('/app/themes/sage/dist')
```

**`example`**
Set the publicPath using a function.

```js
app.setPublicPath(publicPath => {
  return `web/assets/${publicPath}`
})
```

#### Inherited from

[Framework](Framework.md).[setPublicPath](Framework.md#setpublicpath)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:325

___

### splitChunks

• **splitChunks**: `SplitChunks`

Useful for bundling vendor modules separately from application code.

**`example`**
```js
bud.splitChunks({
 chunks: 'all',
})
```

#### Inherited from

[Framework](Framework.md).[splitChunks](Framework.md#splitchunks)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:336

___

### store

• **store**: [`Store`](Store.md)<[`Configuration`](../interfaces/Configuration.md)\>

Container service for holding [Configuration](../interfaces/Configuration.md) values

**`sealed`**

#### Inherited from

[Framework](Framework.md).[store](Framework.md#store)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:200

___

### tap

• **tap**: `tap`

Execute a callback

**`remarks`**
Callback is provided [the Framework instance](Framework.md) as a parameter.

**`example`**
```js
bud.tap(bud => {
  // do something with bud
})
```

**`example`**
Lexical scope is bound to [Framework](Framework.md) where applicable, so it is possible to reference the [instance](Framework.md) using `this`.

```js
bud.tap(function () {
 // do something with this
})
```

#### Inherited from

[Framework](Framework.md).[tap](Framework.md#tap)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:368

___

### template

• **template**: `Template`

Enable and/or configure a generated HTML template

**`example`**
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

[Framework](Framework.md).[template](Framework.md#template)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:353

___

### use

• **use**: `Use`

Register an extension or set of extensions

**`example`**
Add packaged bud extensions:

```js
bud.use([
  require('@roots/bud-babel'),
  require('@roots/bud-react'),
])
```

**`example`**
Add an extension inline (also works with an array of extensions):

```js
bud.use({
 name: 'my-webpack-plugin',
 make: () => new MyWebpackPlugin(),
})
```

**`example`**
Add a webpack plugin inline (also work with an array of plugins):

```js
bud.use(new MyWebpackPlugin())
```

#### Inherited from

[Framework](Framework.md).[use](Framework.md#use)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:384

___

### watch

• **watch**: `Watch`

Configure the list of files that, when modified,
will force the browser to reload (even in hot mode).

**`example`**
```js
app.watch(['templates/*.html'])
```

#### Inherited from

[Framework](Framework.md).[watch](Framework.md#watch)

#### Defined in

packages/@roots/bud-api/types/repository/index.d.ts:394

___

### when

• **when**: `when`

Executes a function if a given test is `true`.

**`remarks`**
- The first parameter is the conditional check.
- The second parameter is the function to run if `true`.
- The third parameter is optional; executed if the conditional is not `true`.

**`example`**
Only produce a vendor bundle when running in `production` [Mode](../namespaces/Framework.md#mode):

```js
bud.when(bud.isProduction, () => bud.vendor())
```

**`example`**
Use `eval` sourcemap in development mode and `hidden-source-map` in production:

```js
bud.when(
  bud.isDevelopment,
  () => bud.devtool('eval'),
  () => bud.devtool('hidden-source-map'),
)
```

#### Inherited from

[Framework](Framework.md).[when](Framework.md#when)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:395

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

## Methods

### bindMethod

▸ **bindMethod**<`T`\>(`key`, `method`): [`Framework`](Framework.md)

Bind method to [Framework](Framework.md)

**`internal`**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `Function` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `method` | `T` & `Function` |

#### Returns

[`Framework`](Framework.md)

#### Inherited from

[Framework](Framework.md).[bindMethod](Framework.md#bindmethod)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:218

___

### debug

▸ **debug**(`message?`, ...`optionalArgs`): `void`

Log a `debug` level message

**`decorator`** `@bind`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Inherited from

[Framework](Framework.md).[debug](Framework.md#debug)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:425

___

### error

▸ **error**(`message?`, ...`optionalArgs`): `void`

Log and display an error.

**`remark`**
This error is fatal and will kill the process

**`decorator`** `@bind`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Inherited from

[Framework](Framework.md).[error](Framework.md#error)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:434

___

### info

▸ **info**(`message?`, ...`optionalArgs`): `void`

Log an `info` level message

**`decorator`** `@bind`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Inherited from

[Framework](Framework.md).[info](Framework.md#info)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:407

___

### log

▸ **log**(`message?`, ...`optionalArgs`): `void`

Log a message

**`decorator`** `@bind`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Inherited from

[Framework](Framework.md).[log](Framework.md#log)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:401

___

### success

▸ **success**(`message?`, ...`optionalArgs`): `void`

Log a `success` level message

**`decorator`** `@bind`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Inherited from

[Framework](Framework.md).[success](Framework.md#success)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:413

___

### warn

▸ **warn**(`message?`, ...`optionalArgs`): `void`

Log a `warning` level message

**`decorator`** `@bind`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Inherited from

[Framework](Framework.md).[warn](Framework.md#warn)

#### Defined in

packages/@roots/bud-framework/types/Framework/index.d.ts:419
