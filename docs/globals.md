# @roots/bud

## Type aliases

###  Alias

Ƭ **Alias**: *function*

Defined in api/types.ts:6

#### Type declaration:

▸ (`arg0`: object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | object |

___

###  Api

Ƭ **Api**: *object*

Defined in api/types.ts:35

#### Type declaration:

* **alias**: *[Alias](globals.md#alias)*

* **auto**: *[Auto](globals.md#auto)*

* **babel**: *[Babel](globals.md#babel)*

* **bundle**: *[Bundle](globals.md#bundle)*

* **copy**: *[Copy](globals.md#copy)*

* **copyAll**: *[Copy](globals.md#copy)*

* **dashboard**: *[Dashboard](globals.md#dashboard)*

* **debug**: *[Debug](globals.md#debug)*

* **dependencyManifest**: *[DependencyManifest](globals.md#dependencymanifest)*

* **dev**: *[Dev](globals.md#dev)*

* **devtool**: *[Devtool](globals.md#devtool)*

* **inlineManifest**: *[InlineManifest](globals.md#inlinemanifest)*

* **map**: *[SourceMap](globals.md#sourcemap)*

* **mini**: *[Mini](globals.md#mini)*

* **postCss**: *[PostCss](globals.md#postcss)*

* **preset**: *[Preset](globals.md#preset)*

* **register**: *[Register](globals.md#register)*

* **resolve**: *[Resolve](globals.md#resolve)*

* **src**: *[Src](globals.md#src)*

* **srcPath**: *[SrcPath](globals.md#srcpath)*

* **sync**: *[Sync](globals.md#sync)*

* **target**: *[Target](globals.md#target)*

* **translate**: *[Translate](globals.md#translate)*

* **vendor**: *[Vendor](globals.md#vendor)*

* **watch**: *[Watch](globals.md#watch)*

___

###  Auto

Ƭ **Auto**: *function*

Defined in api/types.ts:7

#### Type declaration:

▸ (`options`: object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

___

###  Babel

Ƭ **Babel**: *function*

Defined in api/types.ts:10

#### Type declaration:

▸ (`arg0`: [BabelProperties](interfaces/babelproperties.md)): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | [BabelProperties](interfaces/babelproperties.md) |

___

###  BabelConfiguration

Ƭ **BabelConfiguration**: *object*

Defined in state/types.ts:51

#### Type declaration:

* **plugins**: *[]*

* **presets**: *[]*

___

###  BrowserSync

Ƭ **BrowserSync**: *BrowserSyncOptions*

Defined in state/types.ts:55

___

###  Bud

Ƭ **Bud**: *object*

Defined in Types.ts:25

#### Type declaration:

* **alias**: *[Alias](globals.md#alias)*

* **auto**: *[Auto](globals.md#auto)*

* **babel**: *[Babel](globals.md#babel)*

* **bundle**: *[Bundle](globals.md#bundle)*

* **copy**: *[Copy](globals.md#copy)*

* **copyAll**: *[Copy](globals.md#copy)*

* **debug**: *[Debug](globals.md#debug)*

* **dependencyManifest**: *[DependencyManifest](globals.md#dependencymanifest)*

* **dev**: *[Dev](globals.md#dev)*

* **devtool**: *[Devtool](globals.md#devtool)*

* **hooks**: *[Hooks](globals.md#hooks)*

* **mode**: *[Mode](globals.md#mode)*

* **plugin**: *[Plugin](globals.md#plugin)*

* **src**: *[Src](globals.md#src)*

* **srcPath**: *[SrcPath](globals.md#srcpath)*

* **state**: *[State](globals.md#state) | undefined*

* **sync**: *[Sync](globals.md#sync)*

* **util**: *[Util](globals.md#util)*

* **vendor**: *[Vendor](globals.md#vendor)*

* **watch**: *[Watch](globals.md#watch)*

___

###  Bundle

Ƭ **Bundle**: *function*

Defined in api/types.ts:11

#### Type declaration:

▸ (`name`: string, `entries`: Object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`entries` | Object |

___

###  Configs

Ƭ **Configs**: *object*

Defined in state/types.ts:101

Configs

#### Type declaration:

* **babel**: *string | null*

* **eslint**: *string | null*

* **postCss**: *string | null*

* **typescript**: *string | null*

___

###  Controller

Ƭ **Controller**: *object*

Defined in plugin/types.ts:20

#### Type declaration:

* **bindPluginProps**(): *function*

  * (): *any*

* **bud**? : *[Bud](globals.md#bud)*

* **buildPlugin**(): *function*

  * (): *any*

* **doPluginHook**(): *function*

  * (`hook`: string, ...`args`: any): *any*

* **ensurePluginProp**(): *function*

  * (`arg0`: string, `arg1`: any): *any*

* **initController**(): *function*

  * (`__namedParameters`: [string, function]): *[Controller](globals.md#controller)*

* **initPlugin**(): *function*

  * (): *any*

* **makePlugin**(): *function*

  * (): *any*

* **mergePluginOptions**(): *function*

  * (): *any*

* **name**? : *string*

* **plugin**? : *[BudPlugin](interfaces/budplugin.md)*

* **setPluginOptions**(): *function*

  * (): *any*

___

###  Copy

Ƭ **Copy**: *function*

Defined in state/types.ts:56

Defined in api/types.ts:12

#### Type declaration:

▸ (`from`: string, `to`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`from` | string |
`to` | string |

___

###  Dashboard

Ƭ **Dashboard**: *function*

Defined in api/types.ts:13

#### Type declaration:

▸ (`enabled`: boolean): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

___

###  Debug

Ƭ **Debug**: *function*

Defined in api/types.ts:14

#### Type declaration:

▸ (`enabled`: boolean): *any*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

___

###  DependencyManifest

Ƭ **DependencyManifest**: *function*

Defined in api/types.ts:15

#### Type declaration:

▸ (`settings?`: object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`settings?` | object |

___

###  Dev

Ƭ **Dev**: *function*

Defined in state/types.ts:60

Defined in api/types.ts:16

#### Type declaration:

▸ (`options`: object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

___

###  Devtool

Ƭ **Devtool**: *function*

Defined in api/types.ts:17

#### Type declaration:

▸ (`devtool`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`devtool` | string |

___

###  Directory

Ƭ **Directory**: *string*

Defined in state/types.ts:18

Paths

___

###  Dump

Ƭ **Dump**: *function*

Defined in util/types.ts:2

#### Type declaration:

▸ (`obj`: Object): *void*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | Object |

___

###  Environment

Ƭ **Environment**: *any*

Defined in state/types.ts:111

Env

___

###  Except

Ƭ **Except**: *Function*

Defined in util/types.ts:3

___

###  Externals

Ƭ **Externals**: *WebpackConfiguration["externals"]*

Defined in state/types.ts:61

___

###  Fab

Ƭ **Fab**: *object*

Defined in util/types.ts:5

#### Type declaration:

* **false**(): *function*

  * (): *boolean*

* **null**(): *function*

  * (): *null*

* **true**(): *function*

  * (): *boolean*

* **undefined**(): *function*

  * (): *undefined*

___

###  Features

Ƭ **Features**: *object*

Defined in state/types.ts:75

Features

#### Type declaration:

* **babel**: *boolean*

* **browserSync**: *boolean*

* **dashboard**: *boolean*

* **debug**: *boolean*

* **dependencyManifest**: *boolean*

* **dump**: *boolean*

* **eslint**: *boolean*

* **hash**: *boolean*

* **hot**: *boolean*

* **inlineManifest**: *boolean*

* **minified**: *boolean*

* **overlay**: *boolean*

* **postCss**: *boolean*

* **purge**: *boolean*

* **sourceMap**: *boolean*

* **splitting**: *boolean*

* **translate**: *boolean*

* **typescript**: *boolean*

* **vendor**: *boolean*

* **watch**: *boolean*

___

###  Hooks

Ƭ **Hooks**: *object*

Defined in hooks/types.ts:1

#### Type declaration:

* **call**(): *function*

  * (`name`: string, `params`: any): *void*

* **getAll**: *Function*

* **make**: *Function*

* **on**(): *function*

  * (`name`: string, `callback`: Function): *void*

* **registered**: *Object*

___

###  InlineManifest

Ƭ **InlineManifest**: *function*

Defined in api/types.ts:18

#### Type declaration:

▸ (`name?`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name?` | string |

___

###  Mini

Ƭ **Mini**: *function*

Defined in api/types.ts:19

#### Type declaration:

▸ (`enabled?`: boolean): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled?` | boolean |

___

###  Mode

Ƭ **Mode**: *Configuration["mode"]*

Defined in Types.ts:23

___

###  Options

Ƭ **Options**: *object*

Defined in state/types.ts:30

Options

#### Type declaration:

* **alias**: *any*

* **auto**: *any*

* **babel**: *[BabelConfiguration](globals.md#babelconfiguration)*

* **browserSync**: *Object*

* **copy**: *[Copy](globals.md#copy)*

* **dependencyManifest**: *DependencyExtractionOptions*

* **dev**: *any*

* **devtool**: *any*

* **entry**: *any*

* **env**: *any*

* **externals**: *[Externals](globals.md#externals)*

* **inlineManifest**: *Object*

* **postCss**: *[PostCssConfiguration](globals.md#postcssconfiguration)*

* **splitting**: *Object*

* **svg**: *[Svg](globals.md#svg)*

* **target**: *WebpackConfiguration["target"]*

* **typescript**: *[Typescript](globals.md#typescript)*

* **uglify**: *Object*

* **vendor**: *[Vendor](globals.md#vendor)*

___

###  Paths

Ƭ **Paths**: *object*

Defined in state/types.ts:19

#### Type declaration:

* **dist**: *[Directory](globals.md#directory)*

* **framework**: *[Directory](globals.md#directory)*

* **project**: *[Directory](globals.md#directory)*

* **public**: *[Directory](globals.md#directory)*

* **src**: *[Directory](globals.md#directory)*

___

###  Plugin

Ƭ **Plugin**: *object*

Defined in plugin/types.ts:5

#### Type declaration:

* **controller**(): *function*

  * (`bud`: [Bud](globals.md#bud)): *[Controller](globals.md#controller)*

* **webpackAdapters**: *[WebpackAdapters](globals.md#webpackadapters)*

___

###  PostCss

Ƭ **PostCss**: *function*

Defined in api/types.ts:20

#### Type declaration:

▸ (`options?`: object): *[Bud](globals.md#bud)*

**Parameters:**

▪`Optional`  **options**: *object*

Name | Type |
------ | ------ |
`enabled?` | boolean |
`plugins?` | any[] |

___

###  PostCssConfiguration

Ƭ **PostCssConfiguration**: *object*

Defined in state/types.ts:62

#### Type declaration:

* **plugins**: *[]*

___

###  Preset

Ƭ **Preset**: *function*

Defined in api/types.ts:24

#### Type declaration:

▸ (`relativePath`: string): *any*

**Parameters:**

Name | Type |
------ | ------ |
`relativePath` | string |

___

###  Production

Ƭ **Production**: *boolean*

Defined in Types.ts:24

___

###  Register

Ƭ **Register**: *function*

Defined in api/types.ts:26

#### Type declaration:

▸ (`name`: string, `plugin`: any): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`plugin` | any |

___

###  RegisteredPlugin

Ƭ **RegisteredPlugin**: *[string, [WebpackAdapter](globals.md#webpackadapter)]*

Defined in plugin/types.ts:9

___

###  Resolve

Ƭ **Resolve**: *function*

Defined in api/types.ts:25

#### Type declaration:

▸ (`moduleName`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`moduleName` | string |

___

###  ShortCircuit

Ƭ **ShortCircuit**: *function*

Defined in util/types.ts:4

#### Type declaration:

▸ (): *any*

___

###  SourceMap

Ƭ **SourceMap**: *function*

Defined in api/types.ts:27

#### Type declaration:

▸ (`enabled`: boolean): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

___

###  Src

Ƭ **Src**: *function*

Defined in api/types.ts:28

#### Type declaration:

▸ (`relativePath`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`relativePath` | string |

___

###  SrcPath

Ƭ **SrcPath**: *function*

Defined in api/types.ts:29

#### Type declaration:

▸ (`src`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`src` | string |

___

###  State

Ƭ **State**: *object*

Defined in state/types.ts:8

Mitch, all together.

#### Type declaration:

* **configs**: *[Configs](globals.md#configs)*

* **features**: *[Features](globals.md#features)*

* **options**: *[Options](globals.md#options)*

* **paths**: *[Paths](globals.md#paths)*

___

###  Svg

Ƭ **Svg**: *any*

Defined in state/types.ts:65

___

###  Sync

Ƭ **Sync**: *function*

Defined in api/types.ts:30

#### Type declaration:

▸ (`arg0`: [SyncOptions](interfaces/syncoptions.md)): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | [SyncOptions](interfaces/syncoptions.md) |

___

###  Target

Ƭ **Target**: *function*

Defined in state/types.ts:66

Defined in api/types.ts:31

#### Type declaration:

▸ (`target`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`target` | string |

___

###  Translate

Ƭ **Translate**: *function*

Defined in api/types.ts:32

#### Type declaration:

▸ (`output`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | string |

___

###  Typescript

Ƭ **Typescript**: *Object*

Defined in state/types.ts:67

___

###  Util

Ƭ **Util**: *object*

Defined in util/types.ts:11

#### Type declaration:

* **dump**: *[Dump](globals.md#dump)*

* **except**: *[Except](globals.md#except)*

* **fab**: *[Fab](globals.md#fab)*

* **shortCircuit**: *[ShortCircuit](globals.md#shortcircuit)*

* **terminate**(): *function*

  * (`any`: any): *void*

___

###  Vendor

Ƭ **Vendor**: *function*

Defined in state/types.ts:68

Defined in api/types.ts:34

#### Type declaration:

▸ (`name`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

___

###  Watch

Ƭ **Watch**: *function*

Defined in api/types.ts:33

#### Type declaration:

▸ (`enabled`: boolean): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

___

###  WebpackAdapter

Ƭ **WebpackAdapter**: *function*

Defined in plugin/types.ts:10

#### Type declaration:

▸ (): *any*

___

###  WebpackAdapters

Ƭ **WebpackAdapters**: *[RegisteredPlugin](globals.md#registeredplugin)[]*

Defined in plugin/types.ts:11

## Functions

### `Const` alias

▸ **alias**(`this`: [Bud](globals.md#bud), `options`: object): *[Bud](globals.md#bud)*

*Defined in [api/alias.ts:21](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/alias.ts#L21)*

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
`this` | [Bud](globals.md#bud) |
`options` | object |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` auto

▸ **auto**(`this`: [Bud](globals.md#bud), `options`: object): *[Bud](globals.md#bud)*

*Defined in [api/auto.ts:12](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/auto.ts#L12)*

## bud.auto

Automatically load modules instead of needing to import them.

```js
bud.auto({jquery: ['$', 'window.jQuery']})
```

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Bud](globals.md#bud) |
`options` | object |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` babel

▸ **babel**(`this`: [Bud](globals.md#bud), `options`: [BabelProperties](interfaces/babelproperties.md)): *[Bud](globals.md#bud)*

*Defined in [api/babel.ts:15](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/babel.ts#L15)*

## bud.babel

Configure Babel.

If you prefer, you may utilize a babel.config.js file in the project root,
either alongside or in lieue of this configuration.

Conflicts between supplied configs will be resolved in favor of bud.config.js.

**`see`** https://babeljs.io/docs/en/configuration

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Bud](globals.md#bud) |
`options` | [BabelProperties](interfaces/babelproperties.md) |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` bundle

▸ **bundle**(`this`: [Bud](globals.md#bud), `name`: string, `entries`: object): *[Bud](globals.md#bud)*

*Defined in [api/bundle.ts:15](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/bundle.ts#L15)*

## bud.bundle

Compile a group of assets.

```js
bud.bundle('app', [
  bud.src('app.js'),
  bud.src('app.css'),
])
```

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Bud](globals.md#bud) |
`name` | string |
`entries` | object |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` copy

▸ **copy**(`this`: [Bud](globals.md#bud), `from`: string, `to`: string): *[Bud](globals.md#bud)*

*Defined in [api/copy.ts:15](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/copy.ts#L15)*

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
`this` | [Bud](globals.md#bud) |
`from` | string |
`to` | string |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` copyAll

▸ **copyAll**(`this`: [Bud](globals.md#bud), `from`: string, `to`: any): *[Bud](globals.md#bud)*

*Defined in [api/copyAll.ts:13](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/copyAll.ts#L13)*

## bud.copyAll

Copy all files from a specified source to a specified destination.

```js
bud.copyAll(bud.src('images'), bud.dist('images'))
```

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Bud](globals.md#bud) |
`from` | string |
`to` | any |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` dashboard

▸ **dashboard**(`this`: [Bud](globals.md#bud), `enabled`: boolean): *object*

*Defined in [api/dashboard.ts:12](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/dashboard.ts#L12)*

## bud.dashboard

Enable or disable Bud's CLI build output.

```js
bud.dashboard(false) // disable dashboard
```

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Bud](globals.md#bud) |
`enabled` | boolean |

**Returns:** *object*

* **alias**: *[Alias](globals.md#alias)*

* **auto**: *[Auto](globals.md#auto)*

* **babel**: *[Babel](globals.md#babel)*

* **bundle**: *[Bundle](globals.md#bundle)*

* **copy**: *[Copy](globals.md#copy)*

* **copyAll**: *[Copy](globals.md#copy)*

* **debug**: *[Debug](globals.md#debug)*

* **dependencyManifest**: *[DependencyManifest](globals.md#dependencymanifest)*

* **dev**: *[Dev](globals.md#dev)*

* **devtool**: *[Devtool](globals.md#devtool)*

* **hooks**: *[Hooks](globals.md#hooks)*

* **mode**: *[Mode](globals.md#mode)*

* **plugin**: *[Plugin](globals.md#plugin)*

* **src**: *[Src](globals.md#src)*

* **srcPath**: *[SrcPath](globals.md#srcpath)*

* **state**: *[State](globals.md#state) | undefined*

* **sync**: *[Sync](globals.md#sync)*

* **util**: *[Util](globals.md#util)*

* **vendor**: *[Vendor](globals.md#vendor)*

* **watch**: *[Watch](globals.md#watch)*

___

### `Const` debug

▸ **debug**(`this`: [Bud](globals.md#bud), `enabled`: boolean): *[Bud](globals.md#bud)*

*Defined in [api/debug.ts:16](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/debug.ts#L16)*

## bud.debug

Enable or disable debug mode.

```js
bud.debug(true) // debug enabled
```

```js
bud.debug(false) // debug disabled
```

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Bud](globals.md#bud) |
`enabled` | boolean |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` dependencyManifest

▸ **dependencyManifest**(`settings`: object): *[Bud](globals.md#bud)*

*Defined in [api/dependencyManifest.ts:12](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/dependencyManifest.ts#L12)*

## bud.dependencyManifest

**`see`** https://git.io/JJLxM

```js
bud.dependencyManifest({outputFormat: 'js', injectPolyfill: false})
```

**Parameters:**

Name | Type |
------ | ------ |
`settings` | object |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` dev

▸ **dev**(`options`: object): *[Bud](globals.md#bud)*

*Defined in [api/dev.ts:6](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/dev.ts#L6)*

Development server settings

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` devtool

▸ **devtool**(`devtool`: string): *[Bud](globals.md#bud)*

*Defined in [api/devtool.ts:6](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/devtool.ts#L6)*

Specify webpack devtool

**Parameters:**

Name | Type |
------ | ------ |
`devtool` | string |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` dist

▸ **dist**(`relativePath`: string): *string*

*Defined in [api/dist.ts:12](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/dist.ts#L12)*

## bud.dist

Yield an absolute path from a path relative to the dist dir.

```js
bud.dist('scripts/app.js')
```

**Parameters:**

Name | Type |
------ | ------ |
`relativePath` | string |

**Returns:** *string*

___

### `Const` distPath

▸ **distPath**(`dir`: string): *[Bud](globals.md#bud)*

*Defined in [api/distPath.ts:11](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/distPath.ts#L11)*

Set the project's dist directory.

```js
bud.distPath('dist')
```

**Parameters:**

Name | Type |
------ | ------ |
`dir` | string |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` dump

▸ **dump**(`enabled`: boolean): *[Bud](globals.md#bud)*

*Defined in [api/dump.ts:10](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/dump.ts#L10)*

Dump generated webpack config for debugging

```js
bud.dump(true)
```

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` env

▸ **env**(`key`: string | number): *any*

*Defined in [api/env.ts:7](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/env.ts#L7)*

Get environment variable value.

**`example`** bud.env('APP_NAME')

**Parameters:**

Name | Type |
------ | ------ |
`key` | string &#124; number |

**Returns:** *any*

___

### `Const` hash

▸ **hash**(`enabled`: boolean): *any*

*Defined in [api/hash.ts:7](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/hash.ts#L7)*

Enable or disable filename hashing of built assets. Unless specified, filename hashes will be created when running production builds.

**`example`** bud.hash(true) // enable

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`enabled` | boolean | true | true to enable filename hashing. |

**Returns:** *any*

bud

___

### `Const` hot

▸ **hot**(`enabled`: boolean): *[Bud](globals.md#bud)*

*Defined in [api/hot.ts:12](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/hot.ts#L12)*

## bud.hot

Enable or disable hot module reloading

```js
bud.hot(true) // enable HMR
```

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` inlineManifest

▸ **inlineManifest**(`name`: string): *[Bud](globals.md#bud)*

*Defined in [api/inlineManifest.ts:10](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/inlineManifest.ts#L10)*

Inline common scripts.

```js
bud.inlineManifest({name: 'runtime'})
```

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` map

▸ **map**(`enabled`: boolean): *[Bud](globals.md#bud)*

*Defined in [api/map.ts:14](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/map.ts#L14)*

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

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` mini

▸ **mini**(`enable`: boolean): *[Bud](globals.md#bud)*

*Defined in [api/mini.ts:16](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/mini.ts#L16)*

## bud.hot

Enable or disable minification

```js
bud.hot(true) // enable
```

```js
bud.hot(false) // disable
```

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enable` | boolean | true |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` postCss

▸ **postCss**(`__namedParameters`: object): *[Bud](globals.md#bud)*

*Defined in [api/postcss.ts:21](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/postcss.ts#L21)*

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
```

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`options` | options | - |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` preset

▸ **preset**(`relativePath`: string): *any*

*Defined in [api/preset.ts:23](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/preset.ts#L23)*

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

Name | Type |
------ | ------ |
`relativePath` | string |

**Returns:** *any*

___

### `Const` project

▸ **project**(`relativePath`: string): *string*

*Defined in [api/project.ts:12](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/project.ts#L12)*

## bud.project

Yield an absolute path from a path relative to the `bud.projectPath`.

```js
bud.project('package.json') // absolute path to package.json
```

**Parameters:**

Name | Type |
------ | ------ |
`relativePath` | string |

**Returns:** *string*

___

### `Const` projectPath

▸ **projectPath**(`dir`: string): *[Bud](globals.md#bud)*

*Defined in [api/projectPath.ts:12](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/projectPath.ts#L12)*

## bud.projectPath

Set the project base path.

```js
bud.projectPath(__dirname)
```

**Parameters:**

Name | Type |
------ | ------ |
`dir` | string |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` publicPath

▸ **publicPath**(`dir`: string): *[Bud](globals.md#bud)*

*Defined in [api/publicPath.ts:14](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/publicPath.ts#L14)*

## bud.publicPath

Set the project public path.

### Example

```js
bud.publicPath('dist')
```

**Parameters:**

Name | Type |
------ | ------ |
`dir` | string |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` purge

▸ **purge**(`__namedParameters`: object): *[Bud](globals.md#bud)*

*Defined in [api/purge.ts:20](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/purge.ts#L20)*

## bud.purge

Purge unused CSS from compiled stylesheets

**`see`** https://purgecss.com/guides/wordpress.html

**`see`** https://purgecss.com/configuration.html

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
`enabled` | boolean | true |
`options` | options | - |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` register

▸ **register**(`name`: string, `plugin`: any): *[Bud](globals.md#bud)*

*Defined in [api/register.ts:12](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/register.ts#L12)*

## bud.register

Register a Bud plugin

```js
bud.register('myPlugin', myPlugin)
```

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`plugin` | any |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` resolve

▸ **resolve**(`moduleName`: string): *string*

*Defined in [api/resolve.ts:13](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/resolve.ts#L13)*

## bud.resolve

Resolve a module.

```js
bud.resolve('scripts/app.js')
```

**Parameters:**

Name | Type |
------ | ------ |
`moduleName` | string |

**Returns:** *string*

___

### `Const` setEnv

▸ **setEnv**(`options`: any): *[Bud](globals.md#bud)*

*Defined in [api/setEnv.ts:15](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/setEnv.ts#L15)*

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
`options` | any |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` src

▸ **src**(`relativePath`: string): *string*

*Defined in [api/src.ts:13](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/src.ts#L13)*

## bud.src

Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.

```js
bud.src('scripts/app.js') // absolute path to the source file
```

**Parameters:**

Name | Type |
------ | ------ |
`relativePath` | string |

**Returns:** *string*

___

### `Const` srcPath

▸ **srcPath**(`src`: string): *[Bud](globals.md#bud)*

*Defined in [api/srcPath.ts:13](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/srcPath.ts#L13)*

## bud.srcPath

Set the project's src directory.

 ```js
bud.srcPath('src') // default unless specified
```

**Parameters:**

Name | Type |
------ | ------ |
`src` | string |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` sync

▸ **sync**(`__namedParameters`: object): *[Bud](globals.md#bud)*

*Defined in [api/sync.ts:17](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/sync.ts#L17)*

## bud.sync

Configure BrowserSync.

```js
bud.sync({
  enabled: !bud.inProduction,
  proxy: 'http://bud.test',
  host: 'localhost',
  port: 3000,
})
```

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`enabled` | boolean |
`options` | Options |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` target

▸ **target**(`target`: string): *[Bud](globals.md#bud)*

*Defined in [api/target.ts:12](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/target.ts#L12)*

bud.target

Set the build target.

```js
bud.target('web') // default
```

**Parameters:**

Name | Type |
------ | ------ |
`target` | string |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` translate

▸ **translate**(`output`: string): *[Bud](globals.md#bud)*

*Defined in [api/translate.ts:15](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/translate.ts#L15)*

## bud.translate

Process @wordpress/i18n strings from JS source assets.

If you are already translating strings with `yarn translate` then
there is no reason to run this separately.

```js
bud.translate('resources/languages/sage.pot')
```

**Parameters:**

Name | Type |
------ | ------ |
`output` | string |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` vendor

▸ **vendor**(`name`: string): *any*

*Defined in [api/vendor.ts:12](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/vendor.ts#L12)*

## bud.vendor

Enable vendor bundling.

```js
bud.vendor('vendor')
```

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`name` | string | "vendor" |

**Returns:** *any*

___

### `Const` watch

▸ **watch**(`enabled`: boolean): *[Bud](globals.md#bud)*

*Defined in [api/watch.ts:12](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/watch.ts#L12)*

## bud.watch

Enable or disable watch mode.

```js
bud.watch(true)
```

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

**Returns:** *[Bud](globals.md#bud)*

## Object literals

### `Const` api

### ▪ **api**: *object*

*Defined in [api/index.ts:41](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L41)*

Bud.Bud export

###  alias

• **alias**: *function*

*Defined in [api/index.ts:42](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L42)*

#### Type declaration:

▸ (`arg0`: object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | object |

###  auto

• **auto**: *function*

*Defined in [api/index.ts:43](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L43)*

#### Type declaration:

▸ (`options`: object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

###  babel

• **babel**: *function*

*Defined in [api/index.ts:44](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L44)*

#### Type declaration:

▸ (`arg0`: [BabelProperties](interfaces/babelproperties.md)): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | [BabelProperties](interfaces/babelproperties.md) |

###  bundle

• **bundle**: *function*

*Defined in [api/index.ts:45](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L45)*

#### Type declaration:

▸ (`name`: string, `entries`: Object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`entries` | Object |

###  copy

• **copy**: *function*

*Defined in [api/index.ts:46](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L46)*

#### Type declaration:

▸ (`from`: string, `to`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`from` | string |
`to` | string |

###  copyAll

• **copyAll**: *function*

*Defined in [api/index.ts:47](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L47)*

#### Type declaration:

▸ (`from`: string, `to`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`from` | string |
`to` | string |

###  dashboard

• **dashboard**: *function*

*Defined in [api/index.ts:48](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L48)*

#### Type declaration:

▸ (`enabled`: boolean): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

###  debug

• **debug**: *function*

*Defined in [api/index.ts:49](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L49)*

#### Type declaration:

▸ (`enabled`: boolean): *any*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

###  dependencyManifest

• **dependencyManifest**: *function*

*Defined in [api/index.ts:50](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L50)*

#### Type declaration:

▸ (`settings?`: object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`settings?` | object |

###  dev

• **dev**: *function*

*Defined in [api/index.ts:51](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L51)*

#### Type declaration:

▸ (`options`: object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

###  devtool

• **devtool**: *function*

*Defined in [api/index.ts:52](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L52)*

#### Type declaration:

▸ (`devtool`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`devtool` | string |

###  dist

• **dist**: *[dist](globals.md#const-dist)*

*Defined in [api/index.ts:53](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L53)*

###  distPath

• **distPath**: *[distPath](globals.md#const-distpath)*

*Defined in [api/index.ts:54](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L54)*

###  dump

• **dump**: *[dump](globals.md#const-dump)*

*Defined in [api/index.ts:55](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L55)*

###  env

• **env**: *[env](globals.md#const-env)*

*Defined in [api/index.ts:56](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L56)*

###  hash

• **hash**: *[hash](globals.md#const-hash)*

*Defined in [api/index.ts:57](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L57)*

###  hot

• **hot**: *[hot](globals.md#const-hot)*

*Defined in [api/index.ts:58](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L58)*

###  inlineManifest

• **inlineManifest**: *function*

*Defined in [api/index.ts:59](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L59)*

#### Type declaration:

▸ (`name?`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name?` | string |

###  map

• **map**: *function*

*Defined in [api/index.ts:60](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L60)*

#### Type declaration:

▸ (`enabled`: boolean): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

###  mini

• **mini**: *function*

*Defined in [api/index.ts:61](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L61)*

#### Type declaration:

▸ (`enabled?`: boolean): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled?` | boolean |

###  postCss

• **postCss**: *function*

*Defined in [api/index.ts:62](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L62)*

#### Type declaration:

▸ (`options?`: object): *[Bud](globals.md#bud)*

**Parameters:**

▪`Optional`  **options**: *object*

Name | Type |
------ | ------ |
`enabled?` | boolean |
`plugins?` | any[] |

###  preset

• **preset**: *function*

*Defined in [api/index.ts:63](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L63)*

#### Type declaration:

▸ (`relativePath`: string): *any*

**Parameters:**

Name | Type |
------ | ------ |
`relativePath` | string |

###  project

• **project**: *[project](globals.md#const-project)*

*Defined in [api/index.ts:64](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L64)*

###  projectPath

• **projectPath**: *[projectPath](globals.md#const-projectpath)*

*Defined in [api/index.ts:65](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L65)*

###  publicPath

• **publicPath**: *[publicPath](globals.md#const-publicpath)*

*Defined in [api/index.ts:66](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L66)*

###  purge

• **purge**: *[purge](globals.md#const-purge)*

*Defined in [api/index.ts:67](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L67)*

###  register

• **register**: *function*

*Defined in [api/index.ts:68](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L68)*

#### Type declaration:

▸ (`name`: string, `plugin`: any): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`plugin` | any |

###  resolve

• **resolve**: *function*

*Defined in [api/index.ts:69](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L69)*

#### Type declaration:

▸ (`moduleName`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`moduleName` | string |

###  setEnv

• **setEnv**: *[setEnv](globals.md#const-setenv)*

*Defined in [api/index.ts:70](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L70)*

###  src

• **src**: *function*

*Defined in [api/index.ts:71](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L71)*

#### Type declaration:

▸ (`relativePath`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`relativePath` | string |

###  srcPath

• **srcPath**: *function*

*Defined in [api/index.ts:72](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L72)*

#### Type declaration:

▸ (`src`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`src` | string |

###  sync

• **sync**: *function*

*Defined in [api/index.ts:73](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L73)*

#### Type declaration:

▸ (`arg0`: [SyncOptions](interfaces/syncoptions.md)): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | [SyncOptions](interfaces/syncoptions.md) |

###  target

• **target**: *function*

*Defined in [api/index.ts:74](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L74)*

#### Type declaration:

▸ (`target`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`target` | string |

###  translate

• **translate**: *function*

*Defined in [api/index.ts:75](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L75)*

#### Type declaration:

▸ (`output`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | string |

###  vendor

• **vendor**: *function*

*Defined in [api/index.ts:76](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L76)*

#### Type declaration:

▸ (`name`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

###  watch

• **watch**: *function*

*Defined in [api/index.ts:77](https://github.com/roots/bud-support/blob/8b85437/src/bud/api/index.ts#L77)*

#### Type declaration:

▸ (`enabled`: boolean): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
