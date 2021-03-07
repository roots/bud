import {Framework} from '@roots/bud-framework'

export const tailwind: Framework.Tailwind.Configure = function (
  config,
) {
  this.postcss.setPlugin([
    'tailwindcss',
    require('tailwindcss')(config),
  ])

  this.postcss.enabled = this.postcss.enabled.includes(
    'postcss-import',
  )
    ? [
        ...this.postcss.enabled.splice(
          0,
          this.postcss.enabled.indexOf('postcss-import') + 1,
        ),
        'tailwindcss',
        ...(this.postcss.enabled.indexOf('postcss-import') + 1),
      ]
    : ['tailwindcss', ...this.postcss.enabled]

  return this
}
