import {Bud} from '@roots/bud'
import {lodash as _} from '@roots/bud-support'

export const register: Bud.Module.Register = (bud: Bud) => {
  const hasSass =
    bud.disk.glob.sync(
      ['*.scss', '*.sass', '**/*.scss', '**/*.sass'],
      {
        cwd: bud.disk.path.join(
          bud.disk.get('project').base,
          bud.options.get('src'),
        ),
      },
    ).length > 0

  if (!hasSass) {
    bud.logger.warn({hasSass, msg: 'No sass found, skipping.'})
    return
  }

  bud.hooks.on('webpack.resolve.extensions', exts => [
    ...exts,
    '.sass',
    '.scss',
  ])

  bud.sequence([
    () => {
      try {
        bud.build.set('items.sass', {
          loader: require.resolve('sass-loader'),
          options: {
            implementation: require('node-sass'),
          },
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
