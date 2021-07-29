import './interface'

import {Item, Loader, Rule} from '@roots/bud-build'
import {Module} from '@roots/bud-framework'
import {Configuration} from 'webpack'

import {typecheck} from './api'

const extension: Module = {
  name: '@roots/bud-typescript',
  api: {
    typecheck,
  },
  boot: ({build, discovery, hooks, store}) => {
    store.set('patterns.ts', /\.tsx?$/)

    build.loaders['ts'] = new Loader(
      require.resolve('ts-loader'),
    )

    build.items['ts'] = new Item({
      loader: build.loaders['ts'],
      options: {
        transpileOnly: true,
        happyPackMode: true,
      },
    })

    build.rules['ts'] = new Rule({
      test: store.get('patterns.ts'),
      exclude: store.get('patterns.modules'),
      use: ({build}) => [
        build.items['babel'],
        build.items['ts'],
      ],
    })

    hooks.on(
      'build/resolve/extensions',
      (e: Configuration['resolve']['extensions']) => [
        ...e,
        '.ts',
        '.tsx',
      ],
    )
  },
}

export default extension
export const {name, boot, api} = extension
