export const ident: Build.Item['ident'] = 'eslint'

export const loader: Build.Item['loader'] = 'eslint'

export const options: Build.Item['options'] = (
  bud: Framework.Bud,
) => bud.extensions.getOptions('@roots/bud-eslint')
