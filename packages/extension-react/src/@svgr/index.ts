import type {
  RegisterLoader,
  RegisterItem,
  RegisterRule,
} from '../types'

/**
 * @svgr-loader register loader
 */
export const registerLoader: RegisterLoader = [
  '@svgr-loader',
  require.resolve('@svgr/webpack'),
]

/**
 * @svgr-loader register loader
 */
export const registerItem: RegisterItem = [
  '@svgr',
  {
    ident: '@svgr',
    loader: '@svgr-loader',
  },
]

/**
 * @svgr-loader register use
 */
export const registerRule: RegisterRule = [
  '@svgr',
  {
    test: bud => bud.patterns.get('svg'),
    use: bud => [bud.build.items.get('@svgr')],
  },
]
