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
    bud.info(
      `cached extension ${source} already included in compilation`,
    )
    return this
  }

  if (bud.cache.valid) {
    if (isString(source)) {
      bud.info(
        `cached extension ${source} imported as an esmodule`,
      )

      return this
    }

    if (isArray(source) && source.every(isString)) {
      source.forEach(name =>
        bud.info(
          `cached extension ${name} imported as an esmodule`,
        ),
      )

      return this
    }
  }

  if (isArray(source) && source.every(isString)) {
    source = source.map(s => {
      bud.log(`requiring ${s}`)
      require(s)
    })
  }

  const addExtension = (source: Source) => {
    if (!source.hasOwnProperty('name')) {
      source.name = generateName(source)
    }

    const extension = isCompilerPlugin(source)
      ? {...source, make: () => source}
      : source

    bud.log(`registering ${extension.name}`)
    bud.extensions.add(extension)
  }

  if (isString(source)) {
    addExtension(require(source))
    return this
  }

  if (!isArray(source) && !isString(source)) {
    if (bud.extensions.has(source.name)) {
      bud.log(`${source} already included in compilation`)
      return this
    }

    addExtension(source)

    return this
  }

  source.map(extension => {
    if (bud.extensions.has(extension.name)) {
      bud.log(`${source} already included in compilation`)
      return
    }

    addExtension(extension)
  })

  return this
}
