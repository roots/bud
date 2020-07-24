# Module: "build/rules/css/module"

## Functions

### `Const` module

▸ **module**(`bud`: any): *object*

*Defined in [src/build/rules/css/module.ts:11](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/css/module.ts#L11)*

CSS modules

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

* **test**: *RegExp‹›* = patterns.cssModule

* **make**(): *any*

* **post**(): *void*

* **pre**(): *void*

* ### **css**: *object*

  * **loader**: *string* = loaders.css

  * **options**: *object*

    * **modules**: *boolean* = true

    * **onlyLocals**: *boolean* = false
