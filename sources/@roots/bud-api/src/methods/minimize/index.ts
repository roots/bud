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
  /**
   * Handle {@link Bud} instances (when used as a callback for something like bud.tap, bud.promise, etc)
   */
  if (value instanceof Bud) {
    ;[this.minimizers, this.minimizers.js, this.minimizers.css].map(
      minimizer => minimizer.enable(true),
    )
    return this
  }

  /**
   * Handle true, false
   */
  if (typeof value == `boolean`) {
    ;[this.minimizers, this.minimizers.js, this.minimizers.css].map(
      minimizer => minimizer.enable(value),
    )
    return this
  }

  /**
   * For everything else, enable minimization and reset any state by disabling all minimizers
   */
  this.minimizers.enable(true)
  this.minimizers.js.enable(false)
  this.minimizers.css.enable(false)

  /**
   * Handle string (`css`, `js`)
   */
  if (typeof value == `string`) {
    if (!(value in this.minimizers)) {
      throwUndefinedMinimizer()
    }

    this.minimizers[value].enable(true)
    return this
  }

  /**
   * Handle array of strings ([`css`, `js`])
   */
  if (Array.isArray(value)) {
    if (value.some(prop => !(prop in this.minimizers))) {
      throwUndefinedMinimizer()
    }
    value.map(prop => {
      this.minimizers[prop].enable(true)
    })
    return this
  }

  throw ConfigError.normalize(`Error in bud.minimize`, {
    details: `Invalid argument passed to bud.minimize. Value must be a boolean, string, or array of strings.`,
    docs: new URL(`https://bud.js.org/reference/bud.minimize`),
    thrownBy: `@roots/bud-api/methods/minimize`,
  })
}

const throwUndefinedMinimizer = (): never => {
  throw ConfigError.normalize(`Error in bud.minimize`, {
    details: `Invalid argument passed to bud.minimize. Minimizer does not exist.`,
    docs: new URL(`https://bud.js.org/reference/bud.minimize`),
    thrownBy: `@roots/bud-api/methods/minimize`,
  })
}
