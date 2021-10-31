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
 * isCompilerPlugin(new WebpackPlugin())
 * // => true
 * ```
 *
 * @internal
 */
export const isCompilerPlugin = (
  extension: Extension.Module | Extension.CompilerPlugin,
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
export const hasValidConstructorName = (
  input: Extension.Module | Extension.CompilerPlugin,
): boolean =>
  input?.constructor?.name &&
  typeof input.constructor.name == 'string' &&
  input.constructor.name !== 'default' &&
  input.constructor.name !== 'Object'

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
  input: Extension.Module | Extension.CompilerPlugin,
) =>
  hasValidConstructorName(input)
    ? input.constructor.name
    : nanoid(4)
