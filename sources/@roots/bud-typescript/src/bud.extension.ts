import {Extension} from '@roots/bud-framework'
import {Options} from 'ts-loader'

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

  api: {typecheck},

  options: {
    transpileOnly: true,
  },

  boot: ({build, hooks, store}) => {
    store.set('patterns.ts', /\.tsx?$/)
    build
      .setLoader('ts-loader', require.resolve('ts-loader'))
      .setItem('ts', {
        loader: build.loaders.ts,
        options: ({extensions}) =>
          extensions.get('@roots/bud-typescript').options.all(),
      })
      .setRule('ts', {
        test: store.get('patterns.ts'),
        exclude: store.get('patterns.modules'),
        use: [`babel`, `ts`],
      })

    hooks.on('build.resolve.extensions', ext => ext.add('.ts').add('.tsx'))
  },
}
