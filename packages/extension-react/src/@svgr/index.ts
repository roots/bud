import type {Module, Rule, Framework} from '@roots/bud-typings'

/**
 * @svgr-loader register loader
 */
export const setLoaders: Module['setLoaders'] = [
  '@svgr-loader',
  require.resolve('@svgr/webpack'),
]

/**
 * @svgr-loader register loader
 */
export const setItems: Module['setItems'] = [
  '@svgr',
  {
    ident: '@svgr',
    loader: '@svgr-loader',
  },
]

/**
 * @svgr-loader register use
 */
export const setRules: Module['setRules'] = [
  '@svgr',
  {
    test({store}: Framework): RegExp {
      return store.get('patterns.svg')
    },
    use({build}: Framework): Rule[] {
      return [build.items.get('@svgr')]
    },
  },
]
