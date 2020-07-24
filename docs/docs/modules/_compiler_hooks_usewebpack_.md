# Module: "compiler/hooks/useWebpack"

## Variables

###  ProgressPlugin

• **ProgressPlugin**: *ProgressPlugin*

*Defined in [src/compiler/hooks/useWebpack.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useWebpack.js#L2)*

___

###  useEffect

• **useEffect**: *useEffect*

*Defined in [src/compiler/hooks/useWebpack.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useWebpack.js#L1)*

___

###  useState

• **useState**: *useState*

*Defined in [src/compiler/hooks/useWebpack.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useWebpack.js#L1)*

## Functions

### `Const` useProgress

▸ **useProgress**(): *any*

*Defined in [src/compiler/hooks/useWebpack.js:8](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useWebpack.js#L8)*

useProgress: Webpack ProgressPlugin

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
