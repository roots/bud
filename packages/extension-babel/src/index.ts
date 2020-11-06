import * as babel from './babel'
import {babelConfig} from './api'

export const api = (instance: Framework.Bud): any => ({
  babel: babelConfig(instance).init(),
})

export const boot = ({build}: Framework.Bud): void =>
  build.rules.set('js.use', [
    build.getItem('babel'),
    ...build.rules.get('js.use'),
  ])

export const registerItem = [babel.ident, babel]

export const registerLoader = [
  'babel',
  require.resolve('babel-loader'),
]
