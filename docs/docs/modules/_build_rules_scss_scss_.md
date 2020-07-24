# Module: "build/rules/scss/scss"

## Functions

### `Const` scss

▸ **scss**(`bud`: any): *object*

*Defined in [src/build/rules/scss/scss.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/scss/scss.ts#L10)*

scss

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **css**: *string* = loaders.css

* **miniCss**: *string* = loaders.miniCss

* **output**(): *object*

* **postCss**: *any* = postCss(bud).make()

* **resolveUrl**: *any* = resolveUrl(bud).make()

* **test**: *RegExp‹›* = patterns.scss

* **make**(): *any*

* **post**(): *void*

* **pre**(): *void*

* ### **scss**: *object*

  * **loader**: *string* = loaders.scss

  * **options**: *object*

    * **implementation**: *any* = implementation()

    * **sourceMap**: *boolean* = true
