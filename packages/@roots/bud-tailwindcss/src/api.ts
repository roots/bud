import {Tailwind} from './interface'

const tailwind: Tailwind.Configure = function (
  config: Omit<Tailwind.Config, null> = null,
  implementation:
    | 'tailwindcss'
    | '@tailwindcss/jit' = 'tailwindcss',
) {
  config = config ?? null

  if (this.postcss.plugins['postcss-import']) {
    delete this.postcss.plugins['postcss-import']

    this.postcss.setPlugins([
      'postcss-import',
      [implementation, config],
      ...Object.values(this.postcss.plugins),
    ])
  } else {
    this.postcss.setPlugins([
      [implementation, config],
      ...Object.values(this.postcss.plugins),
    ])
  }

  return this
}

export {tailwind}
