import {Framework} from '@roots/bud-framework'
import tailwindcss from 'tailwindcss'

export const tailwind: Framework.Tailwind.Configure = function (
  config,
) {
  this.postcss.setPlugin(['tailwindcss', tailwindcss(config)])

  this.postcss.enable([
    'postcss-import',
    'tailwindcss',
    'postcss-nested',
    'postcss-custom-properties',
    'postcss-flexbugs-fixes',
    'preset-env',
  ])

  return this
}
