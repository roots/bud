import {Configuration} from 'webpack'

interface InjectionProps {
  entrypoints: Configuration['entry']
  hotOnly: boolean
}

const injectHmr = ({
  entrypoints,
  hotOnly,
}: InjectionProps): Configuration['entry'] => {
  const endpoint = `/__webpack_hmr`
  const hotClient = `webpack-hot-middleware/client?${endpoint}`
  const hotServer = hotOnly
    ? 'webpack/hot/only-dev-server'
    : 'webpack/hot/dev-server'

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

export {injectHmr as default}
