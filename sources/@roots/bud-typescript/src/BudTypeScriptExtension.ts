import {Item, Loader} from '@roots/bud-build'
import {Extension} from '@roots/bud-framework'
import {Configuration} from 'webpack'

import {typecheck} from './api'

interface BudTypeScriptExtension
  extends Extension.CompilerPlugin {}

const BudTypeScriptExtension: BudTypeScriptExtension = {
  name: '@roots/bud-typescript',

  api: {
    typecheck,
  },

  boot: ({build, hooks, store}) => {
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

    build.setRule('ts', {
      test: store.get('patterns.ts'),
      exclude: store.get('patterns.modules'),
      use: ({build}) => [
        build.items['babel'],
        build.items['ts'],
      ],
    })

    hooks.on(
      'build.resolve.extensions',
      (e: Configuration['resolve']['extensions']) => [
        ...e,
        '.ts',
        '.tsx',
      ],
    )
  },
}

export {BudTypeScriptExtension}
