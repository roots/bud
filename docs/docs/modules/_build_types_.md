# Module: "build/types"

## References

###  RegisteredPlugin

• **RegisteredPlugin**:

## Type aliases

###  BuilderConstructor

Ƭ **BuilderConstructor**: *function*

*Defined in [src/build/types.ts:17](https://github.com/roots/bud-support/blob/bd00b72/src/build/types.ts#L17)*

#### Type declaration:

▸ (`bud`: [Bud](_bud_util_types_.md#bud)): *[Builder](../interfaces/_build_types_.builder.md)*

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](_bud_util_types_.md#bud) |

___

###  BuilderController

Ƭ **BuilderController**: *object*

*Defined in [src/build/types.ts:6](https://github.com/roots/bud-support/blob/bd00b72/src/build/types.ts#L6)*

#### Type declaration:

* **bud**: *[Bud](_bud_util_types_.md#bud)*

* **builders**: *[RegisteredBuilder](_build_types_.md#registeredbuilder)[]*

* **config**: *[WebpackConfig](_compiler_types_.md#webpackconfig)*

* **doHook**(): *function*

  * (`name`: string, ...`any`: any): *void*

* **makeConfig**(): *function*

  * (): *[WebpackConfig](_compiler_types_.md#webpackconfig)*

* **mergeConfig**(): *function*

  * (`configValues`: Object): *void*

* **postBuilderHook**(): *function*

  * (`name`: string, `arg1`: any): *void*

* **preBuilderHook**(): *function*

  * (`name`: string, `arg1`: any): *void*

___

###  RegisteredBuilder

Ƭ **RegisteredBuilder**: *[string, [BuilderConstructor](_build_types_.md#builderconstructor)]*

*Defined in [src/build/types.ts:16](https://github.com/roots/bud-support/blob/bd00b72/src/build/types.ts#L16)*
