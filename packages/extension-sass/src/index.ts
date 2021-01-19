import {Bud} from '@roots/bud'
import type {Module, Item} from '@roots/bud-typings'

export const setItems: Module.Register<Item> = [
  'sass',
  {
    loader: require.resolve('sass-loader'),
    options: {
      implementation: require('sass'),
    },
  },
]

export const register: Module.Register = (bud: Bud) => {
  bud.hooks.on('webpack.resolve.extensions', exts => [
    ...exts,
    '.sass',
    '.scss',
  ])

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

  bud.sequence([
    () =>
      bud.build.set('items.sass', {
        loader: require.resolve('sass-loader'),
        options: {
          implementation: require('sass'),
        },
      }),
    () =>
      bud.build.set('rules.sass', {
        test: ({store}: Bud) => store.access('patterns.sass'),
        exclude: ({store}: Bud) =>
          store.access('patterns.modules'),
        use: ({options, build}: Bud) => [
          options.is('mode', 'production')
            ? build.access('items.minicss')
            : build.access('items.style'),
          build.access('items.css'),
          build.access('items.sass'),
          build.access('items.resolveUrl'),
        ],
      }),
  ])
}
