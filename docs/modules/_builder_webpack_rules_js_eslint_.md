[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/webpack/rules/js/eslint"](_builder_webpack_rules_js_eslint_.md)

# Module: "builder/webpack/rules/js/eslint"

## Index

### Functions

* [eslint](_builder_webpack_rules_js_eslint_.md#const-eslint)

## Functions

### `Const` eslint

▸ **eslint**(`builder`: any): *object*

Defined in src/builder/webpack/rules/js/eslint.js:8

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
