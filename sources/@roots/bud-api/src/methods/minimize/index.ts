import {Bud} from '@roots/bud-framework'
import {ConfigError} from '@roots/bud-support/errors'

export type Parameters = [
  (`css` | `js` | Array<`css` | `js`> | boolean | Bud)?,
]

/**
 * Minimize function interface
 */
export interface minimize {
  (...parameters: Parameters): Bud
}

export const minimize: minimize = function (this: Bud, value = true) {
  if (value instanceof Bud) {
    this.minimizers.enable(true)
    this.minimizers.js.enable(true)
    this.minimizers.css.enable(true)
    return this
  }

  if (typeof value == `boolean`) {
    this.minimizers.enable(value)
    this.minimizers.js.enable(value)
    this.minimizers.css.enable(value)
    return this
  }

  if (typeof value == `string`) {
    this.minimizers.enable(true)
    this.minimizers[value].enable(true)
    return this
  }

  if (Array.isArray(value)) {
    this.minimizers.enable(true)
    value.map(key => {
      this.minimizers[key].enable(true)
    })
    return this
  }

  throw ConfigError.normalize(`Error in bud.minimize`, {
    details: `Invalid argument passed to bud.minimize. Value must be a boolean, string, or array of strings.`,
    docs: new URL(`https://bud.js.org/reference/bud.minimize`),
    thrownBy: `@roots/bud-api/methods/minimize`,
  })
}
