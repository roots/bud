import {Framework} from '@roots/bud-framework'

export const terser: Framework.Terser.Configure = function (
  options,
) {
  this.options.enable('minify')

  this.extensions.get('terser').merge('options', options)

  return this
}
