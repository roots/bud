import type {Api} from '@roots/bud-framework'
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
    use: Api.Use
  }

  namespace Api {
    type Use = (source: any | Array<any>) => Framework
  }
}

const use: Api.Use = function (source) {
  if (!isArray(source)) {
    this.extensions.add(source)
    return this
  }

  source.forEach(extension => {
    this.extensions.add(extension)
  })

  return this
}

export {use}
