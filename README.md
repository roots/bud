
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

## API

* [alias](README.md#const-alias)
* [auto](README.md#const-auto)
* [babel](README.md#const-babel)
* [bundle](README.md#const-bundle)
* [copy](README.md#const-copy)
* [copyAll](README.md#const-copyall)
* [debug](README.md#const-debug)
* [dependencyManifest](README.md#const-dependencymanifest)
* [dev](README.md#const-dev)
* [devtool](README.md#const-devtool)
* [dist](README.md#const-dist)
* [distPath](README.md#const-distpath)
* [env](README.md#const-env)
* [hash](README.md#const-hash)
* [hot](README.md#const-hot)
* [inlineManifest](README.md#const-inlinemanifest)
* [maps](README.md#const-maps)
* [mini](README.md#const-mini)
* [postCss](README.md#const-postcss)
* [preset](README.md#const-preset)
* [project](README.md#const-project)
* [projectPath](README.md#const-projectpath)
* [publicPath](README.md#const-publicpath)
* [purge](README.md#const-purge)
* [setEnv](README.md#const-setenv)
* [src](README.md#const-src)
* [srcPath](README.md#const-srcpath)
* [sync](README.md#const-sync)
* [target](README.md#const-target)
* [translate](README.md#const-translate)
* [vendor](README.md#const-vendor)
* [watch](README.md#const-watch)

## Functions

### `Const` alias

▸ **alias**(`options`: any): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [alias.js:22](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/alias.js#L22)*

## bud.alias

Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.

Having defined this alias:

```js
bud.alias({'scripts': bud.src('scripts')})
```

You can now reference scripts against that alias in your import statements:

```js
import 'scripts/myScript' // replacing '../../myScript'
```

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` auto

▸ **auto**(`options`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [auto.js:7](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/auto.js#L7)*

Automatically load modules instead of needing to import them.

**`example`** bud.auto({jquery: ['$', 'window.jQuery']})

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` babel

▸ **babel**(`options`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [babel.js:17](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/babel.js#L17)*

Configure Babel.

If you prefer, you may utilize a babel.config.js file in the project root,
either alongside or in lieue of this configuration.

Conflicts between supplied configs will be resolved in favor of bud.config.js.

**`see`** https://babeljs.io/docs/en/configuration

**Parameters:**

▪ **options**: *object*

Name | Type |
------ | ------ |
`enabled` | boolean |
`plugins` | any[] |
`presets` | any[] |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` bundle

▸ **bundle**(`name`: string, `entries`: any[]): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [bundle.js:18](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/bundle.js#L18)*

## bud.bundle

Compile a group of assets.

```js
bud.bundle('app', [
  bud.src('app.js'),
  bud.src('app.css'),
])
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | output name. |
`entries` | any[] | array of src assets to include in the bundle. |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` copy

▸ **copy**(`from`: any, `to`: any): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [copy.js:18](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/copy.js#L18)*

## bud.copy

Copy a file.

```js
bud.copy(
  bud.src('images/image.png'),
  bud.dist('image.png'),
)
```

**Parameters:**

Name | Type |
------ | ------ |
`from` | any |
`to` | any |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` copyAll

▸ **copyAll**(`src`: string, `dest`: string): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [copyAll.js:11](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/copyAll.js#L11)*

Copy all files from a specified source to a specified destination.

**`example`** bud.copyAll(bud.src('images'), bud.dist('images'))

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`src` | string | origin dir |
`dest` | string | destination dir |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` debug

▸ **debug**(`enabled`: boolean): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [debug.js:7](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/debug.js#L7)*

Debug mode

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`enabled` | boolean | true to enable debug mode |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

debug

___

### `Const` dependencyManifest

▸ **dependencyManifest**(`__namedParameters`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [dependencyManifest.js:16](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/dependencyManifest.js#L16)*

Make a manifest of @wordpress dependencies utilized by entrypoints.

**`see`** https://git.io/JJLxM

**`example`** bud.dependencyManifest({outputFormat: 'js', injectPolyfill: false})

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`settings` | settings |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` dev

▸ **dev**(`options`: any): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [dev.js:7](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/dev.js#L7)*

Development server settings

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` devtool

▸ **devtool**(`devtool`: string): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [devtool.js:7](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/devtool.js#L7)*

Specify webpack devtool

webpack devtool to utilize

**Parameters:**

Name | Type |
------ | ------ |
`devtool` | string |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` dist

▸ **dist**(`relativePath`: string): *string*

*Defined in [dist.js:10](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/dist.js#L10)*

Yield an absolute path from a path relative to the dist dir.

**`example`** bud.dist('scripts/app.js') // returns the absolute path to the compiled app.js

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relativePath` | string | relative path |

**Returns:** *string*

absolute path

___

### `Const` distPath

▸ **distPath**(`dir`: string): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [distPath.js:10](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/distPath.js#L10)*

Set the project's dist directory.

**`example`** bud.distPath('dist') // default unless specified

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dir` | string | path of dist directory relative to the project root. |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` env

▸ **env**(`key`: string): *string*

*Defined in [env.js:8](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/env.js#L8)*

Get environment variable value.

**`example`** bud.env('APP_NAME')

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *string*

___

### `Const` hash

▸ **hash**(`enabled`: boolean): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [hash.js:8](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/hash.js#L8)*

Enable or disable filename hashing of built assets. Unless specified, filename hashes will be created when running production builds.

**`example`** bud.hash(true) // enable

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`enabled` | boolean | true | true to enable filename hashing. |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` hot

▸ **hot**(`enabled`: boolean): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [hot.js:8](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/hot.js#L8)*

Enable or disable hot module reloading

**`example`** bud.hot(true) // enable HMR

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`enabled` | boolean | true to enable hot module reloading. default: !bud.inProduction. |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` inlineManifest

▸ **inlineManifest**(`name`: string): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [inlineManifest.js:10](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/inlineManifest.js#L10)*

Make a chunk to be inlined directly on the page for optimal code splitting.

**`example`** bud.inlineManifest({name: 'runtime'})

**`example`** bud.inlineManifest() // defaults: enabled, runtime

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`name` | string | "runtime" |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` maps

▸ **maps**(`enabled`: any): *any*

*Defined in [maps.js:8](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/maps.js#L8)*

Enable or disable source-maps

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | any |

**Returns:** *any*

bud

___

### `Const` mini

▸ **mini**(`enable`: boolean): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [mini.js:8](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/mini.js#L8)*

Enable or disable minification

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`enable` | boolean | true to enable CSS/JS minification. |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` postCss

▸ **postCss**(`__namedParameters`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [postcss.js:15](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/postcss.js#L15)*

Configure PostCSS.

If you prefer, you may utilize a postcss.config.js file in the project root,
either alongside or in lieue of this configuration.

Conflicts between supplied configs will be resolved in favor of bud.config.js.

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`options` | options | - |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` preset

▸ **preset**(`relativePath`: string): *string*

*Defined in [preset.js:22](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/preset.js#L22)*

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

Name | Type | Description |
------ | ------ | ------ |
`relativePath` | string | relative path |

**Returns:** *string*

absolutePath

___

### `Const` project

▸ **project**(`relativePath`: string): *string*

*Defined in [project.js:18](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/project.js#L18)*

## bud.project

Yield an absolute path from a path relative to the `bud.projectPath`.

### Example

```js
bud.project('package.json') // absolute path to package.json
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relativePath` | string | relative path |

**Returns:** *string*

absolutePath

___

### `Const` projectPath

▸ **projectPath**(`dir`: string): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [projectPath.js:8](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/projectPath.js#L8)*

Set the project base path.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dir` | string | absolute path of project |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` publicPath

▸ **publicPath**(`dir`: string): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [publicPath.js:16](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/publicPath.js#L16)*

## bud.publicPath

Set the project public path.

### Example

```js
bud.publicPath('dist')
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dir` | string | public path of project |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` purge

▸ **purge**(`__namedParameters`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [purge.js:38](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/purge.js#L38)*

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
  allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
})
```

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`enabled` | any | true |
`options` | any | - |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` setEnv

▸ **setEnv**(`options`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [setEnv.js:17](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/setEnv.js#L17)*

## bud.setEnv

Set environment variables.

```js
bud.setEnv({
 APP_NAME: 'sage',
 //...,
})
```

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

___

### `Const` src

▸ **src**(`relativePath`: string): *string*

*Defined in [src.js:17](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/src.js#L17)*

## bud.src

Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.

### Example

```js
bud.src('scripts/app.js') // absolute path to the source file
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relativePath` | string | relative path |

**Returns:** *string*

absolutePath

___

### `Const` srcPath

▸ **srcPath**(`src`: any): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [srcPath.js:10](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/srcPath.js#L10)*

Set the project's src directory.

**`example`** bud.srcPath('src') // default unless specified

**Parameters:**

Name | Type |
------ | ------ |
`src` | any |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` sync

▸ **sync**(`options`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [sync.js:18](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/sync.js#L18)*

Configure BrowserSync.

**`example`**
bud.sync({
  enabled: !bud.inProduction,
  proxy: 'http://bud.test',
  host: 'localhost',
  port: 3000,
})

**Parameters:**

▪ **options**: *object*

Name | Type |
------ | ------ |
`enabled` | object |
`host` | object |
`port` | object |
`proxy` | object |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` target

▸ **target**(`target`: any): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [target.js:8](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/target.js#L8)*

Set the build target.

**`example`** bud.target('web') // default

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` translate

▸ **translate**(`output`: string): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [translate.js:12](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/translate.js#L12)*

Process @wordpress/i18n strings from JS source assets.

If you are already translating strings with `yarn translate` then
there is no reason to run this separately.

**`example`** bud.translate('resources/languages/sage.pot')

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`output` | string | output makepot |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` vendor

▸ **vendor**(`name`: string): *any*

*Defined in [vendor.js:14](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/vendor.js#L14)*

## bud.vendor

Enable vendor bundling.

```js
bud.vendor('vendor')
```

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`name` | string | "vendor" | name of vendor output file |

**Returns:** *any*

bud

___

### `Const` watch

▸ **watch**(`enabled`: any): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [watch.js:14](https://github.com/roots/bud-support/blob/37efa15/src/budpack/builder/api/watch.js#L14)*

## bud.watch

Enable or disable watch mode.

```js
bud.watch(true)
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`enabled` | any | true if enabled |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud
