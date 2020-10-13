import * as babel from './babel'

export const registerLoader = [
  'babel',
  require.resolve('babel-loader'),
]

export const registerItem = ['babel', babel]

export const boot = (bud: Framework.Bud): void => {
  const use = item => bud.build.items[item]?.make()

  bud.build.rules.js.use = [
    use('babel'),
    ...bud.build.getRule('js').use,
  ]
}
