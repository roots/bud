import fetchExternals from './fetchExternals'
import {windowVariables} from './windowVariables'
import {ExternalsPlugin} from 'webpack'

const externalsPlugin: Partial<ExternalsPlugin> = async (
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
