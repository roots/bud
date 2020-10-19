// import {ansiColors, overlayStyles} from './styles'

/**
 * Hot client/server module dependencies
 */
const client = require.resolve('webpack-hot-middleware/client')
const params = `path=/__webpack_hmr`
// const colors = encodeURIComponent(JSON.stringify(ansiColors))
// const styles = encodeURIComponent(JSON.stringify(overlayStyles))

const toInject = [
  `${client}?${params}`,
  // `${client}?${params}&ansiColors=${colors}&overlayStyles=${styles}`,
]

/**
 * Injects webpack.entry items with hot module scripts.
 */
export const injectClient: Framework.Server.InjectClient = ({
  entrypoints,
}) => {
  const prepend = (
    entrypoints: Framework.Webpack.Configuration['entry'],
  ) => {
    return typeof entrypoints === 'function'
      ? () => Promise.resolve(entrypoints()).then(prepend)
      : Object.entries(entrypoints).reduce(
          (acc, [name, scripts]) => ({
            ...acc,
            [name]: toInject.concat(scripts),
          }),
          {},
        )
  }

  return prepend(entrypoints)
}
