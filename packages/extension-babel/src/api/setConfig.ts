import {Framework} from '@roots/bud-typings'
import {TransformOptions} from '@babel/core'

/**
 * Set babel transformOptions
 */
export function setConfig(
  this: Framework,
  opts: TransformOptions,
): Framework {
  this.build.items.set('babel.options', opts)

  return this
}
