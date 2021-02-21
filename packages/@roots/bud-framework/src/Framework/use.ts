import {Framework} from '../'
import {isArray} from '@roots/bud-support'

export const use: Framework['use'] = function (source) {
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
