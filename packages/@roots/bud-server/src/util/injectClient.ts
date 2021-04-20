import {Framework} from '@roots/bud-framework'
import Webpack from 'webpack'
import {isArray} from 'lodash'

/**
 * Inject webpack entrypoints with
 * client HMR handling script(s).
 */
export declare type InjectClient = (
  app: Framework,
  injection: string[],
) => void

/**
 * Injects webpack entrypoints with HMR client scripts.
 *
 * Filters on `webpack.entry`
 */
export const injectClient: InjectClient = (app, injection) =>
  app.hooks.on(
    'entry',
    (entry: Webpack.Entry): Webpack.Entry =>
      Object.entries(entry).reduce(
        (entries, [name, assets]) => ({
          ...entries,
          [name]: [
            ...injection,
            ...(isArray(app.access(assets))
              ? app.access(assets)
              : [app.access(assets)]),
          ],
        }),
        {},
      ),
  )
