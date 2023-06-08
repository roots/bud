import isUndefined from '@roots/bud-support/lodash/isUndefined'
import upperFirst from '@roots/bud-support/lodash/upperFirst'

import type {Extension, InternalOptionsValues, Options} from '../index.js'

/**
 * `@options` is a decorator that adds getter and setter methods
 * for the specified options to an {@link Extension} class.
 *
 * It defines a `get` and `set` function for each key in the provided options object,
 * unless these functions or the key itself is already defined on the {@link Extension} instance.
 *
 * The `get` function retrieves the current value of the option,
 * while the `set` function updates the option's value and returns the {@link Extension} instance for chaining.
 *
 * This allows easy interaction with options in the {@link Extension} class in a uniform manner.
 *
 * @param options - A subset of the options expected in the decorated {@link Extension} class.
 * @returns A class extending the decorated {@link Extension} class, with additional getter and setter methods.
 */
export const options =
  <Opts extends Options = Record<string, unknown>>(
    options: Partial<InternalOptionsValues<Opts>>,
  ) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      /**
       * Extends the constructor to include definitions of getter and setter functions for each option.
       */
      public constructor(...args: any[]) {
        super(...args)

        this._options = Object.assign({}, {...options})

        // Iterate through each key in the provided options object.
        Object.keys(options).forEach(key => {
          // Check if there is no existing property or getter and setter methods for the current option key.
          if (noPropertyDefined(this, key)) {
            // Define a property on the Extension instance with getter and setter methods.
            Object.defineProperty(this, key, {
              get: () => this.getOption(key),
            })
          }

          // Define the name of the setter function for the current option key.
          const setFn = `set${upperFirst(key)}`
          // Check if there is no existing setter method for the current option key.
          if (noPropertyDefined(this, setFn)) {
            // Define a setter method on the Extension instance.
            Object.defineProperty(this, setFn, {
              value: (value: any) => {
                this.setOption(key, value)
                return this
              },
            })
          }

          // Define the name of the getter function for the current option key.
          const getFn = `get${upperFirst(key)}`
          // Check if there is no existing getter method for the current option key.
          if (noPropertyDefined(this, getFn)) {
            // Define a getter method on the Extension instance.
            Object.defineProperty(this, getFn, {
              value: () => this.getOption(key),
            })
          }
        })
      }
    }

/**
 * A helper function that checks whether an object lacks a specific property
 * and its corresponding getter and setter methods.
 *
 * @param obj - The object on which the checks are to be made.
 * @param key - The name of the property to check.
 *
 * @returns A boolean value. True if neither the property, nor its getter or setter methods
 *          exist on the object. False if the object has any of these defined.
 */
const noPropertyDefined = (obj: any, key: string): boolean => {
  // Check if getter method is undefined on the object for the provided key.
  const noGetterDefined = isUndefined(obj[`get ${key}`])
  // Check if setter method is undefined on the object for the provided key.
  const noSetterDefined = isUndefined(obj[`set ${key}`])
  // Check if the property itself is undefined on the object.
  const noPropertyDefined = isUndefined(obj[key])

  // Return true if all of the checks (getter, setter, and the property itself) are undefined,
  // indicating that the property and its getter and setter methods are not defined on the object.
  return [noGetterDefined, noSetterDefined, noPropertyDefined].every(
    Boolean,
  )
}
