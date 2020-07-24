# Module: "build/optimization"

## Functions

### `Const` optimization

▸ **optimization**(`bud`: [Bud](_bud_util_types_.md#bud)): *object*

*Defined in [src/build/optimization.ts:8](https://github.com/roots/bud-support/blob/bd00b72/src/build/optimization.ts#L8)*

Webpack optimization

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
