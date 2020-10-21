import {lodash as _} from '@roots/bud-support'

// import {ansiColors, overlayStyles} from './styles'

const toInject =
  'webpack-hot-middleware/client/?path=/__webpack_hmr&reload=true'

/**
 * Injects webpack.entry items with hot module scripts.
 */
export const injectClient: Framework.Server.InjectClient = (
  entrypoints: Framework.Webpack.Entry,
) => {
  const prepend = (entrypoints: Framework.Webpack.Entry) => {
    return Object.entries(entrypoints).reduce(
      (acc, [name, entry]) => ({
        ...acc,
        [name]: [
          toInject,
          ...(_.isArray(entry) ? entry : [entry]),
        ],
      }),
      {},
    )
  }

  return prepend(entrypoints)
}
