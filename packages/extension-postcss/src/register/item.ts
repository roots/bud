import {Item, Framework} from '@roots/bud-typings'

/**
 * PostCSS identifer
 */
export const ident: Item.Module.Ident = 'postcss'

/**
 * PostCSS loader
 */
export const loader: Item.Module.Loader = 'postcss-loader'

/**
 * Fallback options if no postcss.config.js is found.
 */
const fallbackOptions = {
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
 * Postcss options
 */
export const options: Item.Module.Options = (bud: Framework) => {
  const config = bud.disk.get('project').has('postcss.config.js')
    ? bud.disk.get('project').get('postcss.config.js')
    : null

  return config ?? fallbackOptions
}
