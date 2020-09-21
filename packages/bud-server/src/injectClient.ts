import {InjectClient} from './'

/**
 * Hot client/server module dependencies
 */
const modules = {
  hotMiddlewareClient: require.resolve(
    'webpack-hot-middleware/client',
  ),
}

const ansiColors = {
  reset: ['transparent', 'transparent'],
  black: '181818',
  red: 'ff3348',
  green: '3fff4f',
  yellow: 'ffd30e',
  blue: '169be0',
  magenta: 'f840b7',
  cyan: '0ad8e9',
  lightgrey: 'ebe7e3',
  darkgrey: '6d7891',
}

const overlayStyles = {
  background: 'rgba(255, 255, 255, 1)',
  color: 'rgba(0, 0, 0, 1)',
  lineHeight: '2.1',
  whiteSpace: 'pre',
  fontFamily: '"Fira Code", Menlo, Consolas, monospace',
  fontSize: '0.8rem',
  position: 'fixed',
  zIndex: 9999,
  overflow: 'hidden',
  padding: '2rem',
  borderRadius: '5px',
  borderColor: 'white',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  textAlign: 'left',
  transition: 'all 0.5s ease',
}

/**
 * Client endpoint
 */
const params = `path=/__webpack_hmr`

/**
 * Inject webpack entrypoints with HMR loaders.
 */
const injectClient: InjectClient = ({entrypoints}) => {
  const hotClient = `${
    modules.hotMiddlewareClient
  }?${params}&ansiColors=${encodeURIComponent(
    JSON.stringify(ansiColors),
  )}&overlayStyles=${encodeURIComponent(
    JSON.stringify(overlayStyles),
  )}`

  const toInject = [hotClient]

  const prepend = entry => {
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

export {injectClient as default}
