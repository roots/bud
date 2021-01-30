import {Bud} from '@roots/bud'
import {lodash as _} from '@roots/bud-support'

export const name = '@roots/bud-sass'

export const boot: Bud.Module.Register = (bud: Bud) => {
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
        use: ({options, build}: Bud) => {
          const postCss = build.access('items.postcss')

          postCss.options.postcssOptions.plugins = Object.values(
            postCss.options.postcssOptions.plugins,
          )

          return [
            options.is('mode', 'production')
              ? build.access('items.minicss')
              : build.access('items.style'),
            build.access('items.css'),
            postCss ?? false,
            build.access('items.sass'),
            build.access('items.resolveUrl'),
          ].filter(Boolean)
        },
      }),
  ])
}
