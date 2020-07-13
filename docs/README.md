# @roots/budpack

<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/?color=%23525ddc&style=flat-square">
  <a href="https://twitter.com/rootswp">
    <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?style=flat-square&color=1da1f2" />
  </a>
</p>

<h1 align="center">
  <strong>@roots/bud-support</strong>
</h1>

## Overview

This repository provides supporting client and server-side utilities to the main Bud CLI and the output it generates. [You may be looking for the main repository](https://github.com/roots/bud).

## Contributing

Contributions are welcome from everyone.

We have [contributing guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

<a href="https://kinsta.com/?kaid=OFDHAJIXUDIV"><img src="https://cdn.roots.io/app/uploads/kinsta.svg" alt="Kinsta" width="200" height="150"></a>
<a href="https://k-m.com/"><img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150"></a>
<a href="https://carrot.com/"><img src="https://cdn.roots.io/app/uploads/carrot.svg" alt="Carrot" width="200" height="150"></a>

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)

## Index

### Functions

- [alias](README.md#const-alias)
- [auto](README.md#const-auto)
- [babel](README.md#const-babel)
- [bundle](README.md#const-bundle)
- [copy](README.md#const-copy)
- [copyAll](README.md#const-copyall)
- [debug](README.md#const-debug)
- [dependencyManifest](README.md#const-dependencymanifest)
- [dev](README.md#const-dev)
- [devtool](README.md#const-devtool)
- [dist](README.md#const-dist)
- [distPath](README.md#const-distpath)
- [env](README.md#const-env)
- [hash](README.md#const-hash)
- [hot](README.md#const-hot)
- [inlineManifest](README.md#const-inlinemanifest)
- [maps](README.md#const-maps)
- [mini](README.md#const-mini)
- [postCss](README.md#const-postcss)
- [preset](README.md#const-preset)
- [project](README.md#const-project)
- [projectPath](README.md#const-projectpath)
- [publicPath](README.md#const-publicpath)
- [purge](README.md#const-purge)
- [setEnv](README.md#const-setenv)
- [src](README.md#const-src)
- [srcPath](README.md#const-srcpath)
- [sync](README.md#const-sync)
- [target](README.md#const-target)
- [translate](README.md#const-translate)
- [vendor](README.md#const-vendor)
- [watch](README.md#const-watch)

## Functions

### `Const` alias

▸ **alias**(`options`: any): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [alias.js:22](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/alias.js#L22)_

## bud.alias

Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.

Having defined this alias:

```js
bud.alias({scripts: bud.src('scripts')})
```

You can now reference scripts against that alias in your import statements:

```js
import 'scripts/myScript' // replacing '../../myScript'
```

**Parameters:**

| Name      | Type |
| --------- | ---- |
| `options` | any  |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` auto

▸ **auto**(`options`: object): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [auto.js:7](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/auto.js#L7)_

Automatically load modules instead of needing to import them.

**`example`** bud.auto({jquery: ['$', 'window.jQuery']})

**Parameters:**

| Name      | Type   |
| --------- | ------ |
| `options` | object |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` babel

▸ **babel**(`options`: object): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [babel.js:17](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/babel.js#L17)_

Configure Babel.

If you prefer, you may utilize a babel.config.js file in the project root,
either alongside or in lieue of this configuration.

Conflicts between supplied configs will be resolved in favor of bud.config.js.

**`see`** https://babeljs.io/docs/en/configuration

**Parameters:**

▪ **options**: _object_

| Name      | Type    |
| --------- | ------- |
| `enabled` | boolean |
| `plugins` | any[]   |
| `presets` | any[]   |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` bundle

▸ **bundle**(`name`: string, `entries`: any[]): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [bundle.js:18](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/bundle.js#L18)_

## bud.bundle

Compile a group of assets.

```js
bud.bundle('app', [bud.src('app.js'), bud.src('app.css')])
```

**Parameters:**

| Name      | Type   | Description                                   |
| --------- | ------ | --------------------------------------------- |
| `name`    | string | output name.                                  |
| `entries` | any[]  | array of src assets to include in the bundle. |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` copy

▸ **copy**(`from`: any, `to`: any): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [copy.js:18](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/copy.js#L18)_

## bud.copy

Copy a file.

```js
bud.copy(bud.src('images/image.png'), bud.dist('image.png'))
```

**Parameters:**

| Name   | Type |
| ------ | ---- |
| `from` | any  |
| `to`   | any  |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` copyAll

▸ **copyAll**(`src`: string, `dest`: string): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [copyAll.js:11](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/copyAll.js#L11)_

Copy all files from a specified source to a specified destination.

**`example`** bud.copyAll(bud.src('images'), bud.dist('images'))

**Parameters:**

| Name   | Type   | Description     |
| ------ | ------ | --------------- |
| `src`  | string | origin dir      |
| `dest` | string | destination dir |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` debug

▸ **debug**(`enabled`: boolean): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [debug.js:7](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/debug.js#L7)_

Debug mode

**Parameters:**

| Name      | Type    | Description               |
| --------- | ------- | ------------------------- |
| `enabled` | boolean | true to enable debug mode |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

debug

---

### `Const` dependencyManifest

▸ **dependencyManifest**(`__namedParameters`: object): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [dependencyManifest.js:16](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/dependencyManifest.js#L16)_

Make a manifest of @wordpress dependencies utilized by entrypoints.

**`see`** https://git.io/JJLxM

**`example`** bud.dependencyManifest({outputFormat: 'js', injectPolyfill: false})

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name       | Type     |
| ---------- | -------- |
| `settings` | settings |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` dev

▸ **dev**(`options`: any): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [dev.js:7](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/dev.js#L7)_

Development server settings

**Parameters:**

| Name      | Type |
| --------- | ---- |
| `options` | any  |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` devtool

▸ **devtool**(`devtool`: string): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [devtool.js:7](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/devtool.js#L7)_

Specify webpack devtool

webpack devtool to utilize

**Parameters:**

| Name      | Type   |
| --------- | ------ |
| `devtool` | string |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` dist

▸ **dist**(`relativePath`: string): _string_

_Defined in [dist.js:10](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/dist.js#L10)_

Yield an absolute path from a path relative to the dist dir.

**`example`** bud.dist('scripts/app.js') // returns the absolute path to the compiled app.js

**Parameters:**

| Name           | Type   | Description   |
| -------------- | ------ | ------------- |
| `relativePath` | string | relative path |

**Returns:** _string_

absolute path

---

### `Const` distPath

▸ **distPath**(`dir`: string): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [distPath.js:10](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/distPath.js#L10)_

Set the project's dist directory.

**`example`** bud.distPath('dist') // default unless specified

**Parameters:**

| Name  | Type   | Description                                          |
| ----- | ------ | ---------------------------------------------------- |
| `dir` | string | path of dist directory relative to the project root. |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` env

▸ **env**(`key`: string): _string_

_Defined in [env.js:8](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/env.js#L8)_

Get environment variable value.

**`example`** bud.env('APP_NAME')

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `key` | string |

**Returns:** _string_

---

### `Const` hash

▸ **hash**(`enabled`: boolean): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [hash.js:8](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/hash.js#L8)_

Enable or disable filename hashing of built assets. Unless specified, filename hashes will be created when running production builds.

**`example`** bud.hash(true) // enable

**Parameters:**

| Name      | Type    | Default | Description                      |
| --------- | ------- | ------- | -------------------------------- |
| `enabled` | boolean | true    | true to enable filename hashing. |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` hot

▸ **hot**(`enabled`: boolean): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [hot.js:8](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/hot.js#L8)_

Enable or disable hot module reloading

**`example`** bud.hot(true) // enable HMR

**Parameters:**

| Name      | Type    | Description                                                      |
| --------- | ------- | ---------------------------------------------------------------- |
| `enabled` | boolean | true to enable hot module reloading. default: !bud.inProduction. |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` inlineManifest

▸ **inlineManifest**(`name`: string): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [inlineManifest.js:10](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/inlineManifest.js#L10)_

Make a chunk to be inlined directly on the page for optimal code splitting.

**`example`** bud.inlineManifest({name: 'runtime'})

**`example`** bud.inlineManifest() // defaults: enabled, runtime

**Parameters:**

| Name   | Type   | Default   |
| ------ | ------ | --------- |
| `name` | string | "runtime" |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` maps

▸ **maps**(`enabled`: any): _any_

_Defined in [maps.js:8](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/maps.js#L8)_

Enable or disable source-maps

**Parameters:**

| Name      | Type |
| --------- | ---- |
| `enabled` | any  |

**Returns:** _any_

bud

---

### `Const` mini

▸ **mini**(`enable`: boolean): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [mini.js:8](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/mini.js#L8)_

Enable or disable minification

**Parameters:**

| Name     | Type    | Description                         |
| -------- | ------- | ----------------------------------- |
| `enable` | boolean | true to enable CSS/JS minification. |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` postCss

▸ **postCss**(`__namedParameters`: object): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [postcss.js:15](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/postcss.js#L15)_

Configure PostCSS.

If you prefer, you may utilize a postcss.config.js file in the project root,
either alongside or in lieue of this configuration.

Conflicts between supplied configs will be resolved in favor of bud.config.js.

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type    | Default |
| --------- | ------- | ------- |
| `enabled` | boolean | true    |
| `options` | options | -       |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` preset

▸ **preset**(`relativePath`: string): _string_

_Defined in [preset.js:22](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/preset.js#L22)_

## bud.preset

Retrieve a Bud framework preset.

### Examples

```js
bud.preset('babel/postcss')
```

```js
bud.preset('babel/preset-react')
```

**Parameters:**

| Name           | Type   | Description   |
| -------------- | ------ | ------------- |
| `relativePath` | string | relative path |

**Returns:** _string_

absolutePath

---

### `Const` project

▸ **project**(`relativePath`: string): _string_

_Defined in [project.js:18](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/project.js#L18)_

## bud.project

Yield an absolute path from a path relative to the `bud.projectPath`.

### Example

```js
bud.project('package.json') // absolute path to package.json
```

**Parameters:**

| Name           | Type   | Description   |
| -------------- | ------ | ------------- |
| `relativePath` | string | relative path |

**Returns:** _string_

absolutePath

---

### `Const` projectPath

▸ **projectPath**(`dir`: string): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [projectPath.js:8](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/projectPath.js#L8)_

Set the project base path.

**Parameters:**

| Name  | Type   | Description              |
| ----- | ------ | ------------------------ |
| `dir` | string | absolute path of project |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` publicPath

▸ **publicPath**(`dir`: string): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [publicPath.js:16](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/publicPath.js#L16)_

## bud.publicPath

Set the project public path.

### Example

```js
bud.publicPath('dist')
```

**Parameters:**

| Name  | Type   | Description            |
| ----- | ------ | ---------------------- |
| `dir` | string | public path of project |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` purge

▸ **purge**(`__namedParameters`: object): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [purge.js:38](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/purge.js#L38)_

## bud.purge

Purge unused CSS from compiled stylesheets

**`see`** https://purgecss.com/guides/wordpress.html

**`see`** https://purgecss.com/configuration.html

### Example

```js
bud.purge({
  enabled: bud.inProduction,
  content: [bud.project('resources/views/**')],
  allow: require('purgecss-with-wordpress').whitelist,
  allowPatterns: require('purgecss-with-wordpress')
    .whitelistPatterns,
})
```

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type | Default |
| --------- | ---- | ------- |
| `enabled` | any  | true    |
| `options` | any  | -       |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` setEnv

▸ **setEnv**(`options`: object): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [setEnv.js:17](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/setEnv.js#L17)_

## bud.setEnv

Set environment variables.

```js
bud.setEnv({
  APP_NAME: 'sage',
  //...,
})
```

**Parameters:**

| Name      | Type   |
| --------- | ------ |
| `options` | object |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

---

### `Const` src

▸ **src**(`relativePath`: string): _string_

_Defined in [src.js:17](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/src.js#L17)_

## bud.src

Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.

### Example

```js
bud.src('scripts/app.js') // absolute path to the source file
```

**Parameters:**

| Name           | Type   | Description   |
| -------------- | ------ | ------------- |
| `relativePath` | string | relative path |

**Returns:** _string_

absolutePath

---

### `Const` srcPath

▸ **srcPath**(`src`: any): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [srcPath.js:10](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/srcPath.js#L10)_

Set the project's src directory.

**`example`** bud.srcPath('src') // default unless specified

**Parameters:**

| Name  | Type |
| ----- | ---- |
| `src` | any  |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` sync

▸ **sync**(`options`: object): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [sync.js:18](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/sync.js#L18)_

Configure BrowserSync.

**`example`**
bud.sync({
enabled: !bud.inProduction,
proxy: 'http://bud.test',
host: 'localhost',
port: 3000,
})

**Parameters:**

▪ **options**: _object_

| Name      | Type   |
| --------- | ------ |
| `enabled` | object |
| `host`    | object |
| `port`    | object |
| `proxy`   | object |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` target

▸ **target**(`target`: any): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [target.js:8](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/target.js#L8)_

Set the build target.

**`example`** bud.target('web') // default

**Parameters:**

| Name     | Type |
| -------- | ---- |
| `target` | any  |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` translate

▸ **translate**(`output`: string): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [translate.js:12](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/translate.js#L12)_

Process @wordpress/i18n strings from JS source assets.

If you are already translating strings with `yarn translate` then
there is no reason to run this separately.

**`example`** bud.translate('resources/languages/sage.pot')

**Parameters:**

| Name     | Type   | Description    |
| -------- | ------ | -------------- |
| `output` | string | output makepot |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud

---

### `Const` vendor

▸ **vendor**(`name`: string): _any_

_Defined in [vendor.js:14](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/vendor.js#L14)_

## bud.vendor

Enable vendor bundling.

```js
bud.vendor('vendor')
```

**Parameters:**

| Name   | Type   | Default  | Description                |
| ------ | ------ | -------- | -------------------------- |
| `name` | string | "vendor" | name of vendor output file |

**Returns:** _any_

bud

---

### `Const` watch

▸ **watch**(`enabled`: any): _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

_Defined in [watch.js:14](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/watch.js#L14)_

## bud.watch

Enable or disable watch mode.

```js
bud.watch(true)
```

**Parameters:**

| Name      | Type | Description     |
| --------- | ---- | --------------- |
| `enabled` | any  | true if enabled |

**Returns:** _"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"_

bud
