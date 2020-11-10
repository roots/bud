export const ident: Framework.Item['ident'] = 'eslint'

export const loader: Framework.Item['loader'] = 'eslint-loader'

export const options: Framework.Item['options'] = ({
  extensions,
}: Framework.Bud) => extensions.get('@roots/bud-eslint')
