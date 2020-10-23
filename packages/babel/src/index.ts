import * as babel from './babel'
import {config} from './api'

export const registerLoader = [
  'babel',
  require.resolve('babel-loader'),
]

export const registerItem = ['babel', babel]

export const boot = (bud: Framework.Bud): void => {
  bud.build.mergeRule('js', {
    use: [bud.build.getItem('babel')],
  })

  Object.assign(bud, {babel: config(bud).init()})
}
