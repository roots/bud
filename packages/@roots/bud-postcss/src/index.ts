import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import {PostCssConfig} from './api'
import presetEnv from 'postcss-preset-env'

/**
 * Extension name
 */
export const name: Module['name'] = '@roots/bud-postcss'

/**
 * Replace default css implementation
 */
export const boot: Module['boot'] = (app: Framework) => {
  /**
   * PostCss configurator.
   */
  const postcss = new PostCssConfig({app})
  Object.assign(app, {postcss})

  app.build
    .set('loaders.postcss', (app: Framework) =>
      require.resolve('postcss-loader'),
    )
    .set('items.postcss', (app: Framework) => ({
      loader: app.build.access('loaders.postcss'),
      options: {
        postcssOptions: app.postcss.options,
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

  // configure defaults
  app.postcss
    .setPlugin('postcss-flexbugs-fixes')
    .setPlugin([
      'preset-env',
      presetEnv({
        autoprefixer: {
          flexbox: 'no-2009',
        },
      }),
    ])
    .setPlugin('postcss-nested')
    .setPlugin('postcss-import')
}
