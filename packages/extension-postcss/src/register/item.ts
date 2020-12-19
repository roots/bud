import {Item, Bud} from '@roots/bud-typings'

/**
 * PostCSS identifer
 */
export const ident: Item.Contract['ident'] = 'postcss'

/**
 * PostCSS loader
 */
export const loader: Item.Contract['loader'] = 'postcss-loader'

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
            ['custom-properties']: false,
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
export const options: Item.Contract['options'] = (bud: Bud) => {
  const config = bud.fs.has('postcss.config.js')
    ? bud.fs.get('postcss.config.js')
    : null

  return config ?? fallbackOptions
}
