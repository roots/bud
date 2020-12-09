import {Bud, Extension} from '@roots/bud-typings'

export function externals(
  this: Bud,
  options: Extension.RawOptions,
): Bud {
  const externals = this.extensions.get(
    '@roots/bud-wordpress-externals',
  )

  externals.setOptions({
    ...externals.getOptions(),
    ...options,
  })

  return this
}
