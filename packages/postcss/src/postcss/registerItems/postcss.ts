import flexbugs from 'postcss-flexbugs-fixes'
import presetEnv from 'postcss-preset-env'

export const ident: Framework.Item['ident'] = 'postcss'
export const loader: Framework.Item['loader'] = 'postcss'

export const options: Framework.Item['options'] = (
  bud: Framework.Bud,
) => ({
  postcssOptions: {
    config:
      bud.disk.get('project').get('postcss.config.js') ?? false,
    plugins: bud.disk.current.get('postcss.config.js')
      ? false
      : {
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
    sourceMapOptions: null,
    syntax: null,
    parser: null,
    stringifier: null,
  },
})
