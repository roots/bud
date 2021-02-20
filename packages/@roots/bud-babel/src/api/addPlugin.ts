import type {Bud} from '@roots/bud'

export const addPlugin: Bud.Babel.AddPlugin = function (
  this: Bud,
  name,
  opts,
) {
  this.build.mutate('items.babel.options.plugins', plugins => [
    ...plugins,
    [name, opts ?? {}],
  ])

  return this
}
