[@roots/budpack](../README.md) › [Globals](../globals.md) › ["webpack/rules/image"](_webpack_rules_image_.md)

# Module: "webpack/rules/image"

## Index

### Type aliases

* [ImageRulesFactory](_webpack_rules_image_.md#imagerulesfactory)
* [imageLoaderInterface](_webpack_rules_image_.md#imageloaderinterface)
* [imageLoaderOptions](_webpack_rules_image_.md#imageloaderoptions)

### Functions

* [image](_webpack_rules_image_.md#const-image)

## Type aliases

###  ImageRulesFactory

Ƭ **ImageRulesFactory**: *function*

*Defined in [webpack/rules/image.ts:21](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/webpack/rules/image.ts#L21)*

#### Type declaration:

▸ (`builder`: object): *[imageLoaderInterface](_webpack_rules_image_.md#imageloaderinterface)*

**Parameters:**

Name | Type |
------ | ------ |
`builder` | object |

___

###  imageLoaderInterface

Ƭ **imageLoaderInterface**: *object*

*Defined in [webpack/rules/image.ts:14](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/webpack/rules/image.ts#L14)*

#### Type declaration:

* **builder**: *object*

* **doHook**(): *function*

  * (`name`: string): *void*

* **make**(): *function*

  * (): *object*

* **options**: *[imageLoaderOptions](_webpack_rules_image_.md#imageloaderoptions)*

___

###  imageLoaderOptions

Ƭ **imageLoaderOptions**: *object*

*Defined in [webpack/rules/image.ts:4](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/webpack/rules/image.ts#L4)*

#### Type declaration:

* **test**: *RegExp*

* **use**: *[object]*

## Functions

### `Const` image

▸ **image**(`builder`: object): *[imageLoaderInterface](_webpack_rules_image_.md#imageloaderinterface)*

*Defined in [webpack/rules/image.ts:30](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/webpack/rules/image.ts#L30)*

Image module rules

**`property`** {imageLoaderOptions} options

**Parameters:**

Name | Type |
------ | ------ |
`builder` | object |

**Returns:** *[imageLoaderInterface](_webpack_rules_image_.md#imageloaderinterface)*
