import {InjectClient} from './'

/**
 * Hot client/server module dependencies
 */
const modules = {
  hotMiddlewareClient: require.resolve(
    'webpack-hot-middleware/client',
  ),
  hotOnlyDevServer: require.resolve(
    'webpack/hot/only-dev-server',
  ),
  hotDevServer: require.resolve('webpack/hot/dev-server'),
}

/**
 * Client endpoint
 */
const endpoint = `/__webpack_hmr`

/**
 * Inject webpack entrypoints with HMR loaders.
 */
const injectClient: InjectClient = ({entrypoints, hotOnly}) => {
  const hotClient = `${modules.hotMiddlewareClient}?${endpoint}`

  const hotServer: string = hotOnly
    ? modules.hotOnlyDevServer
    : modules.hotDevServer

  const toInject = [hotServer, hotClient]

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
