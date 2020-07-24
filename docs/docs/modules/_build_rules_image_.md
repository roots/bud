# Module: "build/rules/image"

## Type aliases

###  ImageRulesFactory

Ƭ **ImageRulesFactory**: *function*

*Defined in [src/build/rules/image.ts:21](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/image.ts#L21)*

#### Type declaration:

▸ (`bud`: object): *[imageLoaderInterface](_build_rules_image_.md#imageloaderinterface)*

**Parameters:**

Name | Type |
------ | ------ |
`bud` | object |

___

###  imageLoaderInterface

Ƭ **imageLoaderInterface**: *object*

*Defined in [src/build/rules/image.ts:14](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/image.ts#L14)*

#### Type declaration:

* **bud**: *object*

* **doHook**(): *function*

  * (`name`: string): *void*

* **make**(): *function*

  * (): *object*

* **options**: *[imageLoaderOptions](_build_rules_image_.md#imageloaderoptions)*

___

###  imageLoaderOptions

Ƭ **imageLoaderOptions**: *object*

*Defined in [src/build/rules/image.ts:4](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/image.ts#L4)*

#### Type declaration:

* **test**: *RegExp*

* **use**: *[object]*

## Functions

### `Const` image

▸ **image**(`bud`: object): *[imageLoaderInterface](_build_rules_image_.md#imageloaderinterface)*

*Defined in [src/build/rules/image.ts:32](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/image.ts#L32)*

Image module rules

**`property`** {imageLoaderOptions} options

**Parameters:**

Name | Type |
------ | ------ |
`bud` | object |

**Returns:** *[imageLoaderInterface](_build_rules_image_.md#imageloaderinterface)*
