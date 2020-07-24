# Module: "build/rules/scss/module"

## Functions

### `Const` module

▸ **module**(`bud`: any): *object*

*Defined in [src/build/rules/scss/module.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/scss/module.ts#L12)*

SCSS modules

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **miniCss**: *string* = loaders.miniCss

* **output**(): *object*

* **postCss**: *any* = postCss(bud).make()

* **resolveUrl**: *any* = resolveUrl(bud).make()

* **test**: *RegExp‹›* = patterns.scssModule

* **make**(): *any*

* **post**(): *void*

* **pre**(): *void*

* ### **css**: *object*

  * **loader**: *string* = loaders.css

  * **options**: *object*

    * **modules**: *boolean* = true

    * **onlyLocals**: *boolean* = false

* ### **scss**: *object*

  * **loader**: *string* = loaders.scss

  * **options**: *object*

    * **implementation**: *any* = implementation()

    * **sourceMap**: *boolean* = true
