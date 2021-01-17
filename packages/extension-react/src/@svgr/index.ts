import type {Module, Rule, Framework} from '@roots/bud-typings'

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
    test(app: Framework): RegExp {
      return app.store.get('patterns.svg')
    },
    use(app: Framework): Rule[] {
      return [app.build.get('items.svgr')]
    },
  },
]
