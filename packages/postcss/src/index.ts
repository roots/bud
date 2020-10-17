import * as PostCss from './typings'
export type {PostCss}

export {boot} from './boot'

export const registerLoader: PostCss.Adapter['registerLoader'] = [
  'postcss',
  require.resolve('postcss-loader'),
]

export * as registerItems from './registerItems'

export * as api from './api'
