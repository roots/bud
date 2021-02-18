import './interface'
import {Bud} from '@roots/bud'

export const name = '@roots/bud-sass'

global.navigator = undefined

export const boot: Bud.Module.Register = (app: Bud) => {
  app.hooks.on('webpack.resolve.extensions', exts => [
    ...exts,
    '.sass',
    '.scss',
  ])

  app.sequence([
    (bud: Bud) => {
      try {
        bud.build
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
    (bud: Bud) =>
      bud.build.set('rules.sass', {
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
