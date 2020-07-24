# Module: "compiler/Runner"

## Variables

###  App

• **App**: *[App](_compiler_components_app_.md#const-app)*

*Defined in [src/compiler/Runner.js:9](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L9)*

___

###  Assets

• **Assets**: *[Assets](_compiler_components_assets_.md#const-assets)*

*Defined in [src/compiler/Runner.js:10](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L10)*

___

###  BrowserSync

• **BrowserSync**: *[BrowserSync](_compiler_components_browsersync_.md#const-browsersync)*

*Defined in [src/compiler/Runner.js:11](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L11)*

___

###  Errors

• **Errors**: *[Errors](_compiler_components_errors_index_.md#const-errors)*

*Defined in [src/compiler/Runner.js:12](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L12)*

___

### `Const` PropTypes

• **PropTypes**: *"/Users/kellymears/code/projects/cli/bud/bud/node_modules/@types/prop-types/index"* = require('prop-types')

*Defined in [src/compiler/Runner.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L4)*

___

### `Const` React

• **React**: *[React](_compiler_hooks_usefocusstate_.md#const-react)* = require('react')

*Defined in [src/compiler/Runner.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L1)*

___

###  Warnings

• **Warnings**: *[Warnings](_compiler_components_warnings_index_.md#const-warnings)*

*Defined in [src/compiler/Runner.js:13](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L13)*

___

### `Const` notifier

• **notifier**: *any* = require('node-notifier')

*Defined in [src/compiler/Runner.js:5](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L5)*

___

###  useApp

• **useApp**: *function*

*Defined in [src/compiler/Runner.js:3](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L3)*

#### Type declaration:

▸ (): *Props*

___

###  useEffect

• **useEffect**: *useEffect*

*Defined in [src/compiler/Runner.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L2)*

___

###  useFocusState

• **useFocusState**: *any*

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

### `Const` useStdOutDimensions

• **useStdOutDimensions**: *useStdoutDimensions* = require('ink-use-stdout-dimensions')

*Defined in [src/compiler/Runner.js:6](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L6)*

___

###  useWebpack

• **useWebpack**: *[useWebpack](_compiler_hooks_usewebpack_.md#const-usewebpack)*

*Defined in [src/compiler/Runner.js:7](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/Runner.js#L7)*

## Functions

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
