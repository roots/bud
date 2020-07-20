[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/base/mode"](_builder_base_mode_.md)

# Module: "builder/base/mode"

## Index

### Variables

* [inProduction](_builder_base_mode_.md#const-inproduction)
* [mode](_builder_base_mode_.md#const-mode)

## Variables

### `Const` inProduction

• **inProduction**: *boolean* = mode == 'production'

Defined in src/builder/base/mode.js:24

inProduction

___

### `Const` mode

• **mode**: *any* = argv?.env
  ? argv.env
  : env?.APP_ENV
  ? env.APP_ENV
  : 'production'

Defined in src/builder/base/mode.js:15

bud.mode

Webpack mode ('development'|'production')

Determined by the first match, in order of precedence:

 - CLI args
 - env file
 - fallback ('production')
