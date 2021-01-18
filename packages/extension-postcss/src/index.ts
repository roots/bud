import {assignPostCss} from './api'
import {Bud} from '@roots/bud'

/**
 * Types
 */
export * from './types'

/**
 * Extension name
 */
export const name = '@roots/bud-postcss'

/**
 * Register postcss RuleSet item
 */
export const setItems = (app: Bud) => {
  const options: {[key: string]: any} = {
    postcssOptions: {},
  }

  // Source rules from postcss.config.js if it exists
  if (app.disk.get('project').exists('postcss.config.js')) {
    options.config = app.disk
      .get('project')
      .get('postcss.config.js')
  }

  app.options.set('postcss', options)

  return [
    'postcss',
    app => ({
      ident: 'postcss',
      loader: require.resolve('postcss-loader'),
      options: {
        ...app.options.get('postcss'),
        postcssOptions: {
          ...app.options.get('postcss.postcssOptions'),
          plugins: [
            ...app.options.getValues(
              'postcss.postcssOptions.plugins',
            ),
          ],
        },
      },
    }),
  ]
}

/**
 * Replace default css implementation
 */
export const boot = (app: Bud) => {
  // insert loader
  app.build.set('rules.css.use', app => [
    app.options.is('mode', 'production')
      ? app.build.access('items.minicss')
      : app.build.access('items.style'),
    app.build.access('items.css'),
    app.build.access('items.postcss'),
  ])

  // assign postcss
  // and configure defaults
  assignPostCss(app)
    .postcss.addPlugin('postcss-flexbugs-fixes')
    .postcss.addPlugin('postcss-preset-env')
    .postcss.setPluginOptions('postcss-preset-env', {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      features: {
        ['custom-properties']: false,
      },
      stage: 3,
    })
    .postcss.addPlugin('postcss-nested')
}
