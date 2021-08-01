/**
 * @module @roots/bud-server
 */

import {Framework} from '@roots/bud-framework'
import * as Webpack from 'webpack'

/**
 * Inject webpack entrypoints with
 * client HMR handling script(s).
 */
declare type InjectClient = (
  app: Framework,
  injection: string[],
) => void

/**
 * Injects webpack entrypoints with HMR client scripts.
 *
 * Filters on `webpack.entry`
 */
const injectClient: InjectClient = (app, injection) => {
  const addScript = (entry: Webpack.Entry): Webpack.Entry => ({
    ...(entry
      ? Object.entries(entry).reduce(
          (entries, [name, asset]) => ({
            ...entries,
            [name]: {
              ...asset,
              import: [...(asset.import ?? []), ...injection],
            },
          }),
          {},
        )
      : {
          app: {
            import: ['index.js', ...injection],
          },
        }),
  })

  app.hooks.on('build/entry', addScript)

  app.children.every((_name: string, child: Framework) => {
    child.hooks.on('build/entry', addScript)
  })
}

/**
 * @exports injectClient
 */
export {injectClient}

/**
 * @exports InjectClient
 */
export type {InjectClient}
