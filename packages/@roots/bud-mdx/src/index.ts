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
    'webpack.resolve.extensions',
    exts => [...exts, '.mdx'],
  )

  /**
   * Add @mdx-js/loader
   */
  app.build
    .set('loaders.mdx', require.resolve('@mdx-js/loader'))
    .set('items.mdx', (app: Framework) => ({
      loader: app.build.access('loaders.mdx'),
      options: app.mdx.options,
    }))
    .set('rules.mdx', {
      test: ({store}) => store.get('patterns.mdx'),
      exclude: ({store}) => store.get('patterns.modules'),
      use: ({build}: Framework) => [
        build.access('items.babel'),
        build.access('items.mdx'),
      ],
    })
}
