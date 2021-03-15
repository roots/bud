import {Framework} from '@roots/bud-framework'

export const tailwind: Framework.Tailwind.Configure = function (
  config = null,
) {
  this.postcss.setPlugin(['tailwindcss', config])

  if (this.postcss.enabled.includes('postcss-import')) {
    this.postcss.enable([
      ...this.postcss.enabled.splice(
        0,
        this.postcss.enabled.indexOf('postcss-import') + 1,
      ),
      'tailwindcss',
      ...this.postcss.enabled,
    ])

    return this
  }

  this.postcss.enable(['tailwindcss', ...this.postcss.enabled])

  return this
}
