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

  /**
   * Configure defaults
   */
  app.postcss
    .setPlugin(['postcss-import', require('postcss-import')])
    .setPlugin(['postcss-nested', require('postcss-nested')])
    .setPlugin([
      'postcss-custom-properties',
      require('postcss-custom-properties'),
    ])
    .setPlugin([
      'preset-env',
      presetEnv({
        autoprefixer: {
          flexbox: 'no-2009',
        },
      }),
    ])
    .enable([
      'postcss-import',
      'postcss-nested',
      'postcss-custom-properties',
      'preset-env',
    ])
}
