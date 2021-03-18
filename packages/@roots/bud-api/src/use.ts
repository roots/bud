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
      this.extensions.add(source.name, source)

      return this
    }

    /**
     * {key: extension}
     */
    Object.entries(source).forEach(([name, extension]) => {
      this.extensions.add(name, extension)
    })

    return this
  }

  /**
   * [string, extension]
   */
  if (isArray(source)) {
    if (source.length == 2 && typeof source[0] == 'string') {
      let [name, extension] = source
      this.extensions.add(name, extension)

      return this
    }

    if (!Array.isArray(source[0])) {
      source.forEach(def => {
        this.extensions.add(def.name, def)
      })

      return this
    }
  }

  /**
   * [string, extension][]
   */
  source.forEach(def => {
    if (Array.isArray(def)) {
      let [name, extension] = def
      return this.extensions.add(name, extension)
    }

    if (def.name) {
      return this.extensions.add(def.name, def)
    }

    this.extensions.use(def)
  })

  return this
}
