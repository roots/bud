import * as babel from './babel'

export const registerLoader = [
  'babel',
  require.resolve('babel-loader'),
]

export const registerItem = ['babel', babel]

export const boot = (bud: Framework.Bud): void => {
  const base = bud.components['rules'].get('js.use')(bud)

  bud.components['rules'].set('js.use', (bud: Framework.Bud) => [
    ...base,
    bud.components['items'].get('babel').make(),
  ])
}
