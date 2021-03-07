import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import presetEnv from 'postcss-preset-env'
import cssnano from 'cssnano'
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
  !app.disk.get('project').has('postcss.config.js') &&
    (() => {
      app.postcss
        .setPlugin(['cssnano', cssnano({preset: 'default'})])
        .setPlugin([
          'postcss-import',
          require('postcss-import')({
            path: [
              app.store.get('locations.modules'),
              ...app.fs.glob.sync(
                app.fs.path.posix.join(
                  __dirname,
                  '../../../*/node_modules',
                ),
                {
                  onlyDirectories: true,
                },
              ),
            ],
          }),
        ])
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

      app.when(
        app.isProduction,
        ({postcss}) => {
          postcss.enabled.unshift('cssnano')
        },
        ({postcss}) =>
          postcss.enable([
            'postcss-import',
            'postcss-nested',
            'postcss-custom-properties',
            'preset-env',
          ]),
      )
    })()
}
