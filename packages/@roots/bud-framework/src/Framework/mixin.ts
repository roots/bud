import type {Class} from 'type-fest'

import {Framework} from '.'

/**
 * Generic type defining the {@link Service.bindClass} map of classes to {@link Framework} property keys
 *
 * @public
 */
interface GenericClassMap {
  [key: string]: [Class<any>, any]
}

/**
 * Bind a {@link Class} to the {@link Framework}.
 *
 * @remarks
 * Constructor parameters can be specified using an array.
 *
 * @example
 * Bind a Class named `FooClass` to `app.Foo`:
 *
 * ```js
 * app.service.bindClass({Foo: FooClass})
 * ```
 *
 * Specify constructor parameters with a tuple:
 *
 * ```js
 * app.service.bindClass({
 *   bindingName: [BindingClass, foo, bar]
 * })
 * ```
 *
 * @typeParam Binding - Map of {@link Framework} keys to classes
 *
 * @public
 * @decorator `@bind`
 */
export function mixin<ClassMap = GenericClassMap>(
  properties: ClassMap,
): void {
  const ctx = this as Framework

  Object.entries(properties).map(([name, value]) => {
    const ClassObj = value[0]
    const param = value[1]
    ctx[`${name}`] = new ClassObj(param)
  })

  ctx.success(
    `Assigned ${Object.keys(properties).length} classes`,
  )
}
