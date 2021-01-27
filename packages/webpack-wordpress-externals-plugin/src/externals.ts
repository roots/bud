import {
  ExternalsFunctionElement,
  ExternalsFunctionCallback,
} from 'webpack'
import {wpPkgs} from '@roots/bud-support'

export const externals: ExternalsFunctionElement = async (
  _context: any,
  request: any,
  callback: ExternalsFunctionCallback,
) =>
  wpPkgs.isProvided(request)
    ? callback(null, wpPkgs.transform(request).window)
    : callback()
