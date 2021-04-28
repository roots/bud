import './interface'

import {Framework, Module} from '@roots/bud-framework'
import {MdxConfig} from './api'

/**
 * Extension name
 */
export const name: Module['name'] = '@roots/bud-mdx'

/**
 * Extension boot
 */
export const boot: Module['boot'] = (app: Framework) => {
  /**
   * Mdx config
   */
  Object.assign(app, {
    mdx: new MdxConfig({app}),
  })

  /**
   * RegExp for mdx
   */
  app.store
    .set('patterns.mdx', /\.mdx$/)

    /**
     * loader/mdx
     */
    .publish({
      'loader/mdx': () => require.resolve('@mdx-js/loader'),
    })

    /**
     * item/mdx
     */
    .publish({
      'item/mdx': (mdx = {}) => ({
        ...mdx,
        loader: app.subscribe('item/mdx/loader'),
        options: app.subscribe('item/mdx/options'),
      }),
      'item/mdx/loader': () => app.subscribe('loader/mdx'),
      'item/mdx/options': () => app.mdx.options,
    })

    /**
     * rule/mdx
     */
    .publish({
      'rule/mdx': (mdx = {}) => ({
        ...mdx,
        test: ({store}) => store.get('patterns.mdx'),
        exclude: ({store}) => store.get('patterns.modules'),
        use: ({subscribe}: Framework) => [
          subscribe('item/babel'),
          subscribe('item/mdx'),
        ],
      }),
    })

    /**
     * .mdx extension
     */
    .hooks.on(
      'build/resolve/extensions',
      (exts: `.${string}`[]) => [...exts, '.mdx'],
    )
}
