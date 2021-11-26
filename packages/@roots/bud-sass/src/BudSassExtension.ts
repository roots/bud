import {Item, Loader, Rule} from '@roots/bud-build'
import type {Extension} from '@roots/bud-framework'

export interface BudSassExtension extends Extension.Module {}

export const BudSassExtension: BudSassExtension = {
  name: '@roots/bud-sass',

  register: async ({hooks, build}) => {
    build.loaders.sass = new Loader(
      require.resolve('sass-loader'),
    )

    build.items.sass = new Item({
      loader: ({build}) => build.loaders.sass,
      options: app => ({
        implementation: (() => {
          try {
            const sass = require('sass')
            return sass
          } catch (e) {
            app.error(e)
          }
        })(),
        sourceMap: true,
      }),
    })

    build.rules.sass = new Rule({
      test: app => app.store.get('patterns.sass'),
      exclude: app => app.store.get('patterns.modules'),
      use: ({build, isProduction}) =>
        Array.from(
          new Set([
            isProduction
              ? build.items.minicss
              : build.items.style,
            build.items.css,
            build.items.postcss ?? undefined,
            build.items['resolve-url'],
            build.items.sass,
          ]),
        ).filter(Boolean),
    })

    hooks.on(
      'build.resolve.extensions',
      (extensions: string[]) => [
        ...new Set([...extensions, '.scss']),
      ],
    )
  },
}
