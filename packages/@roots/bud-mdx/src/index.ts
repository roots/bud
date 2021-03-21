import './interface'
import {Framework} from '@roots/bud-framework'
import {Module, Webpack} from '@roots/bud-typings'
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

  /**
   * Add mdx regex to patterns store
   */
  app.store.set('patterns.mdx', /\.mdx$/)

  /**
   * Resolve mdx extension
   */
  app.hooks.on<Webpack.Configuration['resolve']['extensions']>(
    'webpack/resolve/extensions',
    exts => [...exts, '.mdx'],
  )

  /**
   * Add @mdx-js/loader
   */
  app.publish({
    'loaders/mdx': () => require.resolve('@mdx-js/loader'),
    'items/mdx': () => ({
      loader: app.subscribe('items/mdx/loader'),
      options: app.subscribe('items/mdx/options'),
    }),
    'items/mdx/loader': () => app.subscribe('loaders/mdx'),
    'items/mdx/options': () => app.mdx.options,
    'rules/mdx': () => ({
      test: ({store}) => store.get('patterns.mdx'),
      exclude: ({store}) => store.get('patterns.modules'),
      use: ({subscribe}: Framework) => [
        subscribe('items/babel'),
        subscribe('items/mdx'),
      ],
    }),
  })
}
