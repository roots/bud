import {Framework, Module} from '@roots/bud-typings'

export function externals(
  this: Framework,
  options: Module.Options,
): Framework {
  this.extensions.merge(
    '@roots/bud-wordpress-externals.options',
    options,
  )

  return this
}
