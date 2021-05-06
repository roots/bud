import {Tailwind} from '@roots/bud-framework'

export const tailwind: Tailwind.Configure = function (
  config: Omit<Tailwind.Config, null> = null,
  implementation:
    | 'tailwindcss'
    | '@tailwindcss/jit' = 'tailwindcss',
) {
  config = config ?? this.postcss.plugins[implementation]

  if (this.postcss.plugins['postcss-import']) {
    delete this.postcss.plugins['postcss-import']

    this.postcss.setPlugins([
      'postcss-import',
      [implementation, config],
      ...Object.values(this.postcss.plugins),
    ])
  } else {
    this.postcss.setPlugins([
      implementation,
      ...Object.values(this.postcss.plugins),
    ])
  }

  return this
}
