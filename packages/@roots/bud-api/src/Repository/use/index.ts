import {isArray, isString} from './use.dependencies'
import type {Framework, Source} from './use.interface'
import {generateName, isCompilerPlugin} from './use.utilities'

export interface use {
  (source: Source): Framework
}

/**
 * Register an extension or set of extensions
 *
 * @remarks
 * This function is used to register an extension or set of extensions.
 *
 *  - If the extension is a webpack plugin, it will be registered as a webpack plugin
 *
 *  - If the extension is an array of extensions, they will be registered as webpack plugins
 *
 * @example
 * Add packaged bud extensions
 *
 * ```ts
 * bud.use([
 *   require('@roots/bud-babel'),
 *   require('@roots/bud-react'),
 * ])
 * ```
 *
 * @example
 * Add a bud extension inline

 * ```ts
 * bud.use({
 *  name: 'my-webpack-plugin',
 *  make: () => new MyWebpackPlugin(),
 * })
 * ```
 *
 * @example
 * Add a webpack plugin inline
 *
 * ```ts
 * bud.use(new MyWebpackPlugin())
 * ```
 *
 * @public
 */
export const use: use = function (
  source: Source | string | Array<string>,
): Framework {
  const bud = this as Framework

  if (isString(source) && bud.extensions.has(source)) {
    bud.log(source, 'Extension already included in compilation')
    return this
  }

  if (bud.cache.valid) {
    if (isString(source)) {
      bud.log(source, 'Cached extension. Skipping require.')
      return this
    }

    if (isArray(source) && source.every(isString)) {
      bud.log(source, 'Cached extensions. Skipping require.')
      return this
    }
  }

  if (isArray(source) && source.every(isString)) {
    source = source.map(s => require(s))
  }

  const addExtension = (source: Source) => {
    if (!source.hasOwnProperty('name')) {
      source.name = generateName(source)
    }

    const isPlugin = isCompilerPlugin(source)
    bud.log(
      `Registering ${
        isPlugin ? 'compiler plugin' : 'extension'
      }`,
      source.name,
    )

    bud.extensions.add(
      isCompilerPlugin(source)
        ? {...source, make: () => source}
        : source,
    )
  }

  if (isString(source)) {
    addExtension(require(source))
    return this
  }

  if (!isArray(source) && !isString(source)) {
    addExtension(source)
    return this
  }

  source.map(addExtension)

  return this
}
