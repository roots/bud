# Module: "build/general"

## Functions

### `Const` general

▸ **general**(`bud`: [Bud](_bud_util_types_.md#bud)): *object*

*Defined in [src/build/general.ts:8](https://github.com/roots/bud-support/blob/bd00b72/src/build/general.ts#L8)*

General webpack options

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](_bud_util_types_.md#bud) |

**Returns:** *object*

* **bud**(): *object*

  * **alias**: *[Alias](_bud_api_types_.md#alias)*

  * **auto**: *[Auto](_bud_api_types_.md#auto)*

  * **babel**: *[Babel](_bud_api_types_.md#babel)*

  * **bundle**: *[Bundle](_bud_api_types_.md#bundle)*

  * **copy**: *[Copy](_bud_state_types_.md#copy)*

  * **copyAll**: *[Copy](_bud_state_types_.md#copy)*

  * **debug**: *[Debug](_bud_api_types_.md#debug)*

  * **dependencyManifest**: *[DependencyManifest](_bud_api_types_.md#dependencymanifest)*

  * **dev**: *[Dev](_bud_state_types_.md#dev)*

  * **devtool**: *[Devtool](_bud_api_types_.md#devtool)*

  * **hooks**: *[Hooks](_bud_hooks_types_.md#hooks)*

  * **inProduction**: *[Production](_bud_types_.md#production)*

  * **mode**: *[Mode](_bud_types_.md#mode)*

  * **plugin**: *[Plugin](_bud_plugin_types_.md#plugin)*

  * **src**: *[Src](_bud_api_types_.md#src)*

  * **srcPath**: *[SrcPath](_bud_api_types_.md#srcpath)*

  * **state**: *[State](_bud_state_types_.md#state)*

  * **sync**: *[Sync](_bud_api_types_.md#sync)*

  * **util**: *[Util](_bud_util_types_.md#util)*

  * **vendor**: *[Vendor](_bud_state_types_.md#vendor)*

  * **watch**: *[Watch](_bud_api_types_.md#watch)*

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
