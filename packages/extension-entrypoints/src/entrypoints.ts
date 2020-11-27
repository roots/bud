import {Bud, Extension} from '@roots/bud-typings'

export function entrypoints(
  this: Bud.Bud,
  options: Extension.RawOptions,
): Bud.Bud {
  const entrypoints = this.extensions.get(
    '@roots/bud-entrypoints',
  )

  entrypoints.setOptions({
    ...entrypoints.getOptions(),
    ...options,
  })

  return this
}
