import './interface'
import {Bud} from '@roots/bud'
import {PostCssConfig} from './api'
import presetEnv from 'postcss-preset-env'

/**
 * Extension name
 */
export const name = '@roots/bud-postcss'

/**
 * Replace default css implementation
 */
export const boot = (app: Bud) => {
  /**
   * PostCss configurator.
   */
  const postcss = new PostCssConfig({app})
  Object.assign(app, {postcss})

  app.build
    .set('loaders.postcss', (app: Bud) =>
      require.resolve('postcss-loader'),
    )
    .set('items.postcss', (app: Bud) => ({
      loader: app.build.access('loaders.postcss'),
      options: {
        postcssOptions: app.postcss.options,
      },
    }))
    .set('rules.css.use', ({build, isProduction}: Bud) => {
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
