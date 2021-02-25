import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import {Webpack} from '@roots/bud-support'

export const name = '@roots/bud-sass'

export const boot: Module.Boot = (app: Framework) => {
  app.hooks.on<Webpack.Configuration['resolve']['extensions']>(
    'webpack.resolve.extensions',
    exts => [...exts, '.sass', '.scss'],
  )

  app.sequence([
    app => {
      global.navigator = undefined

      try {
        app.build
          .set('loaders.sass', require.resolve('sass-loader'))
          .set(
            'items.sass.loader',
            app.build.get('loaders.sass'),
          )
          .set('items.sass.options', {
            implementation: (() => require('sass'))(),
            sourceMap: true,
          })
          .set('items.css.options.sourceMap', true)
      } catch (err) {
        console.error(err)
        process.exit()
      }

      global.navigator = {}
    },
    app =>
      app.build.set('rules.sass', {
        test: ({store}) => store.get('patterns.sass'),
        exclude: ({store}) => store.get('patterns.modules'),
        use: (app: Framework) => {
          return [
            app.isProduction
              ? app.build.access('items.minicss')
              : app.build.access('items.style'),
            app.build.access('items.css'),
            app.build.access('items.postcss'),
            app.build.access('items.resolveUrl'),
            app.build.access('items.sass'),
          ].filter(Boolean)
        },
      }),
  ])
}
