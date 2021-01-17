import {assignPostCss} from './api'
import {Bud} from '@roots/bud'
import {FileContainer} from '@roots/bud-typings'

/**
 * Types
 */
export * from './types'

/**
 * Extension name
 */
export const name = '@roots/bud-postcss'

/**
 * Fallback options if no postcss.config.js is found.
 */
const defaultOptions = {
  postcssOptions: {
    plugins: [
      'postcss-flexbugs-fixes',
      [
        'postcss-preset-env',
        {
          autoprefixer: {
            flexbox: 'no-2009',
          },
          features: {
            [`custom-properties`]: false,
          },
          stage: 3,
        },
      ],
      'postcss-nested',
    ],
  },
}

/**
 * Register postcss RuleSet item
 */
export const setItems = (app: Bud) => {
  const options = app.disk
    .get<FileContainer>('project')
    .exists('postcss.config.js')
    ? {
        config: app.disk
          .get<FileContainer>('project')
          .get(`postcss.config.js`),
      }
    : {...defaultOptions}

  return [
    'postcss',
    {
      ident: 'postcss',
      loader: require.resolve('postcss-loader'),
      options,
    },
  ]
}

/**
 * Replace default css implementation
 */
export const boot = (bud: Bud) => {
  bud = assignPostCss(bud)

  bud.build.set('rules.css.use', [
    bud.options.is('mode', 'production')
      ? bud.build.get('items.minicss')
      : bud.build.get('items.style'),
    bud.build.get('items.css'),
    bud.build.get('items.postcss'),
  ])
}
