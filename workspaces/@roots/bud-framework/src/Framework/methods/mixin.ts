import type {Class} from 'type-fest'

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
 * Bind a class named `FooClass` and expose `app.propertyName`:
 *
 * ```js
 * app.mixin({propertyName: [FooClass]})
 * ```
 *
 * Specify constructor parameters with a tuple:
 *
 * ```js
 * app.mixin({
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
  Object.entries(properties).map(
    ([name, [ClassObj, ...params]]) => {
      this[name] = new ClassObj(...params)

      if (!(this[name] instanceof ClassObj)) {
        this.error(
          `${name} not properly bound to ${this.name} framework instance`,
        )
        this.dump(this.name)
        this.dump(ClassObj)
      }
    },
  )
}
