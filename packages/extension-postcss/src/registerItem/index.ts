export const ident: Framework.Item['ident'] = 'postcss'

export const loader: Framework.Item['loader'] = 'postcss'

export const options: Framework.Item['options'] = (
  bud: Framework.Bud,
) => {
  const project = bud.disk.get('project')
  const postConfig = project.has('postcss.config.js')
    ? project.get('postcss.config.js')
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
