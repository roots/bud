import {isArray} from './use.dependencies'
import type {Framework, Source} from './use.interface'
import {generateName, isCompilerPlugin} from './use.utilities'

export interface use {
  (source: Source): Promise<Framework>
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
export const use: use = async function (source) {
  const addExtension = async (source: Source) => {
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

    await this.extensions.add(
      isCompilerPlugin(source)
        ? {...source, make: () => source}
        : source,
    )
  }

  !isArray(source)
    ? await addExtension(source)
    : await Promise.all(
        source.map(async ext => await addExtension(ext)),
      )

  return this
}
