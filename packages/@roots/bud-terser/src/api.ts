import {Framework} from '@roots/bud-framework'

export const terser: Framework.Terser.Configure = function (
  options,
) {
  this.store.enable('options.minify')

  this.publish({
    'extension/terser/options': () => options,
  })

  return this
}
