export const ident: Framework.Item['ident'] = 'eslint'

export const loader: Framework.Item['loader'] = 'eslint'

export const options: Framework.Item['options'] = (
  bud: Framework.Bud,
) => bud.extensions.getOptions('@roots/bud-eslint')
