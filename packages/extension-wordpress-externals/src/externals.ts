import {Bud, Extension} from '@roots/bud-typings'

export function externals(
  this: Bud.Bud,
  options: Extension.RawOptions,
): Bud.Bud {
  const externals = this.extensions.get(
    '@roots/bud-wordpress-externals',
  )

  externals.setOptions({
    ...externals.getOptions(),
    ...options,
  })

  return this
}
