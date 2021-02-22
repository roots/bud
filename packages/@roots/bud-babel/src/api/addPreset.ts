import type {Framework} from '@roots/bud-framework'

export const addPreset: Framework.Babel.AddPreset = function (
  name,
  opts,
) {
  this.build.mutate('items.babel.options.presets', presets => [
    ...presets,
    [name, opts ?? {}],
  ])

  return this
}
