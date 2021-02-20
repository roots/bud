import {Bud} from '@roots/bud'
import tailwindcss from 'tailwindcss'

export const tailwind: Bud.Tailwind.Configure = function (
  config,
) {
  this.postcss.setPlugin(['tailwindcss', tailwindcss(config)])

  return this
}
