import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
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
   * PostCss configurator.
   */
  const mdx = new MdxConfig({app})

  Object.assign(app, {mdx})

  app.store
    .set('patterns.mdx', /\.mdx$/)

    /**
     * Add @mdx-js/loader
     */
    .publish({
      'loader/mdx': () => require.resolve('@mdx-js/loader'),
    })

    .publish({
      'item/mdx': (mdx = {}) => ({
        ...mdx,
        loader: app.subscribe('item/mdx/loader'),
        options: app.subscribe('item/mdx/options'),
      }),
      'item/mdx/loader': () => app.subscribe('loader/mdx'),
      'item/mdx/options': () => app.mdx.options,
    })

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

    .publish({
      'build/resolve/extensions': exts => [...exts, '.mdx'],
    })
}
