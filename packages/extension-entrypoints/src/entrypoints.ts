import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'

export function entrypoints(
  this: Framework,
  options: Module.RawOptions,
): Framework {
  this.extensions
    .get('@roots/bud-entrypoints')
    .mergeStore(options)

  return this
}
