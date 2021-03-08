import {Framework} from '@roots/bud-framework'

export const tailwind: Framework.Tailwind.Configure = function (
  config = null,
) {
  this.postcss.setPlugin([
    'tailwindcss',
    require('tailwindcss')(config),
  ])

  const enabled = this.postcss.enabled
  const usingPostCssImport = enabled.includes('postcss-import')

  this.postcss.enable(
    usingPostCssImport
      ? (() => {
          const i = enabled.indexOf('postcss-import') + 1
          const pre = enabled.slice(0, i)
          const post = enabled.slice(i)

          return [...pre, 'tailwindcss', ...post]
        })()
      : [...enabled, 'tailwindcss'],
  )

  return this
}
