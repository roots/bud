import fetchExternals from './fetchExternals'
import {ExternalsFunctionElement} from 'webpack'

const packaged = {
  lodash: 'lodash',
  'lodash-es': 'lodash',
  jquery: 'jQuery',
  react: 'React',
  'react-dom': 'ReactDOM',
}

const externalsPlugin: ExternalsFunctionElement = async (
  _context,
  request,
  callback,
) => {
  const externalsMap = await fetchExternals()

  if (externalsMap[request] || packaged[request]) {
    const external = externalsMap[request] ?? packaged[request]
    return callback(null, external.window)
  }

  return callback()
}

export {externalsPlugin as default}
