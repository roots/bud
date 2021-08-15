import type {Framework} from '@roots/bud-framework'
import {TailwindConfig} from 'tailwindcss/tailwind-config'

interface tailwindConfig {
  (this: Framework, config?: TailwindConfig): Framework
}

function tailwindConfig(
  this: Framework,
  config?: TailwindConfig,
): Framework {
  this.postcss.setPlugins([
    'postcss-import',
    ['tailwindcss', this.path('project', 'tailwind.config.js')],
    'postcss-nested',
    [
      'postcss-preset-env',
      {
        stage: 1,
        features: {
          'focus-within-pseudo-class': false,
        },
      },
    ],
  ])

  return this
}

export default tailwindConfig
