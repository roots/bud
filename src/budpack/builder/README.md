# @roots/budpack

- [bud.alias](README.md#const-alias)
- [bud.auto](README.md#const-auto)
- [bud.babel](README.md#const-babel)
- [bud.bundle](README.md#const-bundle)
- [bud.copy](README.md#const-copy)
- [bud.copyAll](README.md#const-copyall)
- [bud.debug](README.md#const-debug)
- [bud.dependencyManifest](README.md#const-dependencymanifest)
- [bud.dev](README.md#const-dev)
- [bud.devtool](README.md#const-devtool)
- [bud.dist](README.md#const-dist)
- [bud.distPath](README.md#const-distpath)
- [bud.env](README.md#const-env)
- [bud.hash](README.md#const-hash)
- [bud.hot](README.md#const-hot)
- [bud.inlineManifest](README.md#const-inlinemanifest)
- [bud.maps](README.md#const-maps)
- [bud.mini](README.md#const-mini)
- [bud.postCss](README.md#const-postcss)
- [bud.preset](README.md#const-preset)
- [bud.project](README.md#const-project)
- [bud.projectPath](README.md#const-projectpath)
- [bud.publicPath](README.md#const-publicpath)
- [bud.purge](README.md#const-purge)
- [bud.setEnv](README.md#const-setenv)
- [bud.src](README.md#const-src)
- [bud.srcPath](README.md#const-srcpath)
- [bud.sync](README.md#const-sync)
- [bud.translate](README.md#const-translate)
- [bud.vendor](README.md#const-vendor)
- [bud.watch](README.md#const-watch)

## Functions

### `Const` bud.alias

▸ **alias**(`options`: object): _bud_

_Defined in [alias.js:9](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/alias.js#L9)_

Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.

**`example`**

```js
// with this alias set:
bud.alias({scripts: bud.src('scripts')})
// now you can import like this:
import 'scripts/myScript'
```

**Parameters:**

| Name      | Type   |
| --------- | ------ |
| `options` | object |

**Returns:** _bud_

---

### `Const` bud.auto

▸ **auto**(`options`: object): _bud_

_Defined in [auto.js:7](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/auto.js#L7)_

Automatically load modules instead of needing to import them.

**`example`**

```js
bud.auto({jquery: ['$', 'window.jQuery']})
```

**Parameters:**

| Name      | Type   |
| --------- | ------ |
| `options` | object |

**Returns:** _bud_

---

### `Const` bud.babel

▸ **babel**(`options`: object): _bud_

_Defined in [babel.js:18](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/babel.js#L18)_

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

**Returns:** _bud_

---

### `Const` bud.bundle

▸ **bundle**(`name`: string, `entries`: any[]): _bud_

_Defined in [bundle.js:9](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/bundle.js#L9)_

Compile a group of assets.

**`example`**

```js
bud.bundle('app', [bud.src('app.js'), bud.src('app.css')])
```

**Parameters:**

| Name      | Type   | Description                                   |
| --------- | ------ | --------------------------------------------- |
| `name`    | string | output name.                                  |
| `entries` | any[]  | array of src assets to include in the bundle. |

**Returns:** _bud_

---

### `Const` bud.copy

▸ **copy**(`from`: any, `to`: any): _bud_

_Defined in [copy.js:10](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/copy.js#L10)_

Copy a file.

**`namespace`** bud

**`example`**

```js
bud.copy(bud.src('images/image.png'), bud.dist('image.png'))
```

**Parameters:**

| Name   | Type |
| ------ | ---- |
| `from` | any  |
| `to`   | any  |

**Returns:** _bud_

---

### `Const` bud.copyAll

▸ **copyAll**(`src`: string, `dest`: string): _bud_

_Defined in [copyAll.js:11](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/copyAll.js#L11)_

Copy all files from a specified source to a specified destination.

**`example`**

```js
bud.copyAll(bud.src('images'), bud.dist('images'))
```

**Parameters:**

| Name   | Type   | Description     |
| ------ | ------ | --------------- |
| `src`  | string | origin dir      |
| `dest` | string | destination dir |

**Returns:** _bud_

---

### `Const` bud.debug

▸ **debug**(`enabled`: boolean): _bud_

Defined in debug.js:7

Debug mode

**Parameters:**

| Name      | Type    | Description               |
| --------- | ------- | ------------------------- |
| `enabled` | boolean | true to enable debug mode |

**Returns:** _bud_

---

### `Const` bud.dependencyManifest

▸ **dependencyManifest**(`settings`: object): _bud_

_Defined in [dependencyManifest.js:17](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/dependencyManifest.js#L17)_

Make a manifest of @wordpress dependencies utilized by entrypoints.

**`see`** https://git.io/JJLxM

**`example`**

```js
bud.dependencyManifest({
  outputFormat: 'js',
  injectPolyfill: false,
})
```

**Parameters:**

▪`Default value` **settings**: _object_= {enabled: true}

| Name                 | Type     |
| -------------------- | -------- |
| `combineAssets`      | boolean  |
| `combinedOutputFile` | string   |
| `enabled?`           | boolean  |
| `injectPolyfill`     | boolean  |
| `outputFormat`       | string   |
| `requestToExternal`  | Function |
| `requestToHandle`    | Function |
| `useDefaults`        | boolean  |

**Returns:** _bud_

---

### `Const` bud.dev

▸ **dev**(`options`: any): _bud_

Defined in dev.js:7

Development server settings

**Parameters:**

| Name      | Type |
| --------- | ---- |
| `options` | any  |

**Returns:** _bud_

---

### `Const` bud.devtool

▸ **devtool**(`devtool`: string): _bud_

_Defined in [devtool.js:7](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/devtool.js#L7)_

Specify webpack devtool to utilize.

**Parameters:**

| Name      | Type   |
| --------- | ------ |
| `devtool` | string |

**Returns:** _bud_

---

### `Const` bud.dist

▸ **dist**(`relativePath`: string): _string_

_Defined in [dist.js:10](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/dist.js#L10)_

Yield an absolute path from a path relative to the dist dir.

**`example`**

```js
bud.dist('scripts/app.js') // returns the absolute path to the compiled app.js
```

**Parameters:**

| Name           | Type   | Description   |
| -------------- | ------ | ------------- |
| `relativePath` | string | relative path |

**Returns:** _string_

absolute path

---

### `Const` bud.distPath

▸ **distPath**(`dir`: string): _bud_

_Defined in [distPath.js:10](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/distPath.js#L10)_

Set the project's dist directory.

**`example`**

```js
bud.distPath('dist') // default unless specified
```

**Parameters:**

| Name  | Type   | Description                                          |
| ----- | ------ | ---------------------------------------------------- |
| `dir` | string | path of dist directory relative to the project root. |

**Returns:** _bud_

---

### `Const` bud.env

▸ **env**(`key`: string): _string_

_Defined in [env.js:8](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/env.js#L8)_

Get environment variable value.

**`example`**

```js
bud.env('APP_NAME')
```

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `key` | string |

**Returns:** _string_

---

### `Const` bud.hash

▸ **hash**(`enabled`: boolean): _bud_

_Defined in [hash.js:8](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/hash.js#L8)_

Enable or disable filename hashing of built assets. Unless specified, filename hashes will be created when running production builds.

**`example`**

```js
bud.hash(true) // enable
```

**Parameters:**

| Name      | Type    | Description                      |
| --------- | ------- | -------------------------------- |
| `enabled` | boolean | true to enable filename hashing. |

**Returns:** _bud_

---

### `Const` bud.hot

▸ **hot**(`enabled`: boolean): _bud_

_Defined in [hot.js:8](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/hot.js#L8)_

Enable or disable hot module reloading

**`example`**

```js
bud.hot(true) // enable HMR
```

**Parameters:**

| Name      | Type    | Description                                                      |
| --------- | ------- | ---------------------------------------------------------------- |
| `enabled` | boolean | true to enable hot module reloading. default: !bud.inProduction. |

**Returns:** _bud_

---

### `Const` bud.inlineManifest

▸ **inlineManifest**(`__namedParameters`: object): _bud_

_Defined in [inlineManifest.js:12](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/inlineManifest.js#L12)_

Make a chunk to be inlined directly on the page for optimal code splitting.

**`example`**

```js
bud.inlineManifest({name: 'runtime'})
```

**`example`**

```js
bud.inlineManifest() // defaults: enabled, runtime
```

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type    | Default   |
| --------- | ------- | --------- |
| `enabled` | boolean | true      |
| `name`    | string  | "runtime" |

**Returns:** _bud_

---

### `Const` bud.maps

▸ **maps**(`enabled`: any): _bud_

_Defined in [maps.js:7](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/maps.js#L7)_

Enable or disable source-maps

**Parameters:**

| Name      | Type |
| --------- | ---- |
| `enabled` | any  |

**Returns:** _bud_

---

### `Const` bud.mini

▸ **mini**(`enable`: boolean): _bud_

_Defined in [mini.js:7](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/mini.js#L7)_

Enable or disable minification

**Parameters:**

| Name     | Type    | Description                         |
| -------- | ------- | ----------------------------------- |
| `enable` | boolean | true to enable CSS/JS minification. |

**Returns:** _bud_

---

### `Const` bud.postCss

▸ **postCss**(`options`: object): _bud_

_Defined in [postcss.js:15](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/postcss.js#L15)_

Configure PostCSS.

If you prefer, you may utilize a postcss.config.js file in the project root,
either alongside or in lieue of this configuration.

Conflicts between supplied configs will be resolved in favor of bud.config.js.

**Parameters:**

▪ **options**: _object_

| Name      | Type    |
| --------- | ------- |
| `enabled` | boolean |
| `plugins` | array   |

**Returns:** _bud_

---

### `Const` bud.preset

▸ **preset**(`relativePath`: string): _string_

_Defined in [preset.js:11](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/preset.js#L11)_

Retrieve a Bud framework preset

**`example`**

```js
bud.preset('babel/postcss')
```

**`example`**

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

### `Const` bud.project

▸ **project**(`relativePath`: string): _string_

_Defined in [project.js:10](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/project.js#L10)_

Yield an absolute path from a path relative to the project dir.

**`example`**

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

### `Const` bud.projectPath

▸ **projectPath**(`dir`: string): _bud_

_Defined in [projectPath.js:7](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/projectPath.js#L7)_

Set the project base path.

**Parameters:**

| Name  | Type   | Description              |
| ----- | ------ | ------------------------ |
| `dir` | string | absolute path of project |

**Returns:** _bud_

---

### `Const` bud.publicPath

▸ **publicPath**(`dir`: string): _bud_

_Defined in [publicPath.js:8](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/publicPath.js#L8)_

Set the project public path.

**Parameters:**

| Name  | Type   | Description            |
| ----- | ------ | ---------------------- |
| `dir` | string | public path of project |

**Returns:** _bud_

---

### `Const` bud.purge

▸ **purge**(`options`: object): _bud_

_Defined in [purge.js:33](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/purge.js#L33)_

Purge unused CSS from compiled stylesheets.

**`see`** https://purgecss.com/guides/wordpress.html

**`see`** https://purgecss.com/configuration.html

**`example`**

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

▪ **options**: _object_

purge options

| Name                         | Type     |
| ---------------------------- | -------- |
| `content`                    | Object   |
| `css`                        | Object   |
| `defaultExtractor?`          | Function |
| `enabled`                    | boolean  |
| `extractors?`                | array    |
| `fontFace`                   | boolean  |
| `keyframes`                  | boolean  |
| `output`                     | string   |
| `rejected`                   | boolean  |
| `stdin?`                     | boolean  |
| `stdout?`                    | boolean  |
| `variables?`                 | boolean  |
| `whitelist?`                 | string[] |
| `whitelistPatterns?`         | RegExp[] |
| `whitelistPatternsChildren?` | RegExp[] |

**Returns:** _bud_

---

### `Const` bud.setEnv

▸ **setEnv**(`options`: object): _bud_

_Defined in [setEnv.js:8](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/setEnv.js#L8)_

Set environment variables.

**`example`**

```js
bud.setEnv({APP_NAME: 'sage'})
```

**Parameters:**

| Name      | Type   |
| --------- | ------ |
| `options` | object |

**Returns:** _bud_

---

### `Const` bud.src

▸ **src**(`relativePath`: string): _string_

_Defined in [src.js:10](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/src.js#L10)_

Yield an absolute path from a path relative to the src dir.

**`example`**

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

### `Const` bud.srcPath

▸ **srcPath**(`src`: any): _bud_

_Defined in [srcPath.js:10](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/srcPath.js#L10)_

Set the project's src directory.

**`example`**

```js
bud.srcPath('src') // default unless specified
```

**Parameters:**

| Name  | Type |
| ----- | ---- |
| `src` | any  |

**Returns:** _bud_

---

### `Const` bud.sync

▸ **sync**(`options`: object): _bud_

_Defined in [sync.js:18](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/sync.js#L18)_

Configure BrowserSync.

**`example`**

```js
bud.sync({
  enabled: !bud.inProduction,
  proxy: 'http://bud.test',
  host: 'localhost',
  port: 3000,
})
```

**Parameters:**

▪ **options**: _object_

| Name      | Type   |
| --------- | ------ |
| `enabled` | object |
| `host`    | object |
| `port`    | object |
| `proxy`   | object |

**Returns:** _bud_

---

### `Const` bud.translate

▸ **translate**(`output`: string): _bud_

_Defined in [translate.js:12](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/translate.js#L12)_

Process @wordpress/i18n strings from JS source assets.

If you are already translating strings with `yarn translate` then
there is no reason to run this separately.

**`example`**

```js
bud.translate('resources/languages/sage.pot')
```

**Parameters:**

| Name     | Type   | Description    |
| -------- | ------ | -------------- |
| `output` | string | output makepot |

**Returns:** _bud_

---

### `Const` bud.vendor

▸ **vendor**(`enabled`: boolean): _any_

_Defined in [vendor.js:9](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/vendor.js#L9)_

Enable or disable vendor bundles.

**`example`**

```js
bud.hash(true) // enable
```

**Parameters:**

| Name      | Type    | Description                   |
| --------- | ------- | ----------------------------- |
| `enabled` | boolean | true to enable vendor bundle. |

**Returns:** _any_

---

### `Const` bud.watch

▸ **watch**(`enabled`: any): _bud_

_Defined in [watch.js:7](https://github.com/roots/bud-support/blob/424afa0/src/budpack/builder/api/watch.js#L7)_

Enable or disable watch mode.

**Parameters:**

| Name      | Type |
| --------- | ---- |
| `enabled` | any  |

**Returns:** _bud_
