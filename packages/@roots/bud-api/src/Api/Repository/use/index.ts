import type {Extension, Framework} from '@roots/bud-framework'

import {
  isArray,
  isEqual,
  isFunction,
} from '../../../services/lodash'
import {nanoid} from '../../../services/nanoid'

/**
 * @public @config
 */
interface use {
  (
    source:
      | Extension.Module
      | Extension.CompilerPlugin
      | Extension.Module,
  ): Framework
}

/**
 * Returns true if extensions appears to be a WebpackPlugin constructor
 */
const isWebpackPlugin = (
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
 */
const hasValidConstructorName = ({
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
 */
const generateName = (
  input:
    | Extension.Module
    | Extension.ApplyPlugin
    | Extension.CompilerPlugin,
) =>
  hasValidConstructorName(input)
    ? input.constructor.name
    : nanoid(4)

/**
 * Register an extension or set of extensions
 *
 * @example
 * Add packaged bud extensions:
 *
 * ```js
 * bud.use([
 *   require('@roots/bud-babel'),
 *   require('@roots/bud-react'),
 * ])
 * ```
 *
 * @example
 * Add an extension inline (also works with an array of extensions):
 *
 * ```js
 * bud.use({
 *  name: 'my-webpack-plugin',
 *  make: () => new MyWebpackPlugin(),
 * })
 * ```
 *
 * @example
 * Add a webpack plugin inline (also work with an array of plugins):
 *
 * ```js
 * bud.use(new MyWebpackPlugin())
 * ```
 *
 * @public @config
 */
const use: use = function (source) {
  const addExtension = (
    source:
      | Extension.Module
      | Extension.CompilerPlugin
      | Extension.ApplyPlugin,
  ) => {
    if (!source.hasOwnProperty('name')) {
      source.name = generateName(source)
    }

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

export {use as default}
