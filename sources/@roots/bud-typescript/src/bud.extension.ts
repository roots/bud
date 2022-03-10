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

  options: {transpileOnly: true},

  boot: async app => {
    app.build
      .setLoader(`ts`, require.resolve(`ts-loader`))
      .setItem(`ts`, {
        loader: `ts`,
        options: {transpileOnly: true},
      })
      .setRule(`ts`, {
        test: app.store.get(`patterns.ts`),
        include: [app.path(`src`)],
        use: [`babel`, `ts`],
      })

    app.hooks.on(`build.resolve.extensions`, ext =>
      ext.add(`.ts`).add(`.tsx`),
    )
  },
}
