import {Module} from '@roots/bud-typings'

/**
 * @svgr-loader register loader
 */
export const setItems: Module['setItems'] = [
  'svgr',
  {loader: require.resolve('@svgr/webpack')},
]

/**
 * @svgr-loader register use
 */
export const setRules: Module['setRules'] = [
  'svg',
  {
    test: ({store}) => store.get('patterns.svg'),
    use: ({build}) => [build.get('items.svgr')],
  },
]
