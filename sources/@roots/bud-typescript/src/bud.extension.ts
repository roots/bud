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
    app.hooks.on('build.resolve.extensions', ext =>
      ext.add('.ts').add('.tsx'),
    )

    app.build
      .setLoader('ts', require.resolve('ts-loader'))
      .setItem('ts', {
        loader: 'ts',
        options: app =>
          app.extensions.get('@roots/bud-typescript').options.all(),
      })
      .setRule('ts', {
        test: /(jsx?)|(tsx?)/,
        include: app => [app.path('@src')],
      })

    app.build.rules.ts.setUse(['babel', 'ts'])
    app.build.rules.js.setUse(['babel', 'ts'])
  },
}
