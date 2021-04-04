import {wpPkgs} from '@roots/bud-support'

/**
 * @todo less lazy typings
 */
export const externals = async (
  _context: any,
  request: any,
  callback: CallableFunction,
) =>
  wpPkgs.isProvided(request)
    ? callback(null, wpPkgs.transform(request).window)
    : callback()
