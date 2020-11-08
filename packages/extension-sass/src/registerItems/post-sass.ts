import * as syntax from 'postcss-scss'

export const ident: Framework.Item['ident'] = 'postcss-sass'

export const loader: Framework.Item['loader'] = 'postcss'

export const options: Framework.Item['options'] = ({
  build,
}: Framework.Bud) => ({
  postcssOptions: {
    ...build.items.get('postcss.options.postcssOptions'),
    syntax,
  },
})
