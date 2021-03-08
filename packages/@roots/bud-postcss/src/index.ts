import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import {PostCssConfig} from './api'

/**
 * Extension name
 */
export const name: Module['name'] = '@roots/bud-postcss'

/**
 * Extension dependencies
 */
export const devDependencies: Module['devDependencies'] = [
  'postcss',
]

/**
 * Extension config
 */
export const api: Module['api'] = (app: Framework) => ({
  postcss: new PostCssConfig({app}),
})

/**
 * Replace default css implementation
 */
export const boot: Module['boot'] = (app: Framework) => {
  const postcssModulePaths = () => [
    app.store.get('locations.modules'),
    ...app.discovery.getEntries().map(([k, v]) => {
      return app.fs.path.posix.join(v.path, 'node_modules')
    }),
  ]

  app.build
    .set('loaders.postcss', (app: Framework) =>
      require.resolve('postcss-loader'),
    )
    .set('items.postcss', (app: Framework) => ({
      loader: app.build.access('loaders.postcss'),
      options: {
        postcssOptions: app.postcss.options,
        sourceMap: app.store.enabled('options.devtool'),
      },
    }))
    .set('rules.css.use', ({build, isProduction}: Framework) => {
      return [
        isProduction
          ? build.access('items.minicss')
          : build.access('items.style'),
        build.access('items.css'),
        build.access('items.postcss'),
        build.access('items.resolveUrl'),
      ]
    })

  /**
   * Configure defaults
   */
  !app.disk.get('project').has('postcss.config.js') &&
    app.sequence([
      app => {
        app.postcss.plugins = {
          ['postcss-import']: require('postcss-import')({
            path: postcssModulePaths(),
          }),
          ['postcss-nested']: require('postcss-nested'),
          ['postcss-custom-properties']: require('postcss-custom-properties'),
        }
      },
      app =>
        app.postcss.enable([
          'postcss-import',
          'postcss-nested',
          'postcss-custom-properties',
        ]),
    ])
}
