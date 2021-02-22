import {Framework} from '@roots/bud-framework'

export const addPlugin: Framework.Babel.AddPlugin = function (
  name,
  opts,
) {
  this.build.mutate('items.babel.options.plugins', plugins => [
    ...plugins,
    [name, opts ?? {}],
  ])

  return this
}
