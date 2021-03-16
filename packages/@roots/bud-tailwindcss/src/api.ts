import {Framework} from '@roots/bud-framework'

export const tailwind: Framework.Tailwind.Configure = function (
  config: Omit<Framework.Tailwind.Config, null> = null,
  implementation:
    | 'tailwindcss'
    | '@tailwindcss/jit' = 'tailwindcss',
) {
  this.postcss.setPlugin([implementation, config])

  if (this.postcss.enabled.includes('postcss-import')) {
    this.postcss.enable([
      ...this.postcss.enabled.splice(
        0,
        this.postcss.enabled.indexOf('postcss-import') + 1,
      ),
      implementation,
      ...this.postcss.enabled,
    ])

    return this
  }

  this.postcss.enable([implementation, ...this.postcss.enabled])

  return this
}
