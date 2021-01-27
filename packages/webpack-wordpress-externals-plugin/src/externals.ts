import {wpPkgs} from '@roots/bud-support'
import {
  ExternalsFunctionElement,
  ExternalsFunctionCallback,
} from 'webpack'

const externals: ExternalsFunctionElement = async (
  _context: any,
  request: any,
  callback: ExternalsFunctionCallback,
) => {
  if (wpPkgs.isProvided(request)) {
    return callback(null, wpPkgs.transform(request).window)
  }

  return callback()
}

export {externals}
