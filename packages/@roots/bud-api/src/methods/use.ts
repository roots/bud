import {Framework, Module} from '@roots/bud-framework'
import {isArray} from 'lodash'

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

  namespace Api {
    export {Use}
  }
}

type Use = (source: Module | Array<Module>) => Framework

export const use: Use = function (source) {
  if (!isArray(source)) {
    this.extensions.add(source)

    return this
  }

  source.forEach((extension: Module) => {
    this.extensions.add(extension)
  })

  return this
}
