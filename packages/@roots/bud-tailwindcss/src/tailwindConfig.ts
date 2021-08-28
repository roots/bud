import type {Framework} from '@roots/bud-framework'
import {TailwindConfig} from 'tailwindcss/tailwind-config'

interface tailwindConfig {
  (this: Framework, config?: TailwindConfig): Framework
}

function tailwindConfig(
  this: Framework,
  config?: TailwindConfig,
): Framework {
  this.postcss.setPlugins({
    'postcss-import': this.postcss.plugins['postcss-import'],
    tailwindcss: [
      require.resolve('tailwindcss'),
      config ?? this.path('project', 'tailwind.config.js'),
    ],
    'postcss-nested': this.postcss.plugins['postcss-nested'],
    'postcss-preset-env':
      this.postcss.plugins['postcss-preset-env'],
  })

  return this
}

export {tailwindConfig}
