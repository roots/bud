import type {Module} from '@roots/bud-framework'
import {isArray, isEqual, isFunction} from 'lodash'
import {nanoid} from 'nanoid'

import type {Repository} from '../'

const isWebpackPlugin = (extension: Module): boolean =>
  extension.apply &&
  isFunction(extension.apply) &&
  !isEqual(extension.apply.toString(), '[native code]')

const hasValidConstructorName = ({
  constructor,
}: Module): boolean =>
  constructor?.name &&
  typeof constructor.name == 'string' &&
  constructor.name !== 'default' &&
  constructor.name !== 'Object'

const generateName = (input: Module) =>
  hasValidConstructorName(input)
    ? input.constructor.name
    : nanoid(4)

/**
 * bud.use method
 */
const use: Repository.Use = function (source) {
  const addExtension = (source: Module) => {
    if (!source.name) source.name = generateName(source)

    this.extensions.add(
      isWebpackPlugin(source)
        ? {...source, make: () => source}
        : source,
    )
  }

  !isArray(source)
    ? addExtension(source)
    : source.forEach(addExtension)

  return this
}

export {use}
