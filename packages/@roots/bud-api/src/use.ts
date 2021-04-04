import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import {isArray} from '@roots/bud-support'

type Use = (source: Module | Array<Module>) => Framework

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.use [💁 Fluent]
     *
     * Register an extension or set of extensions
     *
     * ### Usage
     *
     * ```js
     * bud.use([
     *   '@roots/bud-babel',
     *   '@roots/bud-react',
     * ])
     * ```
     */
    use: Use
  }

  namespace Framework.Api {
    export {Use}
  }
}

export const use = function (source: Module | Array<Module>) {
  if (!isArray(source)) {
    /**
     * Require/import
     */
    if (source.name) {
      this.extensions.add(source)

      return this
    }

    /**
     * {key: extension}
     */
    Object.entries(source).forEach(extension => {
      this.extensions.add(extension)
    })

    return this
  }

  /**
   * [string, extension]
   */
  if (isArray(source)) {
    source.forEach(extension => {
      this.extensions.add(extension)
    })

    return this
  }

  return this
}
