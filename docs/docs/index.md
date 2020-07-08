---
id: "index"
title: "@roots/budpack"
sidebar_label: "Globals"
---

## Index

### Functions

* [alias](index.md#const-alias)
* [auto](index.md#const-auto)
* [babel](index.md#const-babel)
* [bundle](index.md#const-bundle)
* [copy](index.md#const-copy)
* [copyAll](index.md#const-copyall)
* [debug](index.md#const-debug)
* [dependencyManifest](index.md#const-dependencymanifest)
* [dev](index.md#const-dev)
* [devtool](index.md#const-devtool)
* [dist](index.md#const-dist)
* [distPath](index.md#const-distpath)
* [env](index.md#const-env)
* [hash](index.md#const-hash)
* [hot](index.md#const-hot)
* [inlineManifest](index.md#const-inlinemanifest)
* [maps](index.md#const-maps)
* [maxChunks](index.md#const-maxchunks)
* [mini](index.md#const-mini)
* [postCss](index.md#const-postcss)
* [preset](index.md#const-preset)
* [project](index.md#const-project)
* [projectPath](index.md#const-projectpath)
* [publicPath](index.md#const-publicpath)
* [purge](index.md#const-purge)
* [setEnv](index.md#const-setenv)
* [splitting](index.md#const-splitting)
* [src](index.md#const-src)
* [srcPath](index.md#const-srcpath)
* [sync](index.md#const-sync)
* [translate](index.md#const-translate)
* [vendor](index.md#const-vendor)
* [watch](index.md#const-watch)
* [watchTimeout](index.md#const-watchtimeout)

## Functions

### `Const` alias

▸ **alias**(`options`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [alias.js:9](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/alias.js#L9)*

Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.

**`example`** 
 bud.alias({'scripts': bud.src('scripts')})
 ↪️ import 'scripts/myScript'

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` auto

▸ **auto**(`options`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [auto.js:7](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/auto.js#L7)*

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

*Defined in [babel.js:18](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/babel.js#L18)*

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

*Defined in [bundle.js:9](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/bundle.js#L9)*

Compile a group of assets.

**`example`** bud.bundle('app', [bud.src('app.js'), bud.src('app.css')])

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

*Defined in [copy.js:10](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/copy.js#L10)*

Copy a file.

**`namespace`** bud

**`example`** bud.copy(bud.src('images/image.png'), bud.dist('image.png'))

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

*Defined in [copyAll.js:11](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/copyAll.js#L11)*

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

▸ **debug**(`debug`: any): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [therest.js:7](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/therest.js#L7)*

Debug mode

**Parameters:**

Name | Type |
------ | ------ |
`debug` | any |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

TouchList

___

### `Const` dependencyManifest

▸ **dependencyManifest**(`settings`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [dependencyManifest.js:17](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/dependencyManifest.js#L17)*

Make a manifest of @wordpress dependencies utilized by entrypoints.

**`see`** https://git.io/JJLxM

**`example`** bud.dependencyManifest({outputFormat: 'js', injectPolyfill: false})

**Parameters:**

▪`Default value`  **settings**: *object*= {enabled: true}

Name | Type |
------ | ------ |
`combineAssets` | boolean |
`combinedOutputFile` | string |
`enabled?` | boolean |
`injectPolyfill` | boolean |
`outputFormat` | string |
`requestToExternal` | Function |
`requestToHandle` | Function |
`useDefaults` | boolean |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` dev

▸ **dev**(`options`: any): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [therest.js:19](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/therest.js#L19)*

Development mode

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

TouchList

___

### `Const` devtool

▸ **devtool**(`devtool`: string): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [devtool.js:7](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/devtool.js#L7)*

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

*Defined in [dist.js:10](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/dist.js#L10)*

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

*Defined in [distPath.js:10](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/distPath.js#L10)*

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

*Defined in [env.js:8](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/env.js#L8)*

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

*Defined in [hash.js:8](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/hash.js#L8)*

Enable or disable filename hashing of built assets. Unless specified, filename hashes will be created when running production builds.

**`example`** bud.hash(true) // enable

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`enabled` | boolean | true to enable filename hashing. |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` hot

▸ **hot**(`enabled`: boolean): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [hot.js:8](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/hot.js#L8)*

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

▸ **inlineManifest**(`__namedParameters`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [inlineManifest.js:12](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/inlineManifest.js#L12)*

Make a chunk to be inlined directly on the page for optimal code splitting.

**`example`** bud.inlineManifest({name: 'runtime'})

**`example`** bud.inlineManifest() // defaults: enabled, runtime

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`name` | string | "runtime" |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` maps

▸ **maps**(`enabled`: any): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

Defined in maps.js:7

Enable or disable source-maps

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | any |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` maxChunks

▸ **maxChunks**(`chunkCount`: string | number): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [therest.js:34](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/therest.js#L34)*

Set maxChunks for code splitting

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`chunkCount` | string &#124; number | maximum number of chunks. default: 'Infinity'. |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

TouchList

___

### `Const` mini

▸ **mini**(`enable`: boolean): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

Defined in mini.js:7

Enable or disable minification

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`enable` | boolean | true to enable CSS/JS minification. |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` postCss

▸ **postCss**(`options`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [postcss.js:15](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/postcss.js#L15)*

Configure PostCSS.

If you prefer, you may utilize a postcss.config.js file in the project root,
either alongside or in lieue of this configuration.

Conflicts between supplied configs will be resolved in favor of bud.config.js.

**Parameters:**

▪ **options**: *object*

Name | Type |
------ | ------ |
`enabled` | boolean |
`plugins` | array |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` preset

▸ **preset**(`relativePath`: string): *string*

*Defined in [preset.js:11](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/preset.js#L11)*

Retrieve a Bud framework preset

**`example`** bud.preset('babel/postcss')

**`example`** bud.preset('babel/preset-react')

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relativePath` | string | relative path |

**Returns:** *string*

absolutePath

___

### `Const` project

▸ **project**(`relativePath`: string): *string*

*Defined in [project.js:10](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/project.js#L10)*

Yield an absolute path from a path relative to the project dir.

**`example`** bud.project('package.json') // absolute path to package.json

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relativePath` | string | relative path |

**Returns:** *string*

absolutePath

___

### `Const` projectPath

▸ **projectPath**(`dir`: string): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [projectPath.js:7](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/projectPath.js#L7)*

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

*Defined in [publicPath.js:8](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/publicPath.js#L8)*

Set the project public path.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dir` | string | public path of project |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` purge

▸ **purge**(`options`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [purge.js:33](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/purge.js#L33)*

Purge unused CSS from compiled stylesheets.

**`see`** https://purgecss.com/guides/wordpress.html

**`see`** https://purgecss.com/configuration.html

**`example`** 
bud.purge({
  enabled: bud.inProduction,
  content: [bud.project('resources/views/**')],
  allow: require('purgecss-with-wordpress').whitelist,
  allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
})

**Parameters:**

▪ **options**: *object*

purge options

Name | Type |
------ | ------ |
`content` | Object |
`css` | Object |
`defaultExtractor?` | Function |
`enabled` | boolean |
`extractors?` | array |
`fontFace` | boolean |
`keyframes` | boolean |
`output` | string |
`rejected` | boolean |
`stdin?` | boolean |
`stdout?` | boolean |
`variables?` | boolean |
`whitelist?` | string[] |
`whitelistPatterns?` | RegExp[] |
`whitelistPatternsChildren?` | RegExp[] |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` setEnv

▸ **setEnv**(`options`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [setEnv.js:8](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/setEnv.js#L8)*

Set environment variables.

**`example`** bud.setEnv({APP_NAME: 'sage'})

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

___

### `Const` splitting

▸ **splitting**(`enabled`: any): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [therest.js:46](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/therest.js#L46)*

Enable or disable code splitting.

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | any |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

TouchList

___

### `Const` src

▸ **src**(`relativePath`: string): *string*

*Defined in [src.js:10](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/src.js#L10)*

Yield an absolute path from a path relative to the src dir.

**`example`** bud.src('scripts/app.js') // absolute path to the source file

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relativePath` | string | relative path |

**Returns:** *string*

absolutePath

___

### `Const` srcPath

▸ **srcPath**(`src`: any): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [srcPath.js:10](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/srcPath.js#L10)*

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

*Defined in [sync.js:18](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/sync.js#L18)*

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

### `Const` translate

▸ **translate**(`output`: string): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [translate.js:12](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/translate.js#L12)*

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

▸ **vendor**(`enabled`: boolean): *any*

*Defined in [vendor.js:9](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/vendor.js#L9)*

Enable or disable vendor bundles.

**`example`** bud.hash(true) // enable

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`enabled` | boolean | true to enable vendor bundle. |

**Returns:** *any*

bud

___

### `Const` watch

▸ **watch**(`enabled`: any): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [watch.js:7](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/watch.js#L7)*

Enable or disable watch mode.

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | any |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud

___

### `Const` watchTimeout

▸ **watchTimeout**(`timeout`: number): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [therest.js:58](https://github.com/roots/bud-support/blob/eb59356/src/budpack/builder/api/therest.js#L58)*

Watch mode timeout

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`timeout` | number | in ms |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

TouchList
