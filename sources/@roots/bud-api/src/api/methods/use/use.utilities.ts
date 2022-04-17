import {lodash, nanoid} from '@roots/bud-support'

import type {Definition} from './'

const {isEqual, isFunction} = lodash

/**
 * Returns true if extensions appears to be a Plugin constructor
 *
 * @param extension - Extension to check
 * @returns True if extension appears to be a Plugin constructor
 *
 * @example
 * ```ts
 * isPlugin(Plugin)
 * // => true
 * ```
 *
 * @internal
 */
export const isPlugin = (extension: Definition): boolean =>
  extension.apply &&
  isFunction(extension.apply) &&
  !isEqual(extension.apply.toString(), '[native code]')

/**
 * Returns true if extensions appears to have a valid name
 *
 * @param extensions - Extensions to check
 * @returns True if extensions appears to have a valid name
 *
 * @example
 * ```ts
 * isValidName(new WebpackPlugin())
 * // => true
 * ```
 *
 * @internal
 */
export const hasValidConstructorName = (input: Definition): boolean =>
  input?.constructor?.name &&
  typeof input.constructor.name == 'string' &&
  input.constructor.name !== 'default' &&
  input.constructor.name !== 'Object'

/**
 * Generates a unique name for extensions which do not
 * have a name prop or constructor name
 *
 * @param input - Extensions to check
 * @returns Unique name for extensions which do not
 * have a name prop or constructor name
 *
 * @example
 * ```ts
 * generateUniqueName(new WebpackPlugin())
 * // => 'x1240_234j__11f...'
 * ```
 *
 * @internal
 */
export const generateName = (input: Definition) =>
  hasValidConstructorName(input) ? input.constructor.name : nanoid(4)
