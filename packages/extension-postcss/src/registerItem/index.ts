export const ident: Framework.Item['ident'] = 'postcss'

export const loader: Framework.Item['loader'] = 'postcss-loader'

export const options: Framework.Item['options'] = (
  bud: Framework.Bud,
) => {
  const postConfig = bud.fs.has('postcss.config.js')
    ? bud.fs.get('postcss.config.js')
    : false

  if (postConfig) {
    return {
      postcssOptions: {
        config: postConfig,
      },
    }
  }

  return {
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
      ],
    },
  }
}
