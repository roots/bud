import type {Extension} from '@roots/bud-framework'

import {isEqual, isFunction, nanoid} from './use.dependencies'

/**
 * Returns true if extensions appears to be a WebpackPlugin constructor
 *
 * @param extensions - Extensions to check
 * @returns True if extensions appears to be a WebpackPlugin constructor
 *
 * @example
 * ```ts
 * isWebpackPlugin(new WebpackPlugin())
 * // => true
 * ```
 *
 * @internal
 */
export const isWebpackPlugin = (
  extension:
    | Extension.Module
    | Extension.CompilerPlugin
    | Extension.ApplyPlugin,
): boolean =>
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
export const hasValidConstructorName = ({
  constructor,
}:
  | Extension.Module
  | Extension.CompilerPlugin
  | Extension.ApplyPlugin): boolean =>
  constructor?.name &&
  typeof constructor.name == 'string' &&
  constructor.name !== 'default' &&
  constructor.name !== 'Object'

/**
 * Generates a unique name for extensions which do not
 * have a name prop or constructor name
 *
 * @param extensions - Extensions to check
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
export const generateName = (
  input:
    | Extension.Module
    | Extension.ApplyPlugin
    | Extension.CompilerPlugin,
) =>
  hasValidConstructorName(input)
    ? input.constructor.name
    : nanoid(4)
