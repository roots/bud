import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import presetEnv from 'postcss-preset-env'
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
          ['preset-env']: presetEnv({
            autoprefixer: {
              flexbox: 'no-2009',
            },
          }),
        }
      },
      app => app.postcss.enable(['preset-env']),
    ])
}
