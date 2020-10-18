import {ansiColors, overlayStyles} from './styles'

/**
 * Hot client/server module dependencies
 */
const client = require.resolve('webpack-hot-middleware/client')
const params = `path=/__webpack_hmr`
const colors = encodeURIComponent(JSON.stringify(ansiColors))
const styles = encodeURIComponent(JSON.stringify(overlayStyles))

const toInject = [
  `${client}?${params}&ansiColors=${colors}&overlayStyles=${styles}`,
]

/**
 * Injects webpack.entry items with hot module scripts.
 */
export const injectClient: Framework.Server.InjectClient = ({
  entrypoints,
}) => {
  const prepend = (entry: unknown) => {
    if (typeof entry === 'function') {
      return () => Promise.resolve(entry()).then(prepend)
    }

    if (typeof entry === 'object' && !Array.isArray(entry)) {
      const entryClone = {}

      Object.keys(entry).forEach(key => {
        entryClone[key] = toInject.concat(entry[key])
      })

      return entryClone
    }
  }

  return prepend(entrypoints)
}
