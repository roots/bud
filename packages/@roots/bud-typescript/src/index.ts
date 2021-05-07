import './interface'
import {Module} from '@roots/bud-extensions'
import {typecheck} from './api'
import {Loader, Item, Rule} from '@roots/bud-build'

const extension: Module = {
  name: '@roots/bud-typescript',
  api: {
    typecheck,
  },
  boot: ({build, hooks, store}) => {
    store.set('patterns.ts', /\.(ts|tsx)$/)

    build.loaders['ts'] = new Loader(app =>
      require.resolve('ts-loader'),
    )

    build.items['ts'] = new Item({
      loader: ({build}) => build.loaders['ts'],
      options: app => ({
        transpileOnly: true,
        happyPackMode: true,
      }),
    })

    build.rules['ts'] = new Rule({
      test: ({store}) => store.get('patterns.ts'),
      exclude: ({store}) => store.get('patterns.modules'),
      use: ({build}) => [
        build.items['babel'],
        build.items['ts'],
      ],
    })

    hooks.on('build/resolve/extensions', e => [
      ...e,
      '.ts',
      '.tsx',
    ])
  },
}

export default extension
export const {name, boot, api} = extension
