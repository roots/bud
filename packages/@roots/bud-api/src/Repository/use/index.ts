import {isArray} from './use.dependencies'
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
export const use: use = function (source) {
  const addExtension = (source: Source) => {
    if (!source) {
      this.error(`extension source is not defined. skipping`)
    }

    if (!source.hasOwnProperty('name')) {
      source.name = generateName(source)
    }

    if (this.extensions.has(source.name)) {
      this.warn(
        `extension "${source.name}" is already registered. skipping`,
      )

      return this
    }

    this.extensions.add(
      isCompilerPlugin(source)
        ? {...source, make: () => source}
        : source,
    )

    const controller = this.extensions.get(source.name)

    return (
      !controller.registered &&
      controller.register(this).then(() => {
        return this
      })
    )
  }

  !isArray(source)
    ? addExtension(source)
    : source.forEach(addExtension)

  return this
}
