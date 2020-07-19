[@roots/budpack](../README.md) › [Globals](../globals.md) › ["rules/js/eslint"](_rules_js_eslint_.md)

# Module: "rules/js/eslint"

## Index

### Functions

* [eslint](_rules_js_eslint_.md#const-eslint)

## Functions

### `Const` eslint

▸ **eslint**(`builder`: any): *object*

*Defined in [rules/js/eslint.js:8](https://github.com/roots/bud-support/blob/a7a0906/src/budpack/builder/webpack/rules/js/eslint.js#L8)*

Eslint

**Parameters:**

Name | Type |
------ | ------ |
`builder` | any |

**Returns:** *object*

* **builder**: *any*

* **enabled**: *any* = builder.bud.configs.eslint

* **enforce**: *string* = "pre"

* **exclude**: *RegExp‹›* = patterns.vendor

* **include**: *any* = builder.bud.paths.src

* **loader**: *any* = loaders.eslint

* **output**(): *object*

* **test**: *RegExp‹›* = patterns.js

* **make**(): *object*

* **post**(): *void*

* **pre**(): *void*

* ### **options**: *object*

  * **configFile**: *any* = builder.bud.configs.eslint

  * **failOnError**: *boolean* = true

  * **formatter**: *string* = "codeframe"
