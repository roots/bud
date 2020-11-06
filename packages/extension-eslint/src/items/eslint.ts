export const ident: Framework.Item['ident'] = 'eslint'

export const loader: Framework.Item['loader'] = 'eslint'

export const options: Framework.Item['options'] = ({
  extensions,
}: Framework.Bud) => extensions.getOptions('@roots/bud-eslint')
