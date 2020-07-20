[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/webpack/rules/image"](_builder_webpack_rules_image_.md)

# Module: "builder/webpack/rules/image"

## Index

### Type aliases

* [ImageRulesFactory](_builder_webpack_rules_image_.md#imagerulesfactory)
* [imageLoaderInterface](_builder_webpack_rules_image_.md#imageloaderinterface)
* [imageLoaderOptions](_builder_webpack_rules_image_.md#imageloaderoptions)

### Functions

* [image](_builder_webpack_rules_image_.md#const-image)

## Type aliases

###  ImageRulesFactory

Ƭ **ImageRulesFactory**: *function*

Defined in src/builder/webpack/rules/image.ts:21

#### Type declaration:

▸ (`builder`: object): *[imageLoaderInterface](_builder_webpack_rules_image_.md#imageloaderinterface)*

**Parameters:**

Name | Type |
------ | ------ |
`builder` | object |

___

###  imageLoaderInterface

Ƭ **imageLoaderInterface**: *object*

Defined in src/builder/webpack/rules/image.ts:14

#### Type declaration:

* **builder**: *object*

* **doHook**(): *function*

  * (`name`: string): *void*

* **make**(): *function*

  * (): *object*

* **options**: *[imageLoaderOptions](_builder_webpack_rules_image_.md#imageloaderoptions)*

___

###  imageLoaderOptions

Ƭ **imageLoaderOptions**: *object*

Defined in src/builder/webpack/rules/image.ts:4

#### Type declaration:

* **test**: *RegExp*

* **use**: *[object]*

## Functions

### `Const` image

▸ **image**(`builder`: object): *[imageLoaderInterface](_builder_webpack_rules_image_.md#imageloaderinterface)*

Defined in src/builder/webpack/rules/image.ts:32

Image module rules

**`property`** {imageLoaderOptions} options

**Parameters:**

Name | Type |
------ | ------ |
`builder` | object |

**Returns:** *[imageLoaderInterface](_builder_webpack_rules_image_.md#imageloaderinterface)*
