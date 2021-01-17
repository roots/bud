import type {Bud} from '@roots/bud'

export const addPreset: Bud.Babel.AddPreset = function (
  this: Bud,
  name,
  opts,
): Bud {
  this.build.mutate('items.babel.options.presets', presets => [
    ...presets,
    [name, opts ?? {}],
  ])

  return this
}
