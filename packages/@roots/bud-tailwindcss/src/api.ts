import type {Tailwind} from './interface'

const tailwind: Tailwind.Configure = function (config) {
  this.postcss.setPlugins([
    'postcss-import',
    [
      'tailwindcss',
      config ?? this.path('project', 'tailwind.config.js'),
    ],
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

export {tailwind}
