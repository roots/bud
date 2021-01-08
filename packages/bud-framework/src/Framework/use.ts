import type {Use} from '@roots/bud-typings'
import {
  isArray,
  isArrayLike,
  isEqual,
  isObject,
  isString,
} from '@roots/bud-support'
import {Framework, Module} from '@roots/bud-typings'

export const use: Use = function (
  this: Framework,
  extensions: Module.Registrable.Source,
) {
  if (isString(extensions)) {
    this.extensions.use(extensions)
    return this
  }

  const isArrayed = isArray(extensions[0])

  const isObjectDefinition =
    isObject(extensions) && !isArrayLike(extensions)

  if (isArrayed) {
    /**
     * Single import ['@roots/bud-sass]
     */
    const isSingleImport =
      isEqual(extensions[0].length, 1) && // is only one item in array
      isString(extensions[0]) // it is a string

    isSingleImport && this.extensions.use(extensions as string)

    /**
     * Multiple tuple [`personalPlugin`, {options: {meh}}]
     */
    const isMultiTuple =
      isEqual(extensions[0].length, 2) && // has aname and a registrable
      isString(extensions[0]) // is a string

    isMultiTuple &&
      (extensions as [string, Module][]).forEach(module => {
        this.extensions.set(...module)
      })

    return this
  }

  if (isObjectDefinition) {
    Object.entries(
      extensions as {[key: string]: Module.Registrable},
    ).forEach(([name, ext]: [string, Module.Registrable]) =>
      this.extensions.set(name, ext),
    )
  }

  return this
}
