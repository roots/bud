# @roots/bud

## Type aliases

###  Alias

Ƭ **Alias**: *function*

*Defined in [src/bud/api/types.ts:6](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L6)*

#### Type declaration:

▸ (`arg0`: object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | object |

___

###  Api

Ƭ **Api**: *object*

*Defined in [src/bud/api/types.ts:35](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L35)*

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

*Defined in [src/bud/api/types.ts:7](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L7)*

#### Type declaration:

▸ (`options`: object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

___

###  Babel

Ƭ **Babel**: *function*

*Defined in [src/bud/api/types.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L10)*

#### Type declaration:

▸ (`arg0`: [BabelProperties](interfaces/babelproperties.md)): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | [BabelProperties](interfaces/babelproperties.md) |

___

###  BabelConfiguration

Ƭ **BabelConfiguration**: *object*

*Defined in [src/bud/state/types.ts:51](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L51)*

#### Type declaration:

* **plugins**: *[]*

* **presets**: *[]*

___

###  BrowserSync

Ƭ **BrowserSync**: *BrowserSyncOptions*

*Defined in [src/bud/state/types.ts:55](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L55)*

___

###  Bud

Ƭ **Bud**: *object*

*Defined in [src/bud/types.ts:25](https://github.com/roots/bud-support/blob/bd00b72/src/bud/types.ts#L25)*

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

* **inProduction**: *[Production](globals.md#production)*

* **mode**: *[Mode](globals.md#mode)*

* **plugin**: *[Plugin](globals.md#plugin)*

* **src**: *[Src](globals.md#src)*

* **srcPath**: *[SrcPath](globals.md#srcpath)*

* **state**: *[State](globals.md#state)*

* **sync**: *[Sync](globals.md#sync)*

* **util**: *[Util](globals.md#util)*

* **vendor**: *[Vendor](globals.md#vendor)*

* **watch**: *[Watch](globals.md#watch)*

___

###  BudRenderer

Ƭ **BudRenderer**: *function*

*Defined in [src/compiler/types.ts:35](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/types.ts#L35)*

BudRenderer

**`param`**

**`param`**

**`returns`**

#### Type declaration:

▸ (`config`: [Bud](globals.md#bud), `webpackConfig`: Configuration): *void*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [Bud](globals.md#bud) |
`webpackConfig` | Configuration |

___

###  BuilderConstructor

Ƭ **BuilderConstructor**: *function*

*Defined in [src/build/types.ts:17](https://github.com/roots/bud-support/blob/bd00b72/src/build/types.ts#L17)*

#### Type declaration:

▸ (`bud`: [Bud](globals.md#bud)): *[Builder](interfaces/builder.md)*

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](globals.md#bud) |

___

###  BuilderController

Ƭ **BuilderController**: *object*

*Defined in [src/build/types.ts:6](https://github.com/roots/bud-support/blob/bd00b72/src/build/types.ts#L6)*

#### Type declaration:

* **bud**: *[Bud](globals.md#bud)*

* **builders**: *[RegisteredBuilder](globals.md#registeredbuilder)[]*

* **config**: *WebpackConfig*

* **doHook**(): *function*

  * (`name`: string, ...`any`: any): *void*

* **makeConfig**(): *function*

  * (): *WebpackConfig*

* **mergeConfig**(): *function*

  * (`configValues`: Object): *void*

* **postBuilderHook**(): *function*

  * (`name`: string, `arg1`: any): *void*

* **preBuilderHook**(): *function*

  * (`name`: string, `arg1`: any): *void*

___

###  Bundle

Ƭ **Bundle**: *function*

*Defined in [src/bud/api/types.ts:11](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L11)*

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

*Defined in [src/bud/state/types.ts:101](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L101)*

Configs

#### Type declaration:

* **babel**: *string | null*

* **eslint**: *string | null*

* **postCss**: *string | null*

* **typescript**: *string | null*

___

###  Controller

Ƭ **Controller**: *object*

*Defined in [src/bud/plugin/types.ts:20](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/types.ts#L20)*

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

*Defined in [src/bud/state/types.ts:56](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L56)*

*Defined in [src/bud/api/types.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L12)*

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

*Defined in [src/bud/api/types.ts:13](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L13)*

#### Type declaration:

▸ (`enabled`: boolean): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

___

###  Debug

Ƭ **Debug**: *function*

*Defined in [src/bud/api/types.ts:14](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L14)*

#### Type declaration:

▸ (`enabled`: boolean): *any*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

___

###  DependencyManifest

Ƭ **DependencyManifest**: *function*

*Defined in [src/bud/api/types.ts:15](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L15)*

#### Type declaration:

▸ (`settings?`: object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`settings?` | object |

___

###  Dev

Ƭ **Dev**: *function*

*Defined in [src/bud/state/types.ts:60](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L60)*

*Defined in [src/bud/api/types.ts:16](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L16)*

#### Type declaration:

▸ (`options`: object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

___

###  Devtool

Ƭ **Devtool**: *function*

*Defined in [src/bud/api/types.ts:17](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L17)*

#### Type declaration:

▸ (`devtool`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`devtool` | string |

___

###  Directory

Ƭ **Directory**: *string*

*Defined in [src/bud/state/types.ts:18](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L18)*

Paths

___

###  Dump

Ƭ **Dump**: *function*

*Defined in [src/bud/util/types.ts:2](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/types.ts#L2)*

#### Type declaration:

▸ (`obj`: Object): *void*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | Object |

___

###  Environment

Ƭ **Environment**: *any*

*Defined in [src/bud/state/types.ts:111](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L111)*

Env

___

###  Except

Ƭ **Except**: *Function*

*Defined in [src/bud/util/types.ts:3](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/types.ts#L3)*

___

###  Externals

Ƭ **Externals**: *WebpackConfiguration["externals"]*

*Defined in [src/bud/state/types.ts:61](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L61)*

___

###  Fab

Ƭ **Fab**: *object*

*Defined in [src/bud/util/types.ts:5](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/types.ts#L5)*

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

*Defined in [src/bud/state/types.ts:75](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L75)*

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

*Defined in [src/bud/hooks/types.ts:1](https://github.com/roots/bud-support/blob/bd00b72/src/bud/hooks/types.ts#L1)*

#### Type declaration:

* **call**(): *function*

  * (`name`: string, `params`: any): *void*

* **getAll**: *Function*

* **make**: *Function*

* **on**(): *function*

  * (`name`: string, `callback`: Function): *void*

* **registered**: *Object*

___

###  ImageRulesFactory

Ƭ **ImageRulesFactory**: *function*

*Defined in [src/build/rules/image.ts:21](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/image.ts#L21)*

#### Type declaration:

▸ (`bud`: object): *[imageLoaderInterface](globals.md#imageloaderinterface)*

**Parameters:**

Name | Type |
------ | ------ |
`bud` | object |

___

###  InlineManifest

Ƭ **InlineManifest**: *function*

*Defined in [src/bud/api/types.ts:18](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L18)*

#### Type declaration:

▸ (`name?`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name?` | string |

___

###  Mini

Ƭ **Mini**: *function*

*Defined in [src/bud/api/types.ts:19](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L19)*

#### Type declaration:

▸ (`enabled?`: boolean): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled?` | boolean |

___

###  Mode

Ƭ **Mode**: *Configuration["mode"]*

*Defined in [src/bud/types.ts:23](https://github.com/roots/bud-support/blob/bd00b72/src/bud/types.ts#L23)*

___

###  Options

Ƭ **Options**: *object*

*Defined in [src/bud/state/types.ts:30](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L30)*

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

*Defined in [src/bud/state/types.ts:19](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L19)*

#### Type declaration:

* **dist**: *[Directory](globals.md#directory)*

* **framework**: *[Directory](globals.md#directory)*

* **project**: *[Directory](globals.md#directory)*

* **public**: *[Directory](globals.md#directory)*

* **src**: *[Directory](globals.md#directory)*

___

###  Plugin

Ƭ **Plugin**: *object*

*Defined in [src/bud/plugin/types.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/types.ts#L4)*

#### Type declaration:

* **controller**(): *function*

  * (`bud`: [Bud](globals.md#bud)): *[Controller](globals.md#controller)*

* **webpackAdapters**: *[WebpackAdapters](globals.md#webpackadapters)*

___

###  PostCss

Ƭ **PostCss**: *function*

*Defined in [src/bud/api/types.ts:20](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L20)*

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

*Defined in [src/bud/state/types.ts:62](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L62)*

#### Type declaration:

* **plugins**: *[]*

___

###  Preset

Ƭ **Preset**: *function*

*Defined in [src/bud/api/types.ts:24](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L24)*

#### Type declaration:

▸ (`relativePath`: string): *any*

**Parameters:**

Name | Type |
------ | ------ |
`relativePath` | string |

___

###  Production

Ƭ **Production**: *boolean*

*Defined in [src/bud/types.ts:24](https://github.com/roots/bud-support/blob/bd00b72/src/bud/types.ts#L24)*

___

###  Register

Ƭ **Register**: *function*

*Defined in [src/bud/api/types.ts:26](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L26)*

#### Type declaration:

▸ (`name`: string, `plugin`: any): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`plugin` | any |

___

###  RegisteredBuilder

Ƭ **RegisteredBuilder**: *[string, [BuilderConstructor](globals.md#builderconstructor)]*

*Defined in [src/build/types.ts:16](https://github.com/roots/bud-support/blob/bd00b72/src/build/types.ts#L16)*

___

###  RegisteredPlugin

Ƭ **RegisteredPlugin**: *[string, [WebpackAdapter](globals.md#webpackadapter)]*

*Defined in [src/bud/plugin/types.ts:9](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/types.ts#L9)*

___

###  Resolve

Ƭ **Resolve**: *function*

*Defined in [src/bud/api/types.ts:25](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L25)*

#### Type declaration:

▸ (`moduleName`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`moduleName` | string |

___

###  ShortCircuit

Ƭ **ShortCircuit**: *function*

*Defined in [src/bud/util/types.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/types.ts#L4)*

#### Type declaration:

▸ (): *any*

___

###  SourceMap

Ƭ **SourceMap**: *function*

*Defined in [src/bud/api/types.ts:27](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L27)*

#### Type declaration:

▸ (`enabled`: boolean): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

___

###  Src

Ƭ **Src**: *function*

*Defined in [src/bud/api/types.ts:28](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L28)*

#### Type declaration:

▸ (`relativePath`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`relativePath` | string |

___

###  SrcPath

Ƭ **SrcPath**: *function*

*Defined in [src/bud/api/types.ts:29](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L29)*

#### Type declaration:

▸ (`src`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`src` | string |

___

###  State

Ƭ **State**: *object*

*Defined in [src/bud/state/types.ts:8](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L8)*

Mitch, all together.

#### Type declaration:

* **configs**: *[Configs](globals.md#configs)*

* **features**: *[Features](globals.md#features)*

* **options**: *[Options](globals.md#options)*

* **paths**: *[Paths](globals.md#paths)*

___

###  Svg

Ƭ **Svg**: *any*

*Defined in [src/bud/state/types.ts:65](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L65)*

___

###  Sync

Ƭ **Sync**: *function*

*Defined in [src/bud/api/types.ts:30](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L30)*

#### Type declaration:

▸ (`arg0`: [SyncOptions](interfaces/syncoptions.md)): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | [SyncOptions](interfaces/syncoptions.md) |

___

###  Target

Ƭ **Target**: *function*

*Defined in [src/bud/state/types.ts:66](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L66)*

*Defined in [src/bud/api/types.ts:31](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L31)*

#### Type declaration:

▸ (`target`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`target` | string |

___

###  Translate

Ƭ **Translate**: *function*

*Defined in [src/bud/api/types.ts:32](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L32)*

#### Type declaration:

▸ (`output`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | string |

___

###  Typescript

Ƭ **Typescript**: *Object*

*Defined in [src/bud/state/types.ts:67](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L67)*

___

###  Util

Ƭ **Util**: *object*

*Defined in [src/bud/util/types.ts:11](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/types.ts#L11)*

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

*Defined in [src/bud/state/types.ts:68](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L68)*

*Defined in [src/bud/api/types.ts:34](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L34)*

#### Type declaration:

▸ (`name`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

___

###  Watch

Ƭ **Watch**: *function*

*Defined in [src/bud/api/types.ts:33](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L33)*

#### Type declaration:

▸ (`enabled`: boolean): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

___

###  WebpackAdapter

Ƭ **WebpackAdapter**: *function*

*Defined in [src/bud/plugin/types.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/types.ts#L10)*

#### Type declaration:

▸ (): *any*

___

###  WebpackAdapters

Ƭ **WebpackAdapters**: *[RegisteredPlugin](globals.md#registeredplugin)[]*

*Defined in [src/bud/plugin/types.ts:11](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/types.ts#L11)*

___

###  imageLoaderInterface

Ƭ **imageLoaderInterface**: *object*

*Defined in [src/build/rules/image.ts:14](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/image.ts#L14)*

#### Type declaration:

* **bud**: *object*

* **doHook**(): *function*

  * (`name`: string): *void*

* **make**(): *function*

  * (): *object*

* **options**: *[imageLoaderOptions](globals.md#imageloaderoptions)*

___

###  imageLoaderOptions

Ƭ **imageLoaderOptions**: *object*

*Defined in [src/build/rules/image.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/image.ts#L4)*

#### Type declaration:

* **test**: *RegExp*

* **use**: *[object]*

## Variables

### `Const` BLACKLIST_PROPS

• **BLACKLIST_PROPS**: *string[]* = [
  'percent',
  'left',
  'right',
  'columns',
  'character',
  'rightPad',
]

*Defined in [src/compiler/components/LoadingBar.js:6](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/LoadingBar.js#L6)*

___

###  Box

• **Box**: *FunctionComponent‹object & object›*

*Defined in [src/compiler/components/Nav.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Nav.js#L2)*

*Defined in [src/compiler/components/Loading.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Loading.js#L2)*

*Defined in [src/compiler/components/Watching.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Watching.js#L1)*

*Defined in [src/compiler/components/BuildInfo.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/BuildInfo.js#L3)*

*Defined in [src/compiler/components/App.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/App.js#L3)*

*Defined in [src/compiler/components/Assets.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Assets.js#L3)*

*Defined in [src/compiler/components/BrowserSync.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/BrowserSync.js#L3)*

*Defined in [src/compiler/components/Errors/Error.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Errors/Error.js#L4)*

*Defined in [src/compiler/components/Errors/index.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Errors/index.js#L3)*

*Defined in [src/compiler/components/Warnings/Warning.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Warnings/Warning.js#L4)*

*Defined in [src/compiler/components/Warnings/index.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Warnings/index.js#L3)*

*Defined in [src/compiler/components/Debug.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Debug.js#L3)*

___

###  LimitChunkCountPlugin

• **LimitChunkCountPlugin**: *LimitChunkCountPlugin*

*Defined in [src/bud/plugin/adapters/webpack/limitChunkCount.ts:2](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/limitChunkCount.ts#L2)*

___

###  ProgressPlugin

• **ProgressPlugin**: *ProgressPlugin*

*Defined in [src/compiler/hooks/useWebpack.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useWebpack.js#L2)*

___

### `Const` PropTypes

• **PropTypes**: *"/Users/kellymears/code/projects/cli/bud/bud/node_modules/@types/prop-types/index"* = require('prop-types')

*Defined in [src/compiler/components/Nav.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Nav.js#L3)*

*Defined in [src/compiler/components/LoadingBar.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/LoadingBar.js#L3)*

*Defined in [src/compiler/components/Loading.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Loading.js#L4)*

*Defined in [src/compiler/components/Watching.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Watching.js#L3)*

*Defined in [src/compiler/components/BuildInfo.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/BuildInfo.js#L4)*

*Defined in [src/compiler/components/App.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/App.js#L4)*

*Defined in [src/compiler/components/Assets.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Assets.js#L4)*

*Defined in [src/compiler/components/BrowserSync.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/BrowserSync.js#L4)*

*Defined in [src/compiler/components/Errors/Error.js:5](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Errors/Error.js#L5)*

*Defined in [src/compiler/components/Errors/index.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Errors/index.js#L4)*

*Defined in [src/compiler/components/Warnings/Warning.js:5](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Warnings/Warning.js#L5)*

*Defined in [src/compiler/components/Warnings/index.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Warnings/index.js#L4)*

*Defined in [src/compiler/Runner.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L4)*

*Defined in [src/compiler/components/Debug.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Debug.js#L4)*

___

### `Const` React

• **React**: *[React](globals.md#const-react)* = require('react')

*Defined in [src/compiler/hooks/useFocusState.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useFocusState.js#L1)*

*Defined in [src/compiler/components/Nav.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Nav.js#L1)*

*Defined in [src/compiler/components/LoadingBar.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/LoadingBar.js#L1)*

*Defined in [src/compiler/components/Loading.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Loading.js#L1)*

*Defined in [src/compiler/components/BuildInfo.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/BuildInfo.js#L2)*

*Defined in [src/compiler/components/App.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/App.js#L1)*

*Defined in [src/compiler/components/Assets.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Assets.js#L1)*

*Defined in [src/compiler/components/BrowserSync.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/BrowserSync.js#L1)*

*Defined in [src/compiler/components/Errors/Error.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Errors/Error.js#L2)*

*Defined in [src/compiler/components/Errors/index.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Errors/index.js#L1)*

*Defined in [src/compiler/components/Warnings/Warning.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Warnings/Warning.js#L2)*

*Defined in [src/compiler/components/Warnings/index.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Warnings/index.js#L1)*

*Defined in [src/compiler/Runner.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L1)*

*Defined in [src/compiler/components/Debug.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Debug.js#L1)*

Modules

___

###  Spacer

• **Spacer**: *FunctionComponent‹object›*

*Defined in [src/compiler/components/Nav.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Nav.js#L2)*

*Defined in [src/compiler/components/App.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/App.js#L3)*

*Defined in [src/compiler/components/Assets.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Assets.js#L3)*

___

### `Const` Spinner

• **Spinner**: *"/Users/kellymears/code/projects/cli/bud/bud/node_modules/ink-spinner/build/index"* = require('ink-spinner')

*Defined in [src/compiler/components/Watching.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Watching.js#L2)*

___

###  Text

• **Text**: *FunctionComponent‹Props›*

*Defined in [src/compiler/components/Nav.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Nav.js#L2)*

*Defined in [src/compiler/components/LoadingBar.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/LoadingBar.js#L2)*

*Defined in [src/compiler/components/Loading.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Loading.js#L2)*

*Defined in [src/compiler/components/Watching.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Watching.js#L1)*

*Defined in [src/compiler/components/BuildInfo.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/BuildInfo.js#L3)*

*Defined in [src/compiler/components/Assets.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Assets.js#L3)*

*Defined in [src/compiler/components/BrowserSync.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/BrowserSync.js#L3)*

*Defined in [src/compiler/components/Errors/Error.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Errors/Error.js#L4)*

*Defined in [src/compiler/components/Errors/index.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Errors/index.js#L3)*

*Defined in [src/compiler/components/Warnings/Warning.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Warnings/Warning.js#L4)*

*Defined in [src/compiler/components/Warnings/index.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Warnings/index.js#L3)*

*Defined in [src/compiler/components/Debug.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Debug.js#L3)*

___

### `Const` blacklist

• **blacklist**: *any* = require('blacklist')

*Defined in [src/compiler/components/LoadingBar.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/LoadingBar.js#L4)*

___

### `Const` browserSyncAdapter

• **browserSyncAdapter**: *[RegisteredPlugin](globals.md#registeredplugin)* = [
  'browser_sync_plugin',
  browserSync,
]

*Defined in [src/bud/plugin/adapters/webpack/index.ts:18](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/index.ts#L18)*

___

### `Const` cleanAdapter

• **cleanAdapter**: *[RegisteredPlugin](globals.md#registeredplugin)* = [
  'clean_webpack_plugin',
  cleanWebpack,
]

*Defined in [src/bud/plugin/adapters/webpack/index.ts:22](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/index.ts#L22)*

___

### `Const` copyAdapter

• **copyAdapter**: *[RegisteredPlugin](globals.md#registeredplugin)* = ['copy_plugin', copy]

*Defined in [src/bud/plugin/adapters/webpack/index.ts:26](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/index.ts#L26)*

___

### `Const` defineAdapter

• **defineAdapter**: *[RegisteredPlugin](globals.md#registeredplugin)* = [
  'define_plugin',
  define,
]

*Defined in [src/bud/plugin/adapters/webpack/index.ts:27](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/index.ts#L27)*

___

### `Const` dependencyExtractionAdapter

• **dependencyExtractionAdapter**: *[RegisteredPlugin](globals.md#registeredplugin)* = [
  'dependency_extraction_plugin',
  dependencyExtraction,
]

*Defined in [src/bud/plugin/adapters/webpack/index.ts:31](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/index.ts#L31)*

___

### `Const` envArgument

• **envArgument**: *any* = argv.env

*Defined in [src/bud/mode.ts:13](https://github.com/roots/bud-support/blob/bd00b72/src/bud/mode.ts#L13)*

specified via CLI arg

___

### `Const` envFallback

• **envFallback**: *string* = "production"

*Defined in [src/bud/mode.ts:8](https://github.com/roots/bud-support/blob/bd00b72/src/bud/mode.ts#L8)*

Fallback env

___

### `Const` envProject

• **envProject**: *string* = env?.APP_ENV || envFallback

*Defined in [src/bud/mode.ts:18](https://github.com/roots/bud-support/blob/bd00b72/src/bud/mode.ts#L18)*

specified via project .env

___

### `Const` envRaw

• **envRaw**: *DotenvParseOutput* = dotenv.config({
  path: join(paths.project, '.env'),
}).parsed

*Defined in [src/bud/state/env.ts:9](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/env.ts#L9)*

Environment variables container.

___

### `Const` fixStyleAdapter

• **fixStyleAdapter**: *[RegisteredPlugin](globals.md#registeredplugin)* = [
  'fix_style_only_entries_plugin',
  fixStyleOnlyEntries,
]

*Defined in [src/bud/plugin/adapters/webpack/index.ts:35](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/index.ts#L35)*

___

### `Const` frameworkDir

• **frameworkDir**: *[Directory](globals.md#directory)* = resolve(
  __dirname,
  './../../../',
)

*Defined in [src/bud/state/paths.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/paths.ts#L12)*

Bud framework dir.

___

### `Const` globalState

• **globalState**: *[useStore](globals.md#const-usestore)* = require('./useStore')

*Defined in [src/compiler/hooks/useFocusState.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useFocusState.js#L2)*

___

### `Const` highlight

• **highlight**: *"/Users/kellymears/code/projects/cli/bud/bud/node_modules/cli-highlight/dist/index"* = require('cli-highlight')

*Defined in [src/compiler/components/Debug.js:5](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Debug.js#L5)*

___

### `Const` hmrAdapter

• **hmrAdapter**: *[RegisteredPlugin](globals.md#registeredplugin)* = [
  'hot_module_replacement_plugin',
  hotModuleReplacement,
]

*Defined in [src/bud/plugin/adapters/webpack/index.ts:39](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/index.ts#L39)*

___

### `Const` inProduction

• **inProduction**: *[Production](globals.md#production)* = mode === 'production'

*Defined in [src/bud/mode.ts:39](https://github.com/roots/bud-support/blob/bd00b72/src/bud/mode.ts#L39)*

## bud.inProduction

True if bud.mode is strictly equal to "production"

___

### `Const` limitChunkAdapter

• **limitChunkAdapter**: *[RegisteredPlugin](globals.md#registeredplugin)* = [
  'limit_chunk_count',
  limitChunkCount,
]

*Defined in [src/bud/plugin/adapters/webpack/index.ts:59](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/index.ts#L59)*

___

### `Const` manifestAdapter

• **manifestAdapter**: *[RegisteredPlugin](globals.md#registeredplugin)* = [
  'manifest_plugin',
  manifest,
]

*Defined in [src/bud/plugin/adapters/webpack/index.ts:43](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/index.ts#L43)*

___

### `Const` miniCssAdapter

• **miniCssAdapter**: *[RegisteredPlugin](globals.md#registeredplugin)* = [
  'mini_css_extract_plugin',
  miniCssExtract,
]

*Defined in [src/bud/plugin/adapters/webpack/index.ts:47](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/index.ts#L47)*

___

### `Const` mode

• **mode**: *[Mode](globals.md#mode)* = envArgument ? envArgument : envProject

*Defined in [src/bud/mode.ts:32](https://github.com/roots/bud-support/blob/bd00b72/src/bud/mode.ts#L32)*

## bud.mode

Webpack mode ('development'|'production')

Determined by the first match, in order of precedence:

 - CLI args
 - env file

Fallback is 'production'.

___

### `Const` notifier

• **notifier**: *any* = require('node-notifier')

*Defined in [src/compiler/components/Errors/Error.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Errors/Error.js#L1)*

*Defined in [src/compiler/components/Warnings/Warning.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Warnings/Warning.js#L1)*

*Defined in [src/compiler/Runner.js:5](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L5)*

___

### `Const` patchConsole

• **patchConsole**: *function* = require('patch-console')

*Defined in [src/compiler/components/BrowserSync.js:5](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/BrowserSync.js#L5)*

#### Type declaration:

▸ (`callback`: Callback): *Restore*

**Parameters:**

Name | Type |
------ | ------ |
`callback` | Callback |

___

### `Const` projectDir

• **projectDir**: *[Directory](globals.md#directory)* = process.cwd()

*Defined in [src/bud/state/paths.ts:7](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/paths.ts#L7)*

Current working dir.

___

### `Const` provideAdapter

• **provideAdapter**: *[RegisteredPlugin](globals.md#registeredplugin)* = [
  'provide_plugin',
  provide,
]

*Defined in [src/bud/plugin/adapters/webpack/index.ts:51](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/index.ts#L51)*

___

###  useApp

• **useApp**: *function*

*Defined in [src/compiler/Runner.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L3)*

#### Type declaration:

▸ (): *Props*

___

###  useEffect

• **useEffect**: *useEffect*

*Defined in [src/compiler/hooks/useWebpack.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useWebpack.js#L1)*

*Defined in [src/compiler/components/App.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/App.js#L2)*

*Defined in [src/compiler/components/Assets.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Assets.js#L2)*

*Defined in [src/compiler/components/BrowserSync.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/BrowserSync.js#L2)*

*Defined in [src/compiler/components/Errors/Error.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Errors/Error.js#L3)*

*Defined in [src/compiler/components/Errors/index.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Errors/index.js#L2)*

*Defined in [src/compiler/components/Warnings/Warning.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Warnings/Warning.js#L3)*

*Defined in [src/compiler/components/Warnings/index.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Warnings/index.js#L2)*

*Defined in [src/compiler/Runner.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L2)*

*Defined in [src/compiler/components/Debug.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Debug.js#L2)*

___

###  useFocus

• **useFocus**: *function*

*Defined in [src/compiler/components/Assets.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Assets.js#L3)*

*Defined in [src/compiler/components/BrowserSync.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/BrowserSync.js#L3)*

*Defined in [src/compiler/components/Errors/index.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Errors/index.js#L3)*

*Defined in [src/compiler/components/Warnings/index.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Warnings/index.js#L3)*

*Defined in [src/compiler/components/Debug.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Debug.js#L3)*

#### Type declaration:

▸ (`__namedParameters?`: object): *Output*

**Parameters:**

▪`Optional`  **__namedParameters**: *object*

Name | Type |
------ | ------ |
`autoFocus` | boolean |
`isActive` | boolean |

___

### `Const` useFocusState

• **useFocusState**: *any* = globalState(
  React,
  {
    assets: true,
    debug: false,
    errors: false,
    warnings: false,
  },
  {
    setFocus: (store, value) => {
      store.setState({
        ...store.state,
        ...value,
      })
    },
  },
)

*Defined in [src/compiler/hooks/useFocusState.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useFocusState.js#L4)*

*Defined in [src/compiler/Runner.js:8](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L8)*

___

###  useInput

• **useInput**: *function*

*Defined in [src/compiler/Runner.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L3)*

#### Type declaration:

▸ (`inputHandler`: Handler, `options?`: Options): *void*

**Parameters:**

Name | Type |
------ | ------ |
`inputHandler` | Handler |
`options?` | Options |

___

###  useState

• **useState**: *useState*

*Defined in [src/compiler/hooks/useWebpack.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useWebpack.js#L1)*

*Defined in [src/compiler/components/App.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/App.js#L2)*

*Defined in [src/compiler/components/BrowserSync.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/BrowserSync.js#L2)*

*Defined in [src/compiler/components/Errors/index.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Errors/index.js#L2)*

*Defined in [src/compiler/components/Warnings/index.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Warnings/index.js#L2)*

___

### `Const` useStdOutDimensions

• **useStdOutDimensions**: *useStdoutDimensions* = require('ink-use-stdout-dimensions')

*Defined in [src/compiler/Runner.js:6](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L6)*

___

### `Const` webpackAdapters

• **webpackAdapters**: *[WebpackAdapters](globals.md#webpackadapters)* = [
  browserSyncAdapter,
  cleanAdapter,
  copyAdapter,
  defineAdapter,
  dependencyExtractionAdapter,
  fixStyleAdapter,
  hmrAdapter,
  manifestAdapter,
  miniCssAdapter,
  provideAdapter,
  writeFileAdapter,
  limitChunkAdapter,
]

*Defined in [src/bud/plugin/adapters/webpack/index.ts:64](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/index.ts#L64)*

___

### `Const` writeFileAdapter

• **writeFileAdapter**: *[RegisteredPlugin](globals.md#registeredplugin)* = [
  'write_file_plugin',
  writeFile,
]

*Defined in [src/bud/plugin/adapters/webpack/index.ts:55](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/index.ts#L55)*

## Functions

### `Const` App

▸ **App**(`__namedParameters`: object): *any*

*Defined in [src/compiler/components/App.js:20](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/App.js#L20)*

App

**`prop`** {React.Component[]} children

**`prop`** {object} state

**`prop`** {object} build

**`prop`** {object} options

**`prop`** {number} width

**`prop`** {number} height

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`build` | any |
`children` | any |
`config` | any |
`height` | any |
`state` | any |
`width` | any |

**Returns:** *any*

___

### `Const` Asset

▸ **Asset**(`__namedParameters`: object): *string | function | object*

*Defined in [src/compiler/components/Assets.js:26](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Assets.js#L26)*

Asset

**`prop`** {object} asset

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`asset` | any |

**Returns:** *string | function | object*

___

### `Const` Assets

▸ **Assets**(`__namedParameters`: object): *string | function | object*

*Defined in [src/compiler/components/Assets.js:61](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Assets.js#L61)*

Assets

**`prop`** {object} build

**`prop`** {object} actions

**`prop`** {number} width

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | any |
`build` | any |

**Returns:** *string | function | object*

___

### `Const` BrowserSync

▸ **BrowserSync**(`__namedParameters`: object): *string | function | object*

*Defined in [src/compiler/components/BrowserSync.js:13](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/BrowserSync.js#L13)*

BrowserSync info

**`prop`** {object} actions

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | any |

**Returns:** *string | function | object*

___

### `Const` BuildInfo

▸ **BuildInfo**(`__namedParameters`: object): *Element‹›*

*Defined in [src/compiler/components/BuildInfo.js:13](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/BuildInfo.js#L13)*

Build Info

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`build` | any |
`config` | any |
`width` | any |

**Returns:** *Element‹›*

___

### `Const` Bullet

▸ **Bullet**(`__namedParameters`: object): *Element‹›*

*Defined in [src/compiler/components/Nav.js:9](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Nav.js#L9)*

List item indicator

**`prop`** {boolean} active

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`active` | any |

**Returns:** *Element‹›*

___

### `Const` Debug

▸ **Debug**(`__namedParameters`: object): *Element‹›*

*Defined in [src/compiler/components/Debug.js:10](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Debug.js#L10)*

Debug display

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | any |
`config` | any |

**Returns:** *Element‹›*

___

### `Const` Error

▸ **Error**(`__namedParameters`: object): *string | function | object*

*Defined in [src/compiler/components/Errors/Error.js:13](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Errors/Error.js#L13)*

Error

**`prop`** {string} message

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`message` | any |

**Returns:** *string | function | object*

___

### `Const` Errors

▸ **Errors**(`__namedParameters`: object): *Element‹›*

*Defined in [src/compiler/components/Errors/index.js:11](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Errors/index.js#L11)*

Error

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | any |
`build` | any |

**Returns:** *Element‹›*

___

### `Const` Indicator

▸ **Indicator**(`__namedParameters`: object): *string | function | object*

*Defined in [src/compiler/components/Assets.js:12](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Assets.js#L12)*

Indicator

**`prop`** {boolean} emitted

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`emitted` | any |

**Returns:** *string | function | object*

___

### `Const` Loading

▸ **Loading**(`__namedParameters`: object): *any[] | Element‹›*

*Defined in [src/compiler/components/Loading.js:9](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Loading.js#L9)*

Loading (Progress Plugin)

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`build` | any |
`width` | any |

**Returns:** *any[] | Element‹›*

___

### `Const` Nav

▸ **Nav**(`__namedParameters`: object): *Element‹›*

*Defined in [src/compiler/components/Nav.js:24](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Nav.js#L24)*

Nav

**`prop`** {object} build

**`prop`** {boolean} focused

**`prop`** {object} config

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`build` | any |
`config` | any |
`focused` | any |

**Returns:** *Element‹›*

___

### `Const` Runner

▸ **Runner**(`__namedParameters`: object): *Element‹›*

*Defined in [src/compiler/Runner.js:32](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L32)*

Budpack build status display

**`prop`** {object} compiler webpack compiler

**`prop`** {object} config   webpack compiler config

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`compiler` | any |
`config` | any |

**Returns:** *Element‹›*

___

### `Const` Warning

▸ **Warning**(`__namedParameters`: object): *string | function | object*

*Defined in [src/compiler/components/Warnings/Warning.js:13](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Warnings/Warning.js#L13)*

Warning (single)

**`prop`** {string} message

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`message` | any |

**Returns:** *string | function | object*

___

### `Const` Warnings

▸ **Warnings**(`__namedParameters`: object): *string | function | object*

*Defined in [src/compiler/components/Warnings/index.js:14](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Warnings/index.js#L14)*

Warnings

**`prop`** {object} build

**`prop`** {object} actions

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | any |
`build` | any |

**Returns:** *string | function | object*

___

### `Const` Watching

▸ **Watching**(`__namedParameters`: object): *ReactElementLike*

*Defined in [src/compiler/components/Watching.js:11](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/Watching.js#L11)*

Watch mode indicator

**`prop`** {object} options

**`prop`** {object} build

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`build` | any |
`options` | any |

**Returns:** *ReactElementLike*

___

### `Const` alias

▸ **alias**(`this`: [Bud](globals.md#bud), `options`: object): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/alias.ts:21](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/alias.ts#L21)*

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

###  associateActions

▸ **associateActions**(`store`: any, `actions`: any): *associatedActions*

*Defined in [src/compiler/hooks/useStore.js:49](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useStore.js#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`store` | any |
`actions` | any |

**Returns:** *associatedActions*

___

### `Const` auto

▸ **auto**(`this`: [Bud](globals.md#bud), `options`: object): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/auto.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/auto.ts#L12)*

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

▸ **babel**(`bud`: [Bud](globals.md#bud)): *any*

*Defined in [src/build/rules/js/babel.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/js/babel.ts#L10)*

Babel
## bud.babel

Configure Babel.

If you prefer, you may utilize a babel.config.js file in the project root,
either alongside or in lieue of this configuration.

Conflicts between supplied configs will be resolved in favor of bud.config.js.

**`see`** https://babeljs.io/docs/en/configuration

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](globals.md#bud) |

**Returns:** *any*

▸ **babel**(`this`: [Bud](globals.md#bud), `options`: [BabelProperties](interfaces/babelproperties.md)): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/babel.ts:15](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/babel.ts#L15)*

Babel
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

### `Const` build

▸ **build**(`bud`: [Bud](globals.md#bud)): *[BuilderController](globals.md#buildercontroller)*

*Defined in [src/build/index.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/build/index.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](globals.md#bud) |

**Returns:** *[BuilderController](globals.md#buildercontroller)*

___

### `Const` bundle

▸ **bundle**(`this`: [Bud](globals.md#bud), `name`: string, `entries`: object): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/bundle.ts:15](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/bundle.ts#L15)*

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

### `Const` cleanWebpack

▸ **cleanWebpack**(): *object*

*Defined in [src/bud/plugin/adapters/webpack/cleanWebpack.ts:7](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/cleanWebpack.ts#L7)*

**Returns:** *object*

* **make**(): *CleanWebpackPlugin*

___

### `Const` compileSafeMode

▸ **compileSafeMode**(`config`: any, `webpackConfig`: WebpackConfig): *void*

*Defined in [src/compiler/renderSafeMode.ts:38](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/renderSafeMode.ts#L38)*

Safe mode

**Parameters:**

Name | Type |
------ | ------ |
`config` | any |
`webpackConfig` | WebpackConfig |

**Returns:** *void*

___

### `Const` compiler

▸ **compiler**(`bud`: [Bud](globals.md#bud)): *void*

*Defined in [src/compiler/compiler.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/compiler.ts#L10)*

Compiler

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](globals.md#bud) |

**Returns:** *void*

___

### `Const` config

▸ **config**(`file`: any): *string*

*Defined in [src/bud/state/configs.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/configs.ts#L12)*

Config

**Parameters:**

Name | Type |
------ | ------ |
`file` | any |

**Returns:** *string*

filePath

___

### `Const` controller

▸ **controller**(`bud`: [Bud](globals.md#bud)): *[Controller](globals.md#controller)*

*Defined in [src/bud/plugin/controller.ts:7](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/controller.ts#L7)*

Plugin controller

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](globals.md#bud) |

**Returns:** *[Controller](globals.md#controller)*

___

### `Const` copyAll

▸ **copyAll**(`this`: [Bud](globals.md#bud), `from`: string, `to`: any): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/copyAll.ts:13](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/copyAll.ts#L13)*

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

### `Const` css

▸ **css**(`bud`: any): *object*

*Defined in [src/build/rules/css/css.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/css/css.ts#L10)*

Css

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **sourceMap**: *any* = bud.state.features.map

* **test**: *RegExp‹›* = patterns.css

* **make**(): *any*

___

### `Const` dashboard

▸ **dashboard**(`this`: [Bud](globals.md#bud), `enabled`: boolean): *object*

*Defined in [src/bud/api/dashboard.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/dashboard.ts#L12)*

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

* **inProduction**: *[Production](globals.md#production)*

* **mode**: *[Mode](globals.md#mode)*

* **plugin**: *[Plugin](globals.md#plugin)*

* **src**: *[Src](globals.md#src)*

* **srcPath**: *[SrcPath](globals.md#srcpath)*

* **state**: *[State](globals.md#state)*

* **sync**: *[Sync](globals.md#sync)*

* **util**: *[Util](globals.md#util)*

* **vendor**: *[Vendor](globals.md#vendor)*

* **watch**: *[Watch](globals.md#watch)*

___

### `Const` debug

▸ **debug**(`this`: [Bud](globals.md#bud), `enabled`: boolean): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/debug.ts:16](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/debug.ts#L16)*

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

### `Const` define

▸ **define**(): *object*

*Defined in [src/bud/plugin/adapters/webpack/define.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/define.ts#L4)*

**Returns:** *object*

* **make**(): *DefinePlugin‹›*

* **mergeOptions**(): *any*

* **when**(): *any*

___

### `Const` dependencyExtraction

▸ **dependencyExtraction**(): *object*

*Defined in [src/bud/plugin/adapters/webpack/dependencyExtraction.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/dependencyExtraction.ts#L4)*

**Returns:** *object*

* **make**(): *DependencyExtractionWebpackPlugin‹›*

* **setOptions**(): *any*

* **when**(): *any*

___

### `Const` devServer

▸ **devServer**(`bud`: [Bud](globals.md#bud)): *object*

*Defined in [src/build/devServer.ts:6](https://github.com/roots/bud-support/blob/bd00b72/src/build/devServer.ts#L6)*

Dev server

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](globals.md#bud) |

**Returns:** *object*

* **bud**(): *object*

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

  * **inProduction**: *[Production](globals.md#production)*

  * **mode**: *[Mode](globals.md#mode)*

  * **plugin**: *[Plugin](globals.md#plugin)*

  * **src**: *[Src](globals.md#src)*

  * **srcPath**: *[SrcPath](globals.md#srcpath)*

  * **state**: *[State](globals.md#state)*

  * **sync**: *[Sync](globals.md#sync)*

  * **util**: *[Util](globals.md#util)*

  * **vendor**: *[Vendor](globals.md#vendor)*

  * **watch**: *[Watch](globals.md#watch)*

* **make**(): *any*

* ### **options**: *object*

  * **devServer**: *any* = bud.state.options.dev

___

### `Const` devtool

▸ **devtool**(`devtool`: string): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/devtool.ts:6](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/devtool.ts#L6)*

Specify webpack devtool

**Parameters:**

Name | Type |
------ | ------ |
`devtool` | string |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` displayStats

▸ **displayStats**(`stats`: WebpackStats): *void*

*Defined in [src/compiler/renderSafeMode.ts:17](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/renderSafeMode.ts#L17)*

Display stats.

Normal-ish webpack stdout.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`stats` | WebpackStats | webpack stats object |

**Returns:** *void*

___

### `Const` dist

▸ **dist**(`relativePath`: string): *string*

*Defined in [src/bud/api/dist.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/dist.ts#L12)*

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

*Defined in [src/bud/api/distPath.ts:11](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/distPath.ts#L11)*

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

*Defined in [src/bud/api/dump.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/dump.ts#L10)*

Dump generated webpack config for debugging
Dump a prettified, syntax-highlighted object

```js
bud.dump(true)
```

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |

**Returns:** *[Bud](globals.md#bud)*

▸ **dump**(`obj`: Object): *never*

*Defined in [src/bud/util/dump.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/dump.ts#L12)*

Dump generated webpack config for debugging
Dump a prettified, syntax-highlighted object

```js
bud.dump(true)
```

**Parameters:**

Name | Type |
------ | ------ |
`obj` | Object |

**Returns:** *never*

___

### `Const` entry

▸ **entry**(`bud`: [Bud](globals.md#bud)): *[EntryBuilder](interfaces/entrybuilder.md)*

*Defined in [src/build/entry.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/build/entry.ts#L10)*

Entrypoints

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](globals.md#bud) |

**Returns:** *[EntryBuilder](interfaces/entrybuilder.md)*

___

### `Const` eslint

▸ **eslint**(`bud`: [Bud](globals.md#bud)): *any*

*Defined in [src/build/rules/js/eslint.ts:5](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/js/eslint.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](globals.md#bud) |

**Returns:** *any*

___

### `Const` except

▸ **except**(`target`: object, `properties`: []): *object*

*Defined in [src/bud/util/except.ts:5](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/except.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`target` | object |
`properties` | [] |

**Returns:** *object*

___

### `Const` externals

▸ **externals**(`bud`: [Bud](globals.md#bud)): *object*

*Defined in [src/build/externals.ts:3](https://github.com/roots/bud-support/blob/bd00b72/src/build/externals.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](globals.md#bud) |

**Returns:** *object*

* **bud**(): *object*

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

  * **inProduction**: *[Production](globals.md#production)*

  * **mode**: *[Mode](globals.md#mode)*

  * **plugin**: *[Plugin](globals.md#plugin)*

  * **src**: *[Src](globals.md#src)*

  * **srcPath**: *[SrcPath](globals.md#srcpath)*

  * **state**: *[State](globals.md#state)*

  * **sync**: *[Sync](globals.md#sync)*

  * **util**: *[Util](globals.md#util)*

  * **vendor**: *[Vendor](globals.md#vendor)*

  * **watch**: *[Watch](globals.md#watch)*

* **make**(): *any*

* ### **options**: *object*

  * **externals**: *string | RegExp‹› | ExternalsObjectElement | function | string | RegExp‹› | ExternalsObjectElement | function[]* = bud.state.options.externals

___

### `Const` fixStyleOnlyEntries

▸ **fixStyleOnlyEntries**(): *object*

*Defined in [src/bud/plugin/adapters/webpack/fixStyleOnlyEntries.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/fixStyleOnlyEntries.ts#L4)*

**Returns:** *object*

* **make**(): *any*

* ### **options**: *object*

  * **silent**: *boolean* = true

___

### `Const` font

▸ **font**(`builder`: any): *object*

*Defined in [src/build/rules/font.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/font.ts#L10)*

Font module rules

**Parameters:**

Name | Type |
------ | ------ |
`builder` | any |

**Returns:** *object*

* **builder**: *any*

* **make**(): *object*

  * **test**: *RegExp‹›* = patterns.font

  * **use**: *object[]* = [
        {
          loader: loaders.url,
          options: {
            name: '[path][name].[ext]',
          },
        },
      ]

___

### `Const` general

▸ **general**(`bud`: [Bud](globals.md#bud)): *object*

*Defined in [src/build/general.ts:8](https://github.com/roots/bud-support/blob/bd00b72/src/build/general.ts#L8)*

General webpack options

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](globals.md#bud) |

**Returns:** *object*

* **bud**(): *object*

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

  * **inProduction**: *[Production](globals.md#production)*

  * **mode**: *[Mode](globals.md#mode)*

  * **plugin**: *[Plugin](globals.md#plugin)*

  * **src**: *[Src](globals.md#src)*

  * **srcPath**: *[SrcPath](globals.md#srcpath)*

  * **state**: *[State](globals.md#state)*

  * **sync**: *[Sync](globals.md#sync)*

  * **util**: *[Util](globals.md#util)*

  * **vendor**: *[Vendor](globals.md#vendor)*

  * **watch**: *[Watch](globals.md#watch)*

* **make**(): *any*

* ### **options**: *object*

  * **context**: *string* = bud.state.paths.project

  * **devtool**: *any* = bud.state.features.sourceMap
      ? bud.state.options.devtool
      : false

  * **mode**: *"development" | "production" | "none"* = bud.mode

  * **target**: *"web" | "webworker" | "node" | "async-node" | "node-webkit" | "atom" | "electron" | "electron-renderer" | "electron-preload" | "electron-main" | function* = bud.state.options.target

  * **watch**: *boolean* = bud.state.features.watch

  * **node**: *object*

    * **child_process**: *string* = "empty"

    * **dgram**: *string* = "empty"

    * **dns**: *string* = "mock"

    * **fs**: *string* = "empty"

    * **http2**: *string* = "empty"

    * **module**: *string* = "empty"

    * **net**: *string* = "empty"

    * **tls**: *string* = "empty"

___

### `Const` getProjectConfig

▸ **getProjectConfig**(): *string*

Defined in src/bin.ts:7

**Returns:** *string*

___

### `Const` hasConfig

▸ **hasConfig**(`file`: any): *any*

*Defined in [src/bud/state/configs.ts:20](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/configs.ts#L20)*

Has config

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`file` | any | file path (relative to project root) |

**Returns:** *any*

true if file exists

___

### `Const` hash

▸ **hash**(`enabled`: boolean): *any*

*Defined in [src/bud/api/hash.ts:7](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/hash.ts#L7)*

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

*Defined in [src/bud/api/hot.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/hot.ts#L12)*

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

### `Const` hotModuleReplacement

▸ **hotModuleReplacement**(): *object*

*Defined in [src/bud/plugin/adapters/webpack/hotModuleReplacement.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/hotModuleReplacement.ts#L4)*

**Returns:** *object*

* **make**(): *HotModuleReplacementPlugin‹›*

* **setOptions**(): *any*

* **when**(): *any*

___

### `Const` image

▸ **image**(`bud`: object): *[imageLoaderInterface](globals.md#imageloaderinterface)*

*Defined in [src/build/rules/image.ts:32](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/image.ts#L32)*

Image module rules

**`property`** {imageLoaderOptions} options

**Parameters:**

Name | Type |
------ | ------ |
`bud` | object |

**Returns:** *[imageLoaderInterface](globals.md#imageloaderinterface)*

___

### `Const` implementation

▸ **implementation**(): *any*

*Defined in [src/build/rules/scss/implementation.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/scss/implementation.ts#L4)*

resolve whether to use dart-sass or node-sass

**Returns:** *any*

___

### `Const` inlineManifest

▸ **inlineManifest**(`name`: string): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/inlineManifest.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/inlineManifest.ts#L10)*

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

### `Const` limitChunkCount

▸ **limitChunkCount**(): *object*

*Defined in [src/bud/plugin/adapters/webpack/limitChunkCount.ts:5](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/limitChunkCount.ts#L5)*

**Returns:** *object*

* **make**(): *LimitChunkCountPlugin‹›*

* **setOptions**(): *object*

  * **maxChunks**: *any* = chunks

* **when**(): *any*

___

### `Const` manifest

▸ **manifest**(): *object*

*Defined in [src/bud/plugin/adapters/webpack/manifest.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/manifest.ts#L4)*

**Returns:** *object*

* **make**(): *any*

* **setOptions**(): *object*

  * **filename**: *string* = "manifest.json"

  * **publicPath**: *any* = this.bud.state.paths.public

  * **writeToFileEmit**: *boolean* = true

___

### `Const` map

▸ **map**(`enabled`: boolean): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/map.ts:14](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/map.ts#L14)*

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

### `Const` maybeConfig

▸ **maybeConfig**(`file`: any, `fallback`: any): *any*

*Defined in [src/bud/state/configs.ts:28](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/configs.ts#L28)*

Maybe config

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`file` | any | - | file path (relative to project root) |
`fallback` | any | null | - |

**Returns:** *any*

___

### `Const` mini

▸ **mini**(`enable`: boolean): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/mini.ts:16](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/mini.ts#L16)*

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

### `Const` miniCssExtract

▸ **miniCssExtract**(): *object*

*Defined in [src/bud/plugin/adapters/webpack/miniCssExtract.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/miniCssExtract.ts#L4)*

**Returns:** *object*

* **make**(): *MiniCssExtractPlugin‹›*

* **setOptions**(): *object*

  * **filename**: *string* = this.bud.state.features.hash
        ? `[name].[hash:8].css`
        : '[name].css'

___

### `Const` module

▸ **module**(`bud`: any): *object*

*Defined in [src/build/rules/css/module.ts:11](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/css/module.ts#L11)*

CSS modules
SCSS modules

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **miniCss**: *string* = loaders.miniCss

* **output**(): *object*

* **postCss**: *any* = postCss(bud).make()

* **resolveUrl**: *any* = resolveUrl(bud).make()

* **test**: *RegExp‹›* = patterns.cssModule

* **make**(): *any*

* **post**(): *void*

* **pre**(): *void*

* ### **css**: *object*

  * **loader**: *string* = loaders.css

  * **options**: *object*

    * **modules**: *boolean* = true

    * **onlyLocals**: *boolean* = false

▸ **module**(`bud`: any): *object*

*Defined in [src/build/rules/scss/module.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/scss/module.ts#L12)*

CSS modules
SCSS modules

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **miniCss**: *string* = loaders.miniCss

* **output**(): *object*

* **postCss**: *any* = postCss(bud).make()

* **resolveUrl**: *any* = resolveUrl(bud).make()

* **test**: *RegExp‹›* = patterns.scssModule

* **make**(): *any*

* **post**(): *void*

* **pre**(): *void*

* ### **css**: *object*

  * **loader**: *string* = loaders.css

  * **options**: *object*

    * **modules**: *boolean* = true

    * **onlyLocals**: *boolean* = false

* ### **scss**: *object*

  * **loader**: *string* = loaders.scss

  * **options**: *object*

    * **implementation**: *any* = implementation()

    * **sourceMap**: *boolean* = true

___

### `Const` optimization

▸ **optimization**(`bud`: [Bud](globals.md#bud)): *object*

*Defined in [src/build/optimization.ts:8](https://github.com/roots/bud-support/blob/bd00b72/src/build/optimization.ts#L8)*

Webpack optimization

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](globals.md#bud) |

**Returns:** *object*

* **bud**(): *object*

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

  * **inProduction**: *[Production](globals.md#production)*

  * **mode**: *[Mode](globals.md#mode)*

  * **plugin**: *[Plugin](globals.md#plugin)*

  * **src**: *[Src](globals.md#src)*

  * **srcPath**: *[SrcPath](globals.md#srcpath)*

  * **state**: *[State](globals.md#state)*

  * **sync**: *[Sync](globals.md#sync)*

  * **util**: *[Util](globals.md#util)*

  * **vendor**: *[Vendor](globals.md#vendor)*

  * **watch**: *[Watch](globals.md#watch)*

* **uglifyOptions**: *Object* = bud.state.options.uglify

* **doHook**(`name`: any, ...`params`: any): *void*

* **make**(): *void*

* **setMinimizer**(): *void*

* **setRuntimeChunk**(): *void*

* **setSplitChunks**(): *void*

* **uglify**(): *UglifyJsPlugin‹›*

* **whenSupported**(`feature`: any, `callback`: any): *void*

* ### **options**: *object*

  * **optimization**: *object*

    * **minimize**: *boolean* = bud.state.features.minified

    * **moduleIds**: *string* = "hashed"

    * **removeAvailableModules**: *boolean* = false

    * **removeEmptyChunks**: *boolean* = false

* ### **runtimeChunkOptions**: *object*

  * **name**(`entrypoint`: any): *string*

* ### **splitChunksOptions**: *object*

  * **cacheGroups**: *object*

    * **vendor**: *object*

      * **chunks**: *string* = "all"

      * **name**: *String* = bud.state.options.vendor.name

      * **priority**: *number* = -20

      * **test**: *RegExp‹›* = /[\\/]node_modules[\\/]/

* ### **supports**: *object*

  * **minification**: *boolean* = bud.state.features.minified

  * **runtimeChunk**: *boolean* = bud.state.features.inlineManifest

  * **vendor**: *boolean* = bud.state.features.vendor

___

### `Const` output

▸ **output**(`bud`: any): *object*

*Defined in [src/build/output.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/build/output.ts#L4)*

Webpack output.

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **make**(): *any*

* ### **options**: *object*

  * **output**: *object*

    * **filename**: *string* = bud.state.features.hash
        ? '[name].[hash:8].js'
        : '[name].js'

    * **path**: *any* = bud.state.paths.dist

    * **publicPath**: *any* = bud.state.paths.public

___

### `Const` plugins

▸ **plugins**(`bud`: [Bud](globals.md#bud)): *object*

*Defined in [src/build/plugins.ts:6](https://github.com/roots/bud-support/blob/bd00b72/src/build/plugins.ts#L6)*

Webpack plugins.

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](globals.md#bud) |

**Returns:** *object*

* **bud**(): *object*

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

  * **inProduction**: *[Production](globals.md#production)*

  * **mode**: *[Mode](globals.md#mode)*

  * **plugin**: *[Plugin](globals.md#plugin)*

  * **src**: *[Src](globals.md#src)*

  * **srcPath**: *[SrcPath](globals.md#srcpath)*

  * **state**: *[State](globals.md#state)*

  * **sync**: *[Sync](globals.md#sync)*

  * **util**: *[Util](globals.md#util)*

  * **vendor**: *[Vendor](globals.md#vendor)*

  * **watch**: *[Watch](globals.md#watch)*

* **pluginQueue**: *[string, function][]* = bud.plugin.webpackAdapters

* **doHook**(`name`: any, ...`params`: any[]): *void*

* **make**(): *object*

  * **plugins**: *any* = this.plugins

___

### `Const` postCss

▸ **postCss**(`bud`: any): *object*

*Defined in [src/build/rules/use/postCss.ts:8](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/use/postCss.ts#L8)*

PostCSS
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

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **output**(): *object*

* **make**(): *any*

* ### **config**: *object*

  * **loader**: *string* = loaders.postCss

  * **options**: *object*

    * **ident**: *string* = "postcss"

    * **parser**: *string* = "postcss-scss"

▸ **postCss**(`__namedParameters`: object): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/postcss.ts:21](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/postcss.ts#L21)*

PostCSS
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

*Defined in [src/bud/api/preset.ts:23](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/preset.ts#L23)*

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

*Defined in [src/bud/api/project.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/project.ts#L12)*

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

*Defined in [src/bud/api/projectPath.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/projectPath.ts#L12)*

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

### `Const` provide

▸ **provide**(): *object*

*Defined in [src/bud/plugin/adapters/webpack/provide.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/provide.ts#L4)*

**Returns:** *object*

* **make**(): *ProvidePlugin‹›*

* **setOptions**(): *any*

* **when**(): *any*

___

### `Const` publicPath

▸ **publicPath**(`dir`: string): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/publicPath.ts:14](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/publicPath.ts#L14)*

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

*Defined in [src/bud/api/purge.ts:20](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/purge.ts#L20)*

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

*Defined in [src/bud/api/register.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/register.ts#L12)*

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

### `Const` renderCompilerDashboard

▸ **renderCompilerDashboard**(`bud`: [Bud](globals.md#bud), `webpackConfig`: WebpackConfig): *void*

*Defined in [src/compiler/renderCompilerDashboard.ts:15](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/renderCompilerDashboard.ts#L15)*

Webpack compilation dashboard renderer.

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](globals.md#bud) |
`webpackConfig` | WebpackConfig |

**Returns:** *void*

___

### `Const` resolve

▸ **resolve**(`moduleName`: string): *string*

*Defined in [src/bud/api/resolve.ts:13](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/resolve.ts#L13)*

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

### `Const` resolveUrl

▸ **resolveUrl**(`bud`: any): *object*

*Defined in [src/build/rules/use/resolveUrl.ts:3](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/use/resolveUrl.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **loader**: *string* = loaders.resolveUrl

* **make**(): *any*

* ### **options**: *object*

  * **debug**: *boolean* = true

  * **engine**: *string* = "postcss"

  * **sourceMap**: *any* = bud.state.features.map

___

### `Const` rules

▸ **rules**(`bud`: any): *object*

*Defined in [src/build/rules/index.ts:18](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/index.ts#L18)*

Webpack loaders

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **output**(): *object*

* **make**(): *any*

* ### **options**: *object*

  * **module**: *object*

    * **strictExportPresence**: *boolean* = true

___

### `Const` run

▸ **run**(): *void*

Defined in src/bin.ts:34

🚀

**Returns:** *void*

___

### `Const` scss

▸ **scss**(`bud`: any): *object*

*Defined in [src/build/rules/scss/scss.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/scss/scss.ts#L10)*

scss

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **css**: *string* = loaders.css

* **miniCss**: *string* = loaders.miniCss

* **output**(): *object*

* **postCss**: *any* = postCss(bud).make()

* **resolveUrl**: *any* = resolveUrl(bud).make()

* **test**: *RegExp‹›* = patterns.scss

* **make**(): *any*

* **post**(): *void*

* **pre**(): *void*

* ### **scss**: *object*

  * **loader**: *string* = loaders.scss

  * **options**: *object*

    * **implementation**: *any* = implementation()

    * **sourceMap**: *boolean* = true

___

### `Const` setEnv

▸ **setEnv**(`options`: any): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/setEnv.ts:15](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/setEnv.ts#L15)*

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

### `Const` setProcess

▸ **setProcess**(`bud`: [Bud](globals.md#bud)): *void*

Defined in src/bin.ts:14

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](globals.md#bud) |

**Returns:** *void*

___

###  setState

▸ **setState**(`store`: any, `newState`: any, `afterUpdateCallback`: any): *void*

*Defined in [src/compiler/hooks/useStore.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useStore.js#L4)*

Forked from [https://github.com/andregardi/use-global-hook](https://github.com/andregardi/use-global-hook)

**Parameters:**

Name | Type |
------ | ------ |
`store` | any |
`newState` | any |
`afterUpdateCallback` | any |

**Returns:** *void*

___

### `Const` shortCircuit

▸ **shortCircuit**(): *any*

*Defined in [src/bud/util/shortCircuit.ts:8](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/shortCircuit.ts#L8)*

JSON.stringify replacement function

Prevents circular references in JSON from looping

**Returns:** *any*

___

### `Const` src

▸ **src**(`relativePath`: string): *string*

*Defined in [src/bud/api/src.ts:13](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/src.ts#L13)*

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

*Defined in [src/bud/api/srcPath.ts:13](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/srcPath.ts#L13)*

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

### `Const` successfulBuild

▸ **successfulBuild**(`build`: any): *boolean*

*Defined in [src/compiler/Runner.js:21](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L21)*

Successful build

**`prop`** {object} build

**Parameters:**

Name | Type |
------ | ------ |
`build` | any |

**Returns:** *boolean*

___

### `Const` svg

▸ **svg**(`bud`: any): *object*

*Defined in [src/build/rules/svg.ts:8](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/svg.ts#L8)*

SVG module rules

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **loaders**: *string[]* = [loaders.svgr, loaders.url]

* **output**(): *object*

* **test**: *RegExp‹›* = patterns.svg

* **make**(): *any*

* **post**(): *void*

* **pre**(): *void*

___

### `Const` sync

▸ **sync**(`__namedParameters`: object): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/sync.ts:17](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/sync.ts#L17)*

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

*Defined in [src/bud/api/target.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/target.ts#L12)*

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

### `Const` terminate

▸ **terminate**(`bud`: [Bud](globals.md#bud), `options`: object): *(Anonymous function)*

*Defined in [src/bud/util/terminate.ts:3](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/terminate.ts#L3)*

**Parameters:**

▪ **bud**: *[Bud](globals.md#bud)*

▪`Default value`  **options**: *object*= {
    dump: false,
    timeout: 500,
  }

Name | Type | Default |
------ | ------ | ------ |
`dump` | boolean | false |
`timeout` | number | 500 |

**Returns:** *(Anonymous function)*

___

### `Const` translate

▸ **translate**(`output`: string): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/translate.ts:15](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/translate.ts#L15)*

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

### `Const` typescript

▸ **typescript**(`bud`: [Bud](globals.md#bud)): *any*

*Defined in [src/build/rules/js/typescript.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/js/typescript.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](globals.md#bud) |

**Returns:** *any*

___

###  useCustom

▸ **useCustom**(`store`: any, `React`: any, `mapState`: any, `mapActions`: any): *any[]*

*Defined in [src/compiler/hooks/useStore.js:12](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useStore.js#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`store` | any |
`React` | any |
`mapState` | any |
`mapActions` | any |

**Returns:** *any[]*

___

### `Const` useProgress

▸ **useProgress**(): *any*

*Defined in [src/compiler/hooks/useWebpack.js:8](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useWebpack.js#L8)*

useProgress: Webpack ProgressPlugin

**Returns:** *any*

___

### `Const` useStore

▸ **useStore**(`React`: any, `initialState`: any, `actions`: any, `initializer`: any): *any*

*Defined in [src/compiler/hooks/useStore.js:68](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useStore.js#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`React` | any |
`initialState` | any |
`actions` | any |
`initializer` | any |

**Returns:** *any*

___

### `Const` useWebpack

▸ **useWebpack**(`__namedParameters`: object): *object*

*Defined in [src/compiler/hooks/useWebpack.js:34](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useWebpack.js#L34)*

Hook: useWebpack

**`prop`** {compiler} compiler webpack.compiler

**`prop`** {string}   options  project options

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`compiler` | any |
`config` | any |

**Returns:** *object*

* **assets**: *any[]*

* **errors**: *any[]*

* **hash**: *any* = buildStats?.hash

* **message**: *any*

* **percentage**: *any*

* **time**: *any* = buildStats?.time

* **warnings**: *any[]*

___

### `Const` watch

▸ **watch**(`this`: [Bud](globals.md#bud), `enabled`: boolean): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/watch.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/watch.ts#L12)*

## bud.watch

Enable or disable watch mode.

```js
bud.watch(true)
```

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Bud](globals.md#bud) |
`enabled` | boolean |

**Returns:** *[Bud](globals.md#bud)*

___

### `Const` webpackResolve

▸ **webpackResolve**(`bud`: any): *object*

*Defined in [src/build/webpackResolve.ts:6](https://github.com/roots/bud-support/blob/bd00b72/src/build/webpackResolve.ts#L6)*

Webpack resolvers.

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **make**(): *any*

* ### **options**: *object*

  * **resolve**: *object*

    * **alias**: *any* = bud.state.options.alias || {}

    * **extensions**: *string[]* = [
        '.js',
        '.json',
        '.vue',
        '.jsx',
        '.ts',
        '.tsx',
      ]

    * **modules**: *any[]* = [bud.project('node_modules')]

___

### `Const` writeFile

▸ **writeFile**(): *object*

*Defined in [src/bud/plugin/adapters/webpack/writeFile.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/writeFile.ts#L4)*

**Returns:** *object*

* **make**(): *any*

* **when**(): *boolean*

## Object literals

### `Const` api

### ▪ **api**: *object*

*Defined in [src/bud/api/index.ts:41](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L41)*

Bud.Bud export

###  alias

• **alias**: *function*

*Defined in [src/bud/api/index.ts:42](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L42)*

#### Type declaration:

▸ (`arg0`: object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | object |

###  auto

• **auto**: *function*

*Defined in [src/bud/api/index.ts:43](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L43)*

#### Type declaration:

▸ (`options`: object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

###  babel

• **babel**: *function*

*Defined in [src/bud/api/index.ts:44](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L44)*

#### Type declaration:

▸ (`arg0`: [BabelProperties](interfaces/babelproperties.md)): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | [BabelProperties](interfaces/babelproperties.md) |

###  bundle

• **bundle**: *function*

*Defined in [src/bud/api/index.ts:45](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L45)*

#### Type declaration:

▸ (`name`: string, `entries`: Object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`entries` | Object |

###  copy

• **copy**: *function*

*Defined in [src/bud/api/index.ts:46](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L46)*

#### Type declaration:

▸ (`from`: string, `to`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`from` | string |
`to` | string |

###  copyAll

• **copyAll**: *function*

*Defined in [src/bud/api/index.ts:47](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L47)*

#### Type declaration:

▸ (`from`: string, `to`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`from` | string |
`to` | string |

###  dashboard

• **dashboard**: *function*

*Defined in [src/bud/api/index.ts:48](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L48)*

#### Type declaration:

▸ (`enabled`: boolean): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

###  debug

• **debug**: *function*

*Defined in [src/bud/api/index.ts:49](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L49)*

#### Type declaration:

▸ (`enabled`: boolean): *any*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

###  dependencyManifest

• **dependencyManifest**: *function*

*Defined in [src/bud/api/index.ts:50](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L50)*

#### Type declaration:

▸ (`settings?`: object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`settings?` | object |

###  dev

• **dev**: *function*

*Defined in [src/bud/api/index.ts:51](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L51)*

#### Type declaration:

▸ (`options`: object): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

###  devtool

• **devtool**: *function*

*Defined in [src/bud/api/index.ts:52](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L52)*

#### Type declaration:

▸ (`devtool`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`devtool` | string |

###  dist

• **dist**: *[dist](globals.md#const-dist)*

*Defined in [src/bud/api/index.ts:53](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L53)*

###  distPath

• **distPath**: *[distPath](globals.md#const-distpath)*

*Defined in [src/bud/api/index.ts:54](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L54)*

###  dump

• **dump**: *[dump](globals.md#const-dump)*

*Defined in [src/bud/api/index.ts:55](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L55)*

###  env

• **env**: *[env](globals.md#const-env)*

*Defined in [src/bud/api/index.ts:56](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L56)*

###  hash

• **hash**: *[hash](globals.md#const-hash)*

*Defined in [src/bud/api/index.ts:57](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L57)*

###  hot

• **hot**: *[hot](globals.md#const-hot)*

*Defined in [src/bud/api/index.ts:58](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L58)*

###  inlineManifest

• **inlineManifest**: *function*

*Defined in [src/bud/api/index.ts:59](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L59)*

#### Type declaration:

▸ (`name?`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name?` | string |

###  map

• **map**: *function*

*Defined in [src/bud/api/index.ts:60](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L60)*

#### Type declaration:

▸ (`enabled`: boolean): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

###  mini

• **mini**: *function*

*Defined in [src/bud/api/index.ts:61](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L61)*

#### Type declaration:

▸ (`enabled?`: boolean): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled?` | boolean |

###  postCss

• **postCss**: *function*

*Defined in [src/bud/api/index.ts:62](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L62)*

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

*Defined in [src/bud/api/index.ts:63](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L63)*

#### Type declaration:

▸ (`relativePath`: string): *any*

**Parameters:**

Name | Type |
------ | ------ |
`relativePath` | string |

###  project

• **project**: *[project](globals.md#const-project)*

*Defined in [src/bud/api/index.ts:64](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L64)*

###  projectPath

• **projectPath**: *[projectPath](globals.md#const-projectpath)*

*Defined in [src/bud/api/index.ts:65](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L65)*

###  publicPath

• **publicPath**: *[publicPath](globals.md#const-publicpath)*

*Defined in [src/bud/api/index.ts:66](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L66)*

###  purge

• **purge**: *[purge](globals.md#const-purge)*

*Defined in [src/bud/api/index.ts:67](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L67)*

###  register

• **register**: *function*

*Defined in [src/bud/api/index.ts:68](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L68)*

#### Type declaration:

▸ (`name`: string, `plugin`: any): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`plugin` | any |

###  resolve

• **resolve**: *function*

*Defined in [src/bud/api/index.ts:69](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L69)*

#### Type declaration:

▸ (`moduleName`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`moduleName` | string |

###  setEnv

• **setEnv**: *[setEnv](globals.md#const-setenv)*

*Defined in [src/bud/api/index.ts:70](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L70)*

###  src

• **src**: *function*

*Defined in [src/bud/api/index.ts:71](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L71)*

#### Type declaration:

▸ (`relativePath`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`relativePath` | string |

###  srcPath

• **srcPath**: *function*

*Defined in [src/bud/api/index.ts:72](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L72)*

#### Type declaration:

▸ (`src`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`src` | string |

###  sync

• **sync**: *function*

*Defined in [src/bud/api/index.ts:73](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L73)*

#### Type declaration:

▸ (`arg0`: [SyncOptions](interfaces/syncoptions.md)): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | [SyncOptions](interfaces/syncoptions.md) |

###  target

• **target**: *function*

*Defined in [src/bud/api/index.ts:74](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L74)*

#### Type declaration:

▸ (`target`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`target` | string |

###  translate

• **translate**: *function*

*Defined in [src/bud/api/index.ts:75](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L75)*

#### Type declaration:

▸ (`output`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | string |

###  vendor

• **vendor**: *function*

*Defined in [src/bud/api/index.ts:76](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L76)*

#### Type declaration:

▸ (`name`: string): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

###  watch

• **watch**: *function*

*Defined in [src/bud/api/index.ts:77](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/index.ts#L77)*

#### Type declaration:

▸ (`enabled`: boolean): *[Bud](globals.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

___

### `Const` babelFallback

### ▪ **babelFallback**: *object*

*Defined in [src/bud/state/options.ts:17](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L17)*

###  plugins

• **plugins**: *[]* = []

*Defined in [src/bud/state/options.ts:19](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L19)*

###  presets

• **presets**: *[]* = []

*Defined in [src/bud/state/options.ts:18](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L18)*

___

### `Const` browserSync

▸ **browserSync**(): *object*

*Defined in [src/bud/plugin/adapters/webpack/browserSync.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/browserSync.ts#L10)*

BrowserSync plugin adapter.

**Returns:** *object*

* **make**(): *BrowserSyncPlugin*

* **mergeOptions**(): *Object*

* **when**(): *boolean*

###  host

• **host**: *any* = env?.BROWSERSYNC_HOST
    ? env.BROWSERSYNC_HOST
    : 'localhost'

*Defined in [src/bud/state/options.ts:27](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L27)*

###  port

• **port**: *any* = env?.BROWSERSYNC_PORT ? env.BROWSERSYNC_PORT : 3000

*Defined in [src/bud/state/options.ts:30](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L30)*

###  proxy

• **proxy**: *any* = env?.BROWSERSYNC_PROXY
    ? env.BROWSERSYNC_PROXY
    : null

*Defined in [src/bud/state/options.ts:31](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L31)*

___

### `Const` bud

### ▪ **bud**: *object* = require(getProjectConfig())

Defined in src/bin.ts:28

*Defined in [src/bud/index.ts:16](https://github.com/roots/bud-support/blob/bd00b72/src/bud/index.ts#L16)*

Bud - asset management framework.

**`see`** [https://roots.io/bud](https://roots.io/bud)

**`copyright`** Roots [https://roots.io](https://roots.io)

###  hooks

• **hooks**: *object*

*Defined in [src/bud/index.ts:18](https://github.com/roots/bud-support/blob/bd00b72/src/bud/index.ts#L18)*

#### Type declaration:

* **call**(): *function*

  * (`name`: string, `params`: any): *void*

* **getAll**: *Function*

* **make**: *Function*

* **on**(): *function*

  * (`name`: string, `callback`: Function): *void*

* **registered**: *Object*

###  inProduction

• **inProduction**: *boolean*

*Defined in [src/bud/index.ts:23](https://github.com/roots/bud-support/blob/bd00b72/src/bud/index.ts#L23)*

###  mode

• **mode**: *"development" | "production" | "none"*

*Defined in [src/bud/index.ts:22](https://github.com/roots/bud-support/blob/bd00b72/src/bud/index.ts#L22)*

###  plugin

• **plugin**: *object*

*Defined in [src/bud/index.ts:20](https://github.com/roots/bud-support/blob/bd00b72/src/bud/index.ts#L20)*

#### Type declaration:

* **controller**(): *function*

  * (`bud`: [Bud](globals.md#bud)): *[Controller](globals.md#controller)*

* **webpackAdapters**: *[WebpackAdapters](globals.md#webpackadapters)*

###  state

• **state**: *object*

*Defined in [src/bud/index.ts:21](https://github.com/roots/bud-support/blob/bd00b72/src/bud/index.ts#L21)*

#### Type declaration:

* **configs**: *[Configs](globals.md#configs)*

* **features**: *[Features](globals.md#features)*

* **options**: *[Options](globals.md#options)*

* **paths**: *[Paths](globals.md#paths)*

###  util

• **util**: *object*

*Defined in [src/bud/index.ts:19](https://github.com/roots/bud-support/blob/bd00b72/src/bud/index.ts#L19)*

#### Type declaration:

* **dump**: *[Dump](globals.md#dump)*

* **except**: *[Except](globals.md#except)*

* **fab**: *[Fab](globals.md#fab)*

* **shortCircuit**: *[ShortCircuit](globals.md#shortcircuit)*

* **terminate**(): *function*

  * (`any`: any): *void*

___

### `Const` configs

### ▪ **configs**: *object*

*Defined in [src/bud/state/configs.ts:39](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/configs.ts#L39)*

Project configuration files.

**`property`** {(string|boolean)} babel   - project babel.config.js

**`property`** {(string|boolean)} eslint  - project .eslintrc.js

**`property`** {(string|boolean)} postcss - project postcss.config.js

**`property`** {(string|boolean)} typescript - project tsconfig.json

###  babel

• **babel**: *any* = maybeConfig('babel.config.js')

*Defined in [src/bud/state/configs.ts:40](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/configs.ts#L40)*

###  eslint

• **eslint**: *any* = maybeConfig('.eslintrc.js')

*Defined in [src/bud/state/configs.ts:41](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/configs.ts#L41)*

###  postCss

• **postCss**: *any* = maybeConfig('postcss.config.js')

*Defined in [src/bud/state/configs.ts:42](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/configs.ts#L42)*

###  typescript

• **typescript**: *any* = maybeConfig('tsconfig.json')

*Defined in [src/bud/state/configs.ts:43](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/configs.ts#L43)*

___

### `Const` copy

▸ **copy**(`this`: [Bud](globals.md#bud), `from`: string, `to`: string): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/copy.ts:15](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/copy.ts#L15)*

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

▸ **copy**(): *object*

*Defined in [src/bud/plugin/adapters/webpack/copy.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/adapters/webpack/copy.ts#L4)*

## bud.copy

Copy a file.

```js
bud.copy(
  bud.src('images/image.png'),
  bud.dist('image.png'),
)
```

**Returns:** *object*

* **make**(): *any*

* **setOptions**(): *any*

* **when**(): *any*

###  patterns

• **patterns**: *undefined[]* = []

*Defined in [src/bud/state/options.ts:36](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L36)*

___

### `Const` dependencyManifest

▸ **dependencyManifest**(`settings`: object): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/dependencyManifest.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/dependencyManifest.ts#L12)*

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

###  combineAssets

• **combineAssets**: *undefined* = undefined

*Defined in [src/bud/state/options.ts:39](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L39)*

###  combinedOutputFile

• **combinedOutputFile**: *undefined* = undefined

*Defined in [src/bud/state/options.ts:40](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L40)*

###  injectPolyfill

• **injectPolyfill**: *false* = false

*Defined in [src/bud/state/options.ts:41](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L41)*

###  outputFormat

• **outputFormat**: *"json"* = "json"

*Defined in [src/bud/state/options.ts:42](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L42)*

###  useDefaults

• **useDefaults**: *true* = true

*Defined in [src/bud/state/options.ts:43](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L43)*

___

### `Const` dev

▸ **dev**(`options`: object): *[Bud](globals.md#bud)*

*Defined in [src/bud/api/dev.ts:6](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/dev.ts#L6)*

Development server settings

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

**Returns:** *[Bud](globals.md#bud)*

###  clientLogLevel

• **clientLogLevel**: *string* = "none"

*Defined in [src/bud/state/options.ts:47](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L47)*

###  compress

• **compress**: *boolean* = true

*Defined in [src/bud/state/options.ts:48](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L48)*

###  disableHostCheck

• **disableHostCheck**: *boolean* = true

*Defined in [src/bud/state/options.ts:49](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L49)*

###  historyApiFallback

• **historyApiFallback**: *boolean* = true

*Defined in [src/bud/state/options.ts:53](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L53)*

###  hotOnly

• **hotOnly**: *boolean* = true

*Defined in [src/bud/state/options.ts:54](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L54)*

###  injectHot

• **injectHot**: *boolean* = true

*Defined in [src/bud/state/options.ts:55](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L55)*

###  open

• **open**: *boolean* = false

*Defined in [src/bud/state/options.ts:56](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L56)*

###  overlay

• **overlay**: *boolean* = true

*Defined in [src/bud/state/options.ts:57](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L57)*

▪ **headers**: *object*

*Defined in [src/bud/state/options.ts:50](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L50)*

* **Access-Control-Allow-Origin**: *string* = "*"

▪ **watchOptions**: *object*

*Defined in [src/bud/state/options.ts:58](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L58)*

* **aggregateTimeout**: *number* = 300

___

### `Const` env

▸ **env**(`key`: string | number): *any*

*Defined in [src/bud/api/env.ts:7](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/env.ts#L7)*

Get environment variable value.

**`example`** bud.env('APP_NAME')

**Parameters:**

Name | Type |
------ | ------ |
`key` | string &#124; number |

**Returns:** *any*

___

### `Const` fab

### ▪ **fab**: *object*

*Defined in [src/bud/util/fab.ts:6](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/fab.ts#L6)*

Fabs: like noop but fab.

###  false

▸ **false**(): *false*

*Defined in [src/bud/util/fab.ts:7](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/fab.ts#L7)*

**Returns:** *false*

###  null

▸ **null**(): *any*

*Defined in [src/bud/util/fab.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/fab.ts#L10)*

**Returns:** *any*

###  true

▸ **true**(): *true*

*Defined in [src/bud/util/fab.ts:8](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/fab.ts#L8)*

**Returns:** *true*

###  undefined

▸ **undefined**(): *any*

*Defined in [src/bud/util/fab.ts:9](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/fab.ts#L9)*

**Returns:** *any*

___

### `Const` features

### ▪ **features**: *object*

*Defined in [src/bud/state/features.ts:7](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L7)*

Features

###  babel

• **babel**: *true* = true

*Defined in [src/bud/state/features.ts:8](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L8)*

###  browserSync

• **browserSync**: *boolean* = !inProduction

*Defined in [src/bud/state/features.ts:9](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L9)*

###  dashboard

• **dashboard**: *true* = true

*Defined in [src/bud/state/features.ts:11](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L11)*

###  debug

• **debug**: *false* = false

*Defined in [src/bud/state/features.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L10)*

###  dependencyManifest

• **dependencyManifest**: *false* = false

*Defined in [src/bud/state/features.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L12)*

###  dump

• **dump**: *false* = false

*Defined in [src/bud/state/features.ts:13](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L13)*

###  eslint

• **eslint**: *true* = true

*Defined in [src/bud/state/features.ts:14](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L14)*

###  hash

• **hash**: *boolean* = inProduction

*Defined in [src/bud/state/features.ts:15](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L15)*

###  hot

• **hot**: *boolean* = !inProduction

*Defined in [src/bud/state/features.ts:16](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L16)*

###  inlineManifest

• **inlineManifest**: *false* = false

*Defined in [src/bud/state/features.ts:17](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L17)*

###  minified

• **minified**: *boolean* = inProduction

*Defined in [src/bud/state/features.ts:18](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L18)*

###  overlay

• **overlay**: *true* = true

*Defined in [src/bud/state/features.ts:19](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L19)*

###  postCss

• **postCss**: *true* = true

*Defined in [src/bud/state/features.ts:20](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L20)*

###  purge

• **purge**: *false* = false

*Defined in [src/bud/state/features.ts:21](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L21)*

###  sourceMap

• **sourceMap**: *boolean* = !inProduction

*Defined in [src/bud/state/features.ts:22](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L22)*

###  splitting

• **splitting**: *true* = true

*Defined in [src/bud/state/features.ts:23](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L23)*

###  translate

• **translate**: *false* = false

*Defined in [src/bud/state/features.ts:24](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L24)*

###  typescript

• **typescript**: *true* = true

*Defined in [src/bud/state/features.ts:25](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L25)*

###  vendor

• **vendor**: *false* = false

*Defined in [src/bud/state/features.ts:26](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L26)*

###  watch

• **watch**: *boolean* = !inProduction

*Defined in [src/bud/state/features.ts:27](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/features.ts#L27)*

___

### `Const` hooks

### ▪ **hooks**: *object*

*Defined in [src/bud/hooks/hooks.ts:18](https://github.com/roots/bud-support/blob/bd00b72/src/bud/hooks/hooks.ts#L18)*

## bud.hooks

Register callback.

```js
bud.hooks.on('hookName', function(value) {
  doSomething(value)
})}
```

Invoke registered callback(s)

```js
bud.hooks.call('hookName', value)
```

###  registered

• **registered**: *object*

*Defined in [src/bud/hooks/hooks.ts:22](https://github.com/roots/bud-support/blob/bd00b72/src/bud/hooks/hooks.ts#L22)*

Registered hooks.

#### Type declaration:

###  call

▸ **call**(`name`: string, ...`params`: [any]): *void*

*Defined in [src/bud/hooks/hooks.ts:52](https://github.com/roots/bud-support/blob/bd00b72/src/bud/hooks/hooks.ts#L52)*

Call a bud hook.

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`...params` | [any] |

**Returns:** *void*

###  getAll

▸ **getAll**(): *[string, unknown][]*

*Defined in [src/bud/hooks/hooks.ts:32](https://github.com/roots/bud-support/blob/bd00b72/src/bud/hooks/hooks.ts#L32)*

Get all bud hook entries.

**Returns:** *[string, unknown][]*

###  make

▸ **make**(`fn`: (Anonymous function)): *object*

*Defined in [src/bud/hooks/hooks.ts:27](https://github.com/roots/bud-support/blob/bd00b72/src/bud/hooks/hooks.ts#L27)*

Make a bud hook

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fn` | (Anonymous function) | () => null |

**Returns:** *object*

* **fired**: *boolean* = false

* **fn**: *(Anonymous function)*

###  on

▸ **on**(`name`: string, `callback`: Function): *any*

*Defined in [src/bud/hooks/hooks.ts:39](https://github.com/roots/bud-support/blob/bd00b72/src/bud/hooks/hooks.ts#L39)*

Register a function as a bud hook.

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`callback` | Function |

**Returns:** *any*

___

### `Const` loaders

### ▪ **loaders**: *object*

*Defined in [src/build/rules/util/loaders.ts:8](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/loaders.ts#L8)*

Style loaders

###  babel

• **babel**: *string* = require.resolve('babel-loader')

*Defined in [src/build/rules/util/loaders.ts:9](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/loaders.ts#L9)*

###  css

• **css**: *string* = require.resolve('css-loader')

*Defined in [src/build/rules/util/loaders.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/loaders.ts#L10)*

###  eslint

• **eslint**: *string* = require.resolve('eslint-loader')

*Defined in [src/build/rules/util/loaders.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/loaders.ts#L12)*

###  file

• **file**: *string* = require.resolve('file-loader')

*Defined in [src/build/rules/util/loaders.ts:11](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/loaders.ts#L11)*

###  miniCss

• **miniCss**: *string* = MiniCssExtractPlugin.loader

*Defined in [src/build/rules/util/loaders.ts:13](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/loaders.ts#L13)*

###  postCss

• **postCss**: *string* = require.resolve('postcss-loader')

*Defined in [src/build/rules/util/loaders.ts:14](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/loaders.ts#L14)*

###  resolveUrl

• **resolveUrl**: *string* = require.resolve('resolve-url-loader')

*Defined in [src/build/rules/util/loaders.ts:15](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/loaders.ts#L15)*

###  scss

• **scss**: *string* = require.resolve('sass-loader')

*Defined in [src/build/rules/util/loaders.ts:16](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/loaders.ts#L16)*

###  style

• **style**: *string* = require.resolve('style-loader')

*Defined in [src/build/rules/util/loaders.ts:17](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/loaders.ts#L17)*

###  svgr

• **svgr**: *string* = require.resolve('@svgr/webpack')

*Defined in [src/build/rules/util/loaders.ts:18](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/loaders.ts#L18)*

###  ts

• **ts**: *string* = require.resolve('ts-loader')

*Defined in [src/build/rules/util/loaders.ts:20](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/loaders.ts#L20)*

###  url

• **url**: *string* = require.resolve('url-loader')

*Defined in [src/build/rules/util/loaders.ts:19](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/loaders.ts#L19)*

___

### `Const` options

### ▪ **options**: *object*

*Defined in [src/bud/state/options.ts:83](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L83)*

Options container.

###  alias

• **alias**: *object*

*Defined in [src/bud/state/options.ts:84](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L84)*

#### Type declaration:

###  auto

• **auto**: *Object*

*Defined in [src/bud/state/options.ts:94](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L94)*

###  babel

• **babel**: *object*

*Defined in [src/bud/state/options.ts:85](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L85)*

#### Type declaration:

* **plugins**: *[]*

* **presets**: *[]*

###  browserSync

• **browserSync**: *Object*

*Defined in [src/bud/state/options.ts:95](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L95)*

###  copy

• **copy**: *object*

*Defined in [src/bud/state/options.ts:96](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L96)*

#### Type declaration:

* **patterns**: *object[]*

###  dependencyManifest

• **dependencyManifest**: *object*

*Defined in [src/bud/state/options.ts:98](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L98)*

#### Type declaration:

* **combineAssets**: *boolean | undefined*

* **combinedOutputFile**: *string | null*

* **injectPolyfill**: *boolean*

* **outputFormat**: *"json" | "php"*

* **requestToExternal**? : *RequestToExternal | undefined*

* **requestToHandle**? : *RequestToHandle | undefined*

* **useDefaults**: *boolean*

###  dev

• **dev**: *any*

*Defined in [src/bud/state/options.ts:97](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L97)*

###  devtool

• **devtool**: *string* = "cheap-module-source-map"

*Defined in [src/bud/state/options.ts:99](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L99)*

###  entry

• **entry**: *object*

*Defined in [src/bud/state/options.ts:100](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L100)*

#### Type declaration:

###  env

• **env**: *any* = env

*Defined in [src/bud/state/options.ts:101](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L101)*

###  externals

• **externals**: *ExternalsObjectElement*

*Defined in [src/bud/state/options.ts:102](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L102)*

###  postCss

• **postCss**: *object*

*Defined in [src/bud/state/options.ts:86](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L86)*

#### Type declaration:

* **plugins**: *[]*

###  target

• **target**: *"web"*

*Defined in [src/bud/state/options.ts:109](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L109)*

###  typescript

• **typescript**: *any*

*Defined in [src/bud/state/options.ts:87](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L87)*

###  vendor

• **vendor**: *object*

*Defined in [src/bud/state/options.ts:125](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L125)*

#### Type declaration:

* **name**: *String*

▪ **inlineManifest**: *object*

*Defined in [src/bud/state/options.ts:103](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L103)*

* **name**: *string* = "runtime"

▪ **splitting**: *object*

*Defined in [src/bud/state/options.ts:106](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L106)*

* **maxChunks**: *null* = null

▪ **svg**: *object*

*Defined in [src/bud/state/options.ts:88](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L88)*

* **use**: *string[]* = [
      require.resolve('@svgr/webpack'),
      require.resolve('url-loader'),
    ]

▪ **uglify**: *object*

*Defined in [src/bud/state/options.ts:110](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L110)*

* **cache**: *boolean* = true

* **extractComments**: *boolean* = false

* **parallel**: *boolean* = true

* **chunkFilter**(`__namedParameters`: object): *boolean*

* **uglifyOptions**: *object*

  * **compress**: *boolean* = false

  * **mangle**: *object*

    * **toplevel**: *boolean* = true

  * **output**: *object*

    * **beautify**: *boolean* = false

___

### `Const` paths

### ▪ **paths**: *object*

*Defined in [src/bud/state/paths.ts:20](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/paths.ts#L20)*

Path references.

###  dist

• **dist**: *string* = join(projectDir, '')

*Defined in [src/bud/state/paths.ts:24](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/paths.ts#L24)*

###  framework

• **framework**: *string* = frameworkDir

*Defined in [src/bud/state/paths.ts:22](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/paths.ts#L22)*

###  project

• **project**: *string* = projectDir

*Defined in [src/bud/state/paths.ts:21](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/paths.ts#L21)*

###  public

• **public**: *string* = ""

*Defined in [src/bud/state/paths.ts:25](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/paths.ts#L25)*

###  src

• **src**: *string* = join(projectDir, '')

*Defined in [src/bud/state/paths.ts:23](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/paths.ts#L23)*

___

### `Const` patterns

### ▪ **patterns**: *object*

*Defined in [src/build/rules/util/patterns.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/patterns.ts#L10)*

loader test regex patterns

**`prop`** {RegExp} sass

**`prop`** {RegExp} sassModule

**`prop`** {RegExp} css

**`prop`** {cssModule} cssModule

###  css

• **css**: *RegExp‹›* = /\.css$/

*Defined in [src/build/rules/util/patterns.ts:14](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/patterns.ts#L14)*

###  cssModule

• **cssModule**: *RegExp‹›* = /\.module\.css$/

*Defined in [src/build/rules/util/patterns.ts:15](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/patterns.ts#L15)*

###  font

• **font**: *RegExp‹›* = /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|ico)$/

*Defined in [src/build/rules/util/patterns.ts:17](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/patterns.ts#L17)*

###  image

• **image**: *RegExp‹›* = /\.(png|svg|jpg|gif)$/

*Defined in [src/build/rules/util/patterns.ts:19](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/patterns.ts#L19)*

###  js

• **js**: *RegExp‹›* = /\.(js|jsx|mjs|ts|tsx)$/

*Defined in [src/build/rules/util/patterns.ts:11](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/patterns.ts#L11)*

###  scss

• **scss**: *RegExp‹›* = /\.scss$/

*Defined in [src/build/rules/util/patterns.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/patterns.ts#L12)*

###  scssModule

• **scssModule**: *RegExp‹›* = /\.module\.(scss|sass)$/

*Defined in [src/build/rules/util/patterns.ts:13](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/patterns.ts#L13)*

###  svg

• **svg**: *RegExp‹›* = /\.svg$/

*Defined in [src/build/rules/util/patterns.ts:16](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/patterns.ts#L16)*

###  vendor

• **vendor**: *RegExp‹›* = /(node_modules|bower_components)/

*Defined in [src/build/rules/util/patterns.ts:18](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/util/patterns.ts#L18)*

___

### `Const` plugin

### ▪ **plugin**: *object*

*Defined in [src/bud/plugin/index.ts:8](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/index.ts#L8)*

bud.plugin export

###  controller

• **controller**: *[controller](globals.md#const-controller)*

*Defined in [src/bud/plugin/index.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/index.ts#L10)*

###  webpackAdapters

• **webpackAdapters**: *[string, function][]*

*Defined in [src/bud/plugin/index.ts:9](https://github.com/roots/bud-support/blob/bd00b72/src/bud/plugin/index.ts#L9)*

___

### `Const` postCssFallback

### ▪ **postCssFallback**: *object*

*Defined in [src/bud/state/options.ts:65](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L65)*

###  plugins

• **plugins**: *[]* = []

*Defined in [src/bud/state/options.ts:66](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L66)*

___

### `Const` state

### ▪ **state**: *object*

*Defined in [src/bud/state/index.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/index.ts#L10)*

bud.state

###  configs

• **configs**: *object*

*Defined in [src/bud/state/index.ts:11](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/index.ts#L11)*

#### Type declaration:

* **babel**: *string | null*

* **eslint**: *string | null*

* **postCss**: *string | null*

* **typescript**: *string | null*

###  features

• **features**: *object*

*Defined in [src/bud/state/index.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/index.ts#L12)*

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

###  options

• **options**: *object*

*Defined in [src/bud/state/index.ts:13](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/index.ts#L13)*

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

###  paths

• **paths**: *object*

*Defined in [src/bud/state/index.ts:14](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/index.ts#L14)*

#### Type declaration:

* **dist**: *[Directory](globals.md#directory)*

* **framework**: *[Directory](globals.md#directory)*

* **project**: *[Directory](globals.md#directory)*

* **public**: *[Directory](globals.md#directory)*

* **src**: *[Directory](globals.md#directory)*

___

### `Const` util

### ▪ **util**: *object*

*Defined in [src/bud/util/index.ts:8](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/index.ts#L8)*

###  dump

• **dump**: *function*

*Defined in [src/bud/util/index.ts:9](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/index.ts#L9)*

#### Type declaration:

▸ (`obj`: Object): *void*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | Object |

###  except

• **except**: *Function*

*Defined in [src/bud/util/index.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/index.ts#L10)*

###  fab

• **fab**: *object*

*Defined in [src/bud/util/index.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/index.ts#L12)*

#### Type declaration:

* **false**(): *function*

  * (): *boolean*

* **null**(): *function*

  * (): *null*

* **true**(): *function*

  * (): *boolean*

* **undefined**(): *function*

  * (): *undefined*

###  shortCircuit

• **shortCircuit**: *function*

*Defined in [src/bud/util/index.ts:11](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/index.ts#L11)*

#### Type declaration:

▸ (): *any*

###  terminate

• **terminate**: *[terminate](globals.md#const-terminate)*

*Defined in [src/bud/util/index.ts:13](https://github.com/roots/bud-support/blob/bd00b72/src/bud/util/index.ts#L13)*

___

### `Const` vendor

▸ **vendor**(`this`: [Bud](globals.md#bud), `name`: string): *object*

*Defined in [src/bud/api/vendor.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/vendor.ts#L12)*

## bud.vendor

Enable vendor bundling.

```js
bud.vendor('vendor')
```

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`this` | [Bud](globals.md#bud) | - |
`name` | string | "vendor" |

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

* **inProduction**: *[Production](globals.md#production)*

* **mode**: *[Mode](globals.md#mode)*

* **plugin**: *[Plugin](globals.md#plugin)*

* **src**: *[Src](globals.md#src)*

* **srcPath**: *[SrcPath](globals.md#srcpath)*

* **state**: *[State](globals.md#state)*

* **sync**: *[Sync](globals.md#sync)*

* **util**: *[Util](globals.md#util)*

* **vendor**: *[Vendor](globals.md#vendor)*

* **watch**: *[Watch](globals.md#watch)*

###  name

• **name**: *string* = "vendor"

*Defined in [src/bud/state/options.ts:78](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L78)*
