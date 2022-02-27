import {Item, Loader} from '@roots/bud-build'
import {Extension} from '@roots/bud-framework'
import {Options} from 'ts-loader'
import {Configuration} from 'webpack'

import {typecheck} from './bud.typecheck'

/**
 * @public
 */
export interface BudTypeScriptExtension
  extends Extension.Module<Partial<Options>> {
  name: '@roots/bud-typescript'
  api: {typecheck: typecheck}
  options: Partial<Options>
  boot: Extension.Module['boot']
}

/**
 * @public
 */
export const BudTypeScriptExtension: BudTypeScriptExtension = {
  name: '@roots/bud-typescript',

  api: {
    typecheck,
  },

  options: {
    transpileOnly: true,
  },

  boot: ({build, hooks, store}) => {
    store.set('patterns.ts', /\.tsx?$/)

    build.loaders['ts'] = new Loader(require.resolve('ts-loader'))

    build.items['ts'] = new Item({
      loader: build.loaders['ts'],
      options: app =>
        app.extensions.get('@roots/bud-typescript').options.all(),
    })

    build.setRule('ts', {
      test: store.get('patterns.ts'),
      exclude: store.get('patterns.modules'),
      use: ({build}) => [build.items['babel'], build.items['ts']],
    })

    hooks.on(
      'build.resolve.extensions',
      (e: Configuration['resolve']['extensions']) => [...e, '.ts', '.tsx'],
    )
  },
}
