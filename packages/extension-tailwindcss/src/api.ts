import {Bud} from '@roots/bud'

export const tailwind: Bud.Tailwind.Configure = function (
  params,
) {
  this.postcss.addPlugin(require('tailwindcss'), params)

  return this
}
