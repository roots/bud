import type {Framework} from '@roots/bud-framework'
import type {PostCssConfig} from '@roots/bud-postcss'
import {TailwindConfig} from 'tailwindcss/tailwind-config'

interface tailwindConfig {
  (this: Framework, config?: TailwindConfig): Framework
}

function tailwindConfig(
  this: Framework,
  config?: TailwindConfig,
): Framework {
  // sometimes jest fails to recognize this interface overload
  const postcss = this.postcss as PostCssConfig

  postcss.setPlugins({
    'postcss-import': this.postcss.plugins['postcss-import'],
    tailwindcss: [
      require('tailwindcss'),
      config ?? this.path('project', 'tailwind.config.js'),
    ],
    'postcss-nested': this.postcss.plugins['postcss-nested'],
    'postcss-preset-env':
      this.postcss.plugins['postcss-preset-env'],
  })

  return this
}

export {tailwindConfig}
