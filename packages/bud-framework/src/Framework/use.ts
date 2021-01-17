import type {Extension, MaybeCallable} from '@roots/bud-typings'
import {isArray, isString} from '@roots/bud-support'

export const use = function (
  source: MaybeCallable<
    | string
    | string[]
    | [string, Extension]
    | [string, Extension][]
    | {[key: string]: Extension}
    | Extension
    | Extension[]
  >,
) {
  let definition:
    | string
    | string[]
    | [string, Extension]
    | [string, Extension][]
    | {
        [key: string]: Extension
      }
    | Extension
    | Extension[]

  /**
   * (app: Framework) => ... ?
   */
  definition = this.access(source)

  /**
   * string
   */
  if (isString(definition)) {
    this.extensions.use(definition)

    return this
  }

  if (!isArray(definition)) {
    /**
     * Require/import
     */
    if (!isString(definition) && definition.name) {
      this.extensions.add(definition.name, definition)

      return this
    }

    /**
     * {key: extension}
     */
    Object.entries(definition).forEach(([name, extension]) => {
      this.extensions.add(name, extension)
    })

    return this
  }

  /**
   * [string, extension]
   */
  if (isArray(definition)) {
    if (
      definition.length == 2 &&
      typeof definition[1] !== 'string'
    ) {
      let [name, extension] = definition
      this.extensions.add(name, extension)

      return this
    }
  }

  /**
   * string[] or [string, extension][]
   */
  definition.forEach(def => {
    if (Array.isArray(def)) {
      let [name, extension] = def
      return this.extensions.add(name, extension)
    }

    if (def.name) {
      return this.extensions.add(def.name, def)
    }

    this.extensions.use(def)
  })

  return this
}
