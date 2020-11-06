import * as syntax from 'postcss-scss'

export const ident: Framework.Item['ident'] = 'postcss-sass'

export const loader: Framework.Item['loader'] = 'postcss'

export const options: Framework.Item['options'] = (
  bud: Framework.Bud,
) => {
  const project = bud.disk.get('project')

  const config = project.has('postcss.config.js')
    ? project.get('postcss.config.js')
    : false

  if (config) {
    return {
      postcssOptions: {
        config,
      },
    }
  }

  return {
    postcssOptions: {
      syntax,
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
