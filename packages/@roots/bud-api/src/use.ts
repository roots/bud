import {Framework} from '@roots/bud-framework'
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

  namespace Framework.Api {
    export {Use}
  }
}

type Use = (
  source: Framework.Module | Array<Framework.Module>,
) => Framework

export const use: Use = function (source) {
  if (!isArray(source)) {
    this.extensions.add(source)

    return this
  }

  source.forEach((extension: Framework.Module) => {
    this.extensions.add(extension)
  })

  return this
}
