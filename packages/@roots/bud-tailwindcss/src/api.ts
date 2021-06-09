import {Tailwind} from './interface'
import {Framework} from '@roots/bud-framework'

const tailwind: Tailwind.Configure = function (
  this: Framework,
  implementation:
    | 'tailwindcss'
    | '@tailwindcss/jit' = 'tailwindcss',
  config?: Omit<Tailwind.Config, null> | string,
) {
  const use: [
    'tailwindcss' | '@tailwindcss/jit',
    (Omit<Tailwind.Config, null> | string)?,
  ] = [
    implementation,
    config ?? this.path('project', 'tailwind.config.js'),
  ]

  const plugins = [use, ...Object.values(this.postcss.plugins)]
  if (this.postcss.plugins['postcss-import']) {
    delete this.postcss.plugins['postcss-import']

    this.postcss.setPlugins([
      'postcss-import',
      ...plugins,
    ] as any)
  } else {
    this.postcss.setPlugins([use, ...plugins] as any)
  }

  return this
}

export {tailwind}
