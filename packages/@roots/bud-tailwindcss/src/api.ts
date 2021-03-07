import {Framework} from '@roots/bud-framework'

export const tailwind: Framework.Tailwind.Configure = function (
  config,
) {
  this.postcss.setPlugin([
    'tailwindcss',
    require('tailwindcss')(config),
  ])

  this.when(
    this.isProduction,
    ({postcss}) =>
      postcss.enable([
        'postcss-import',
        'tailwindcss',
        'postcss-nested',
        'postcss-custom-properties',
        'preset-env',
        'cssnano',
      ]),
    ({postcss}) =>
      postcss.enable([
        'postcss-import',
        'tailwindcss',
        'postcss-nested',
        'postcss-custom-properties',
        'preset-env',
      ]),
  )

  return this
}
