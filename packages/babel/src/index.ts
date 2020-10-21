import * as babel from './babel'

export const registerLoader = [
  'babel',
  require.resolve('babel-loader'),
]

export const registerItem = ['babel', babel]

export const boot = (bud: Framework.Bud): void => {
  bud.build.mergeRule('js', {
    use: [bud.build.getItem('babel')],
  })
}
