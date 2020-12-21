import {Framework, Module} from '@roots/bud-typings'

export function externals(
  this: Framework,
  options: Module.RawOptions,
): Framework {
  const externals = this.extensions.get(
    '@roots/bud-wordpress-externals',
  )

  externals.setOptions({
    ...externals.getOptions(),
    ...options,
  })

  return this
}
