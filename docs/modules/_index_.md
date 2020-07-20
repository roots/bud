[@roots/budpack](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### References

* [BudRenderer](_index_.md#budrenderer)

### Variables

* [budInstance](_index_.md#const-budinstance)
* [compiledConfig](_index_.md#const-compiledconfig)
* [dashboardEnabled](_index_.md#const-dashboardenabled)
* [mode](_index_.md#const-mode)

## References

###  BudRenderer

• **BudRenderer**:

## Variables

### `Const` budInstance

• **budInstance**: *bud* = require(join(
  process.cwd(),
  'bud.config.js',
))

Defined in src/index.ts:10

Load project config.

___

### `Const` compiledConfig

• **compiledConfig**: *Configuration* = webpackConfig(budInstance).compile()

Defined in src/index.ts:36

___

### `Const` dashboardEnabled

• **dashboardEnabled**: *boolean* = budInstance.features.dashboard

Defined in src/index.ts:15

___

### `Const` mode

• **mode**: *string* = budInstance.options.mode

Defined in src/index.ts:14
