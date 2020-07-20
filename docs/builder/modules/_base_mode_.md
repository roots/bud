[@roots/budpack](../README.md) › [Globals](../globals.md) › ["base/mode"](_base_mode_.md)

# Module: "base/mode"

## Index

### Variables

* [inProduction](_base_mode_.md#const-inproduction)
* [mode](_base_mode_.md#const-mode)

## Variables

### `Const` inProduction

• **inProduction**: *boolean* = mode == 'production'

*Defined in [base/mode.js:24](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/mode.js#L24)*

inProduction

___

### `Const` mode

• **mode**: *any* = argv?.env
  ? argv.env
  : env?.APP_ENV
  ? env.APP_ENV
  : 'production'

*Defined in [base/mode.js:15](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/mode.js#L15)*

bud.mode

Webpack mode ('development'|'production')

Determined by the first match, in order of precedence:

 - CLI args
 - env file
 - fallback ('production')
