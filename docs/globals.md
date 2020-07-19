[@roots/budpack](README.md) › [Globals](globals.md)

# @roots/budpack

## Index

### Interfaces

* [inlineManifestInterface](interfaces/inlinemanifestinterface.md)
* [mapInterface](interfaces/mapinterface.md)

### Type aliases

* [InlineManifest](globals.md#inlinemanifest)
* [Map](globals.md#map)

### Functions

* [alias](globals.md#const-alias)
* [auto](globals.md#const-auto)
* [babel](globals.md#const-babel)
* [bundle](globals.md#const-bundle)
* [copy](globals.md#const-copy)
* [copyAll](globals.md#const-copyall)
* [dashboard](globals.md#const-dashboard)
* [debug](globals.md#const-debug)
* [dependencyManifest](globals.md#const-dependencymanifest)
* [dev](globals.md#const-dev)
* [devtool](globals.md#const-devtool)
* [dist](globals.md#const-dist)
* [distPath](globals.md#const-distpath)
* [dump](globals.md#const-dump)
* [env](globals.md#const-env)
* [hash](globals.md#const-hash)
* [hot](globals.md#const-hot)
* [inlineManifest](globals.md#const-inlinemanifest)
* [map](globals.md#const-map)
* [mini](globals.md#const-mini)
* [postCss](globals.md#const-postcss)
* [preset](globals.md#const-preset)
* [project](globals.md#const-project)
* [projectPath](globals.md#const-projectpath)
* [publicPath](globals.md#const-publicpath)
* [purge](globals.md#const-purge)
* [register](globals.md#const-register)
* [setEnv](globals.md#const-setenv)
* [src](globals.md#const-src)
* [srcPath](globals.md#const-srcpath)
* [sync](globals.md#const-sync)
* [target](globals.md#const-target)
* [translate](globals.md#const-translate)
* [vendor](globals.md#const-vendor)
* [watch](globals.md#const-watch)

## Type aliases

###  InlineManifest

Ƭ **InlineManifest**: *[inlineManifestInterface](interfaces/inlinemanifestinterface.md)*

Defined in inlineManifest.ts:7

___

###  Map

Ƭ **Map**: *[mapInterface](interfaces/mapinterface.md)*

Defined in map.ts:7

## Functions

### `Const` alias

▸ **alias**(`options`: any): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [alias.js:20](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/alias.js#L20)*

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

*Defined in [auto.js:6](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/auto.js#L6)*

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

*Defined in [babel.js:16](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/babel.js#L16)*

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

*Defined in [bundle.js:17](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/bundle.js#L17)*

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

*Defined in [copy.js:17](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/copy.js#L17)*

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

*Defined in [copyAll.js:10](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/copyAll.js#L10)*

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

### `Const` dashboard

▸ **dashboard**(`enabled`: boolean): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [dashboard.js:15](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/dashboard.js#L15)*

## bud.dashboard

Enable or disable Bud's CLI build output.

## Example

```js
bud.dashboard(false) // disable dashboard
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`enabled` | boolean | true to enable debug mode |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` debug

▸ **debug**(`enabled`: boolean): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [debug.js:7](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/debug.js#L7)*

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

*Defined in [dependencyManifest.js:15](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/dependencyManifest.js#L15)*

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

*Defined in [dev.js:6](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/dev.js#L6)*

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

*Defined in [devtool.js:6](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/devtool.js#L6)*

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

*Defined in [dist.js:9](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/dist.js#L9)*

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

*Defined in [distPath.js:9](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/distPath.js#L9)*

Set the project's dist directory.

**`example`** bud.distPath('dist') // default unless specified

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dir` | string | path of dist directory relative to the project root. |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` dump

▸ **dump**(`enabled`: boolean): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [dump.js:8](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/dump.js#L8)*

Dump generated webpack config for debugging

**`example`** bud.dump(true) // dumps the generated webpack config and stops the build from running.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`enabled` | boolean | true | true to dump config |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` env

▸ **env**(`key`: string): *string*

*Defined in [env.js:7](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/env.js#L7)*

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

*Defined in [hash.js:7](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/hash.js#L7)*

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

*Defined in [hot.js:13](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/hot.js#L13)*

## bud.hot

Enable or disable hot module reloading

```js
bud.hot(true) // enable HMR
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`enabled` | boolean | true to enable hot module reloading. default: !bud.inProduction. |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` inlineManifest

▸ **inlineManifest**(`name?`: string): *bud*

Defined in inlineManifest.ts:16

Make a chunk to be inlined directly on the page for optimal code splitting.

```js
bud.inlineManifest({name: 'runtime'})
```

**Parameters:**

Name | Type |
------ | ------ |
`name?` | string |

**Returns:** *bud*

___

### `Const` map

▸ **map**(`enabled`: boolean): *bud*

Defined in map.ts:20

## bud.map

Enable or disable source-maps

### Example

```js
bud.map(true)
```

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

**Returns:** *bud*

___

### `Const` mini

▸ **mini**(`enable`: boolean): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [mini.js:7](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/mini.js#L7)*

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

*Defined in [postcss.js:23](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/postcss.js#L23)*

## bud.postCss

Configure PostCSS.

If you prefer, you may utilize a postcss.config.js file in the project root,
either alongside or in lieue of this configuration.

Conflicts between supplied configs will be resolved in favor of bud.config.js.

```js
bud.postCss({
  plugins: [
   require('astroturf'),
  ],
})

@param   {{enabled: boolean, plugins: array}} options
@param   {boolean}  options.enabled
@param   {array}    options.plugins
@return  {typeof import('./../index')} bud

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`options` | options | - |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

___

### `Const` preset

▸ **preset**(`relativePath`: string): *string*

*Defined in [preset.js:25](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/preset.js#L25)*

## bud.preset

Retrieve a Bud framework preset.

### Examples

```js
bud.preset('babel/postcss')
```

```js
bud.preset('babel/preset-react')
```

```js
bud.preset('tsconfig')
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

*Defined in [project.js:17](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/project.js#L17)*

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

*Defined in [projectPath.js:7](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/projectPath.js#L7)*

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

*Defined in [publicPath.js:15](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/publicPath.js#L15)*

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

*Defined in [purge.js:37](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/purge.js#L37)*

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

### `Const` register

▸ **register**(`name`: any, `plugin`: any): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [register.js:15](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/register.js#L15)*

## bud.register

Register a Bud plugin

```js
bud.register('myPlugin', myPlugin)
```

**Parameters:**

Name | Type |
------ | ------ |
`name` | any |
`plugin` | any |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` setEnv

▸ **setEnv**(`options`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [setEnv.js:16](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/setEnv.js#L16)*

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

*Defined in [src.js:16](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/src.js#L16)*

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

*Defined in [srcPath.js:9](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/srcPath.js#L9)*

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

*Defined in [sync.js:17](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/sync.js#L17)*

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

*Defined in [target.js:7](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/target.js#L7)*

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

*Defined in [translate.js:11](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/translate.js#L11)*

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

*Defined in [vendor.js:13](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/vendor.js#L13)*

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

*Defined in [watch.js:13](https://github.com/roots/bud-support/blob/07ce041/src/budpack/builder/api/watch.js#L13)*

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
