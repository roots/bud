import './interface'
import {Bud} from '@roots/bud'
import {PostCssConfig} from './api'

import postEnv from 'postcss-preset-env'

/**
 * Preset env
 */
const defaultPresetEnv = {
  autoprefixer: {
    flexbox: 'no-2009',
  },
}

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
  const postcssConfig = new PostCssConfig({app})
  Object.assign(app, {postcss: postcssConfig})

  app.build.set('items.postcss', (app: Bud) => ({
    loader: require.resolve('postcss-loader'),
    options: {
      postcssOptions: app.postcss.getConfig(),
    },
  }))

  // configure defaults
  app.postcss.setConfig({
    plugins: [
      'postcss-flexbugs-fixes',
      postEnv(defaultPresetEnv),
      'postcss-nested',
      'postcss-import',
    ],
  })

  app.build.set(
    'rules.css.use',
    ({build, isProduction}: Bud) => {
      return [
        isProduction
          ? build.access('items.minicss')
          : build.access('items.style'),
        build.access('items.css'),
        build.access('items.postcss'),
        build.access('items.resolveUrl'),
      ]
    },
  )
}
