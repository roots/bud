import fetchExternals from './fetchExternals'
import {ExternalsFunctionElement} from 'webpack'

const externalsPlugin: ExternalsFunctionElement = async (
  _context,
  request,
  callback,
) => {
  const externalsMap = await fetchExternals()

  if (externalsMap[request]) {
    return callback(null, {
      this: externalsMap[request].window,
    })
  }

  return callback()
}

export {externalsPlugin as default}
