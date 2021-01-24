import {Bud} from '@roots/bud'

/**
 * @svgr-loader register loader
 */
export const setItems: Bud.Module['setItems'] = [
  'svgr',
  {loader: require.resolve('@svgr/webpack')},
]

/**
 * @svgr-loader register use
 */
export const setRules: Bud.Module['setRules'] = [
  'svg',
  {
    test(app: Bud): RegExp {
      return app.store.get('patterns.svg')
    },
    use(app: Bud): Bud.Rule[] {
      return [app.build.get('items.svgr')]
    },
  },
]
