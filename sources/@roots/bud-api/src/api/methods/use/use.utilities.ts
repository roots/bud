import type {Extension} from '@roots/bud-framework'
import {lodash, nanoid} from '@roots/bud-support'

const {isEqual, isFunction} = lodash

/**
 * Returns true if extensions appears to be a WebpackPlugin constructor
 *
 * @param extension - Extension to check
 * @returns True if extension appears to be a WebpackPlugin constructor
 *
 * @example
 * ```ts
 * isPlugin(new WebpackPlugin())
 * // => true
 * ```
 *
 * @internal
 */
export const isPlugin = (extension: Extension.Module): boolean =>
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
export const hasValidConstructorName = (
  input: Extension.Module | Extension.Plugin,
): boolean =>
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
export const generateName = (input: Extension.Module | Extension.Plugin) =>
  hasValidConstructorName(input) ? input.constructor.name : nanoid(4)
