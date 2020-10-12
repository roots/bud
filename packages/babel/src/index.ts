import * as babel from './babel'

export const registerLoader = [
  'babel',
  require.resolve('babel-loader'),
]

export const registerItem = ['babel', babel]

export const boot = (bud: Framework.Bud): void => {
  const base = bud.build.rules.js.use(bud)

  bud.build.rules.js.use = (bud: Framework.Bud) => [
    ...base,
    bud.build.items.babel.make(),
  ]
}
