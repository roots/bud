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

  const addExtension = (source: Source) => {
    source = isCompilerPlugin(source)
      ? {
          name: source.name ?? generateName(source),
          make: () => source,
        }
      : {
          name: source.name ?? generateName(source),
          ...source,
        }

    if (bud.extensions.has(source.name)) {
      bud.log(`${source.name} already included in compilation`)
      return this
    }

    bud.extensions.add(source)
  }

  if (
    (isString(source) && bud.extensions.has(source)) ||
    (isArray(source) &&
      source.every(isString) &&
      source.every(bud.extensions.has))
  ) {
    source = isArray(source) ? source : [source]

    source.forEach(source =>
      bud.info(
        `extension ${source} already included in compilation. skipping.`,
      ),
    )

    return this
  }

  if (isString(source)) {
    addExtension(require(source))
    return this
  }

  if (isArray(source) && source.every(isString)) {
    source = source.map(s => {
      const extension = require(s)
      addExtension(extension)
    })
    return this
  }

  if (!isArray(source) && !isString(source)) {
    if (source.name && bud.extensions.has(source.name)) {
      bud.log(`${source} already included in compilation`)
      return this
    }

    addExtension(source)
    return this
  }

  source.map(extension => {
    if (extension.name && bud.extensions.has(extension.name)) {
      bud.log(`${source} already included in compilation`)
      return
    }

    addExtension(extension)
  })

  return this
}
