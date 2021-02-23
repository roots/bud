import {Framework} from '@roots/bud-framework'
import tailwindcss from 'tailwindcss'

export const tailwind: Framework.Tailwind.Configure = function (
  config,
) {
  this.postcss.setPlugin(['tailwindcss', tailwindcss(config)])

  return this
}
