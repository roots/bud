import {assignPostCss} from './api'
import {Bud} from '@roots/bud'

const defaultPresetEnv = {
  autoprefixer: {
    flexbox: 'no-2009',
  },
  features: {
    ['custom-properties']: false,
  },
  stage: 3,
}

/**
 * Types
 */
import './interfaces'

/**
 * Extension name
 */
export const name = '@roots/bud-postcss'

/**
 * Replace default css implementation
 */
export const boot = (app: Bud) => {
  const hasCss =
    app.disk.glob.sync(['*.css', '**/*.css'], {
      cwd: app.disk.path.join(
        app.disk.get('project').baseDir,
        app.options.get('src'),
      ),
    }).length > 0

  if (!hasCss) {
    app.logger.warn({hasCss, msg: 'No css found, skipping.'})
    return
  }

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

  app.build.set('items.postcss', (app: Bud) => ({
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
  }))

  // insert loader
  app.build.set('rules.css.use', app => [
    app.options.is('mode', 'production')
      ? app.build.access('items.minicss')
      : app.build.access('items.style'),
    app.build.access('items.css'),
    app.build.access('items.postcss'),
  ])

  // assign postcss
  assignPostCss(app)

  // configure defaults
  app.postcss
    .addPlugin('postcss-flexbugs-fixes')
    .postcss.addPlugin('postcss-preset-env')
    .postcss.setPluginOptions(
      'postcss-preset-env',
      defaultPresetEnv,
    )
    .postcss.addPlugin('postcss-nested')
}
