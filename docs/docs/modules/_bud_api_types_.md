# Module: "bud/api/types"

## References

###  Bud

• **Bud**:

___

###  RegisteredPlugin

• **RegisteredPlugin**:

## Type aliases

###  Alias

Ƭ **Alias**: *function*

*Defined in [src/bud/api/types.ts:6](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L6)*

#### Type declaration:

▸ (`arg0`: object): *[Bud](_bud_api_types_.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | object |

___

###  Api

Ƭ **Api**: *object*

*Defined in [src/bud/api/types.ts:35](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L35)*

#### Type declaration:

* **alias**: *[Alias](_bud_api_types_.md#alias)*

* **auto**: *[Auto](_bud_api_types_.md#auto)*

* **babel**: *[Babel](_bud_api_types_.md#babel)*

* **bundle**: *[Bundle](_bud_api_types_.md#bundle)*

* **copy**: *[Copy](_bud_api_types_.md#copy)*

* **copyAll**: *[Copy](_bud_api_types_.md#copy)*

* **dashboard**: *[Dashboard](_bud_api_types_.md#dashboard)*

* **debug**: *[Debug](_bud_api_types_.md#debug)*

* **dependencyManifest**: *[DependencyManifest](_bud_api_types_.md#dependencymanifest)*

* **dev**: *[Dev](_bud_api_types_.md#dev)*

* **devtool**: *[Devtool](_bud_api_types_.md#devtool)*

* **inlineManifest**: *[InlineManifest](_bud_api_types_.md#inlinemanifest)*

* **map**: *[SourceMap](_bud_api_types_.md#sourcemap)*

* **mini**: *[Mini](_bud_api_types_.md#mini)*

* **postCss**: *[PostCss](_bud_api_types_.md#postcss)*

* **preset**: *[Preset](_bud_api_types_.md#preset)*

* **register**: *[Register](_bud_api_types_.md#register)*

* **resolve**: *[Resolve](_bud_api_types_.md#resolve)*

* **src**: *[Src](_bud_api_types_.md#src)*

* **srcPath**: *[SrcPath](_bud_api_types_.md#srcpath)*

* **sync**: *[Sync](_bud_api_types_.md#sync)*

* **target**: *[Target](_bud_api_types_.md#target)*

* **translate**: *[Translate](_bud_api_types_.md#translate)*

* **vendor**: *[Vendor](_bud_api_types_.md#vendor)*

* **watch**: *[Watch](_bud_api_types_.md#watch)*

___

###  Auto

Ƭ **Auto**: *function*

*Defined in [src/bud/api/types.ts:7](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L7)*

#### Type declaration:

▸ (`options`: object): *[Bud](_bud_api_types_.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

___

###  Babel

Ƭ **Babel**: *function*

*Defined in [src/bud/api/types.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L10)*

#### Type declaration:

▸ (`arg0`: [BabelProperties](../interfaces/_bud_api_types_.babelproperties.md)): *[Bud](_bud_api_types_.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | [BabelProperties](../interfaces/_bud_api_types_.babelproperties.md) |

___

###  Bundle

Ƭ **Bundle**: *function*

*Defined in [src/bud/api/types.ts:11](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L11)*

#### Type declaration:

▸ (`name`: string, `entries`: Object): *[Bud](_bud_api_types_.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`entries` | Object |

___

###  Copy

Ƭ **Copy**: *function*

*Defined in [src/bud/api/types.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L12)*

#### Type declaration:

▸ (`from`: string, `to`: string): *[Bud](_bud_api_types_.md#bud)*

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

▸ (`enabled`: boolean): *[Bud](_bud_api_types_.md#bud)*

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

▸ (`settings?`: object): *[Bud](_bud_api_types_.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`settings?` | object |

___

###  Dev

Ƭ **Dev**: *function*

*Defined in [src/bud/api/types.ts:16](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L16)*

#### Type declaration:

▸ (`options`: object): *[Bud](_bud_api_types_.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

___

###  Devtool

Ƭ **Devtool**: *function*

*Defined in [src/bud/api/types.ts:17](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L17)*

#### Type declaration:

▸ (`devtool`: string): *[Bud](_bud_api_types_.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`devtool` | string |

___

###  InlineManifest

Ƭ **InlineManifest**: *function*

*Defined in [src/bud/api/types.ts:18](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L18)*

#### Type declaration:

▸ (`name?`: string): *[Bud](_bud_api_types_.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name?` | string |

___

###  Mini

Ƭ **Mini**: *function*

*Defined in [src/bud/api/types.ts:19](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L19)*

#### Type declaration:

▸ (`enabled?`: boolean): *[Bud](_bud_api_types_.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled?` | boolean |

___

###  PostCss

Ƭ **PostCss**: *function*

*Defined in [src/bud/api/types.ts:20](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L20)*

#### Type declaration:

▸ (`options?`: object): *[Bud](_bud_api_types_.md#bud)*

**Parameters:**

▪`Optional`  **options**: *object*

Name | Type |
------ | ------ |
`enabled?` | boolean |
`plugins?` | any[] |

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

###  Register

Ƭ **Register**: *function*

*Defined in [src/bud/api/types.ts:26](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L26)*

#### Type declaration:

▸ (`name`: string, `plugin`: any): *[Bud](_bud_api_types_.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`plugin` | any |

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

###  SourceMap

Ƭ **SourceMap**: *function*

*Defined in [src/bud/api/types.ts:27](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L27)*

#### Type declaration:

▸ (`enabled`: boolean): *[Bud](_bud_api_types_.md#bud)*

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

▸ (`src`: string): *[Bud](_bud_api_types_.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`src` | string |

___

###  Sync

Ƭ **Sync**: *function*

*Defined in [src/bud/api/types.ts:30](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L30)*

#### Type declaration:

▸ (`arg0`: [SyncOptions](../interfaces/_bud_api_types_.syncoptions.md)): *[Bud](_bud_api_types_.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | [SyncOptions](../interfaces/_bud_api_types_.syncoptions.md) |

___

###  Target

Ƭ **Target**: *function*

*Defined in [src/bud/api/types.ts:31](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L31)*

#### Type declaration:

▸ (`target`: string): *[Bud](_bud_api_types_.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`target` | string |

___

###  Translate

Ƭ **Translate**: *function*

*Defined in [src/bud/api/types.ts:32](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L32)*

#### Type declaration:

▸ (`output`: string): *[Bud](_bud_api_types_.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | string |

___

###  Vendor

Ƭ **Vendor**: *function*

*Defined in [src/bud/api/types.ts:34](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L34)*

#### Type declaration:

▸ (`name`: string): *[Bud](_bud_api_types_.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

___

###  Watch

Ƭ **Watch**: *function*

*Defined in [src/bud/api/types.ts:33](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/types.ts#L33)*

#### Type declaration:

▸ (`enabled`: boolean): *[Bud](_bud_api_types_.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |
