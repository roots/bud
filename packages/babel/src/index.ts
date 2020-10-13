import * as babel from './babel'
import type {RuleSetUse} from 'webpack'

export const registerLoader = [
  'babel',
  require.resolve('babel-loader'),
]

export const registerItem = ['babel', babel]

export const boot = (bud: Framework.Bud): void => {
  bud.build.mergeRule('js', {
    use: [
      bud.build.getItem('babel'),
      ...(bud.build.getRule('js').use as RuleSetUse[]),
    ],
  })
}
