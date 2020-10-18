export {boot} from './boot'

export const registerLoader: Framework.Extension['registerLoader'] = [
  'postcss',
  require.resolve('postcss-loader'),
]

export * as registerItems from './registerItems'

export * as api from './api'
