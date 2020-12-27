import {Framework, Module} from '@roots/bud-typings'

export function externals(
  this: Framework,
  options: Module.RawOptions,
): Framework {
  this.extensions
    .get('@roots/bud-wordpress-externals')
    .mergeStore(options)

  return this
}
