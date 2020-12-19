import fetchExternals from './fetchExternals'
import {ExternalsFunctionElement} from 'webpack'
import {windowVariables} from './windowVariables'

const externalsPlugin: ExternalsFunctionElement = async (
  _context,
  request,
  callback,
) => {
  const externalsMap = await fetchExternals()

  if (externalsMap[request] || windowVariables[request]) {
    return callback(
      null,
      externalsMap[request] ?? windowVariables[request],
    )
  }

  return callback()
}

export {externalsPlugin as default}
