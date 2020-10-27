import * as babel from './babel'
import {babelConfig} from './api'

export const boot = (instance: Framework.Bud): void => {
  instance.build.mergeRule('js', {
    use: [instance.build.getItem('babel')],
  })

  Object.assign(instance, {
    babel: babelConfig(instance).init(),
  })
}

export const registerItem = [babel.ident, babel]

export const registerLoader = [
  'babel',
  require.resolve('babel-loader'),
]
