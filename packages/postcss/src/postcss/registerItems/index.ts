import flexbugs from 'postcss-flexbugs-fixes'
import presetEnv from 'postcss-preset-env'

export const ident: Framework.Item['ident'] = 'postcss'

export const loader: Framework.Item['loader'] = 'postcss'

export const options: Framework.Item['options'] = (
  bud: Framework.Bud,
) => {
  const project = bud.disk.get('project')
  const postConfig = project.has('postcss.config.js')
    ? project.get('postcss.config.js')
    : false

  const options = {
    postcssOptions: {
      config: postConfig ?? false,
    },
  }

  if (postConfig) {
    return options
  }

  ;(options as any).postcssOptions = {
    ...options.postcssOptions,
    plugins: {
      ['postcss-flexbugs-fixes']: flexbugs,
      ['postcss-preset-env']: [
        presetEnv,
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
    },
  }

  return options
}
