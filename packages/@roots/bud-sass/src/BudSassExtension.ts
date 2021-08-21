import {Item, Loader, Rule} from '@roots/bud-build'
import type {Module} from '@roots/bud-framework'
import resolve from 'resolve-cwd'

interface BudSassExtension extends Module {}

const BudSassExtension: BudSassExtension = {
  name: '@roots/bud-sass',

  boot: ({hooks, build, error}) => {
    try {
      resolve('sass')
    } catch {
      error(
        "sass can't be found. Run `bud init`",
        'Peer dependency missing',
      )

      return
    }

    build.loaders['sass'] = new Loader(resolve('sass-loader'))

    build.items['sass'] = new Item({
      loader: app => app.build.loaders['sass'],
      options: () => ({
        implementation: (() => require(resolve('sass')))(),
        sourceMap: true,
      }),
    })

    build.rules['sass'] = new Rule({
      test: app => app.store.get('patterns.sass'),
      exclude: app => app.store.get('patterns.modules'),
      use: app =>
        Array.from(
          new Set([
            app.isProduction
              ? app.build.items['minicss']
              : app.build.items['style'],
            app.build.items['css'],
            app.build.items['sass'],
            app.build.items['resolve-url'],
          ]),
        ).filter(Boolean),
    })

    hooks.on('build/resolve/extensions', (exts: string[]) => [
      ...exts,
      '.scss',
    ])
  },
}

export {BudSassExtension}
