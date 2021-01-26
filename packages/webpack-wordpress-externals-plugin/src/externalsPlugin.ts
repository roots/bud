import fetchExternals from './fetchExternals'
import {
  ExternalsFunctionElement,
  ExternalsFunctionCallback,
} from 'webpack'

const externalsPlugin: ExternalsFunctionElement = async (
  _context: any,
  request: any,
  callback: ExternalsFunctionCallback,
) => {
  const externals = fetchExternals()

  if (externals[request]) {
    return callback(null, {
      this: externals[request].window,
    })
  }

  return callback()
}

export {externalsPlugin as default}
