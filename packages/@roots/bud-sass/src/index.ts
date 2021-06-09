import './interface'
import {Module} from '@roots/bud-framework'
import {Loader, Item, Rule} from '@roots/bud-build'

const extension: Module = {
  name: '@roots/bud-sass',
  boot: ({hooks, build, discovery, error}) => {
    try {
      require.resolve('sass')
    } catch (err) {
      error(
        "sass can't be found. Run `bud init`",
        'Peer dependency missing',
      )
    }
    build.loaders['sass'] = new Loader(
      require.resolve('sass-loader'),
    )

    build.items['sass'] = new Item({
      loader: app => app.build.loaders['sass'],
      options: app => ({
        implementation: (() =>
          require(require.resolve('sass')))(),
        sourceMap: true,
      }),
    })

    build.rules['sass'] = new Rule({
      test: app => app.store.get('patterns.sass'),
      exclude: app => app.store.get('patterns.modules'),
      use: app => [
        app.isProduction
          ? app.build.items['minicss']
          : app.build.items['style'],
        app.build.items['css'],
        app.build.items['postcss'],
        app.build.items['sass'],
        app.build.items['resolve-url'],
      ],
    })

    hooks.on('build/resolve/extensions', (exts: string[]) => [
      ...exts,
      '.scss',
    ])
  },
}

export default extension
export const {name, boot} = extension
