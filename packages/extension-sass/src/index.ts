import './interface'
import {Bud} from '@roots/bud'

export const name = '@roots/bud-sass'

export const boot: Bud.Module.Register = (app: Bud) => {
  app.hooks.on('webpack.resolve.extensions', exts => [
    ...exts,
    '.sass',
    '.scss',
  ])

  app.sequence([
    (bud: Bud) => {
      try {
        bud.build.set('items.sass', {
          loader: require.resolve('sass-loader'),
        })
      } catch (err) {
        console.error(err)
        process.exit()
      }
    },
    (bud: Bud) =>
      bud.build.set('rules.sass', {
        test: ({store}: Bud) => store.access('patterns.sass'),
        exclude: ({store}: Bud) =>
          store.access('patterns.modules'),
        use: (app: Bud) => {
          return [
            app.isProduction
              ? app.build.access('items.minicss')
              : app.build.access('items.style'),
            app.build.access('items.css'),
            app.build.access('items.postcss'),
            app.build.access('items.sass'),
            app.build.access('items.resolveUrl'),
          ].filter(Boolean)
        },
      }),
  ])
}
