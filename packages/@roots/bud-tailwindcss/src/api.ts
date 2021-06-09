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

  const plugins = {...this.postcss.plugins}

  this.discovery.hasPeerDependency('postcss-import')
    ? this.postcss.setPlugins([
        ['postcss-import', null],
        use,
        ...Object.values(plugins),
      ] as any)
    : this.postcss.setPlugins([
        use,
        ...Object.values(plugins),
      ] as any)

  return this
}

export {tailwind}
