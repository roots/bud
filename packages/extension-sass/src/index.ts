import {Bud} from '@roots/bud'
import {lodash as _} from '@roots/bud-support'

export const name = '@roots/bud-sass'

export const register: Bud.Module.Register = (bud: Bud) => {
  bud.hooks.on('webpack.resolve.extensions', exts => [
    ...exts,
    '.sass',
    '.scss',
  ])

  bud.sequence([
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
    () =>
      bud.build.set('rules.sass', {
        test: ({store}: Bud) => store.access('patterns.sass'),
        exclude: ({store}: Bud) =>
          store.access('patterns.modules'),
        use: ({options, build}: Bud) => [
          options.is('mode', 'production')
            ? build.get('items.minicss')
            : build.get('items.style'),
          build.get('items.css'),
          build.get('items.sass'),
          build.get('items.resolveUrl'),
        ],
      }),
  ])
}
