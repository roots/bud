import {Bud} from '@roots/bud-typings'
import {TransformOptions} from '@babel/core'

/**
 * Set babel transformOptions
 */
export function setConfig(opts: TransformOptions): Bud.App {
  this.build.items.set('babel.options', opts)

  return this
}
