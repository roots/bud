import './interface'
import {Bud} from '@roots/bud'
import {Webpack} from '@roots/bud-support'

export const name = '@roots/bud-sass'

export const boot: Bud.Module.Boot = (app: Bud) => {
  app.hooks.on<Webpack.Configuration['resolve']['extensions']>(
    'webpack.resolve.extensions',
    exts => [...exts, '.sass', '.scss'],
  )

  app.sequence([
    (app: Bud) => {
      global.navigator = undefined

      try {
        app.build
          .set(
            'items.sass.loader',
            require.resolve('sass-loader'),
          )
          .set(
            'items.sass.options.implementation',
            (() => require('sass'))(),
          )
          .set('items.sass.options.sourceMap', true)
          .set('items.css.options.sourceMap', true)
      } catch (err) {
        console.error(err)
        process.exit()
      }

      global.navigator = {}
    },
    (app: Bud) =>
      app.build.set('rules.sass', {
        test: ({store}: Bud) => store.get('patterns.sass'),
        exclude: ({store}: Bud) => store.get('patterns.modules'),
        use: (app: Bud) => {
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
