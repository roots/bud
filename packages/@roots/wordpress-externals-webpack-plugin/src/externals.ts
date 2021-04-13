import {wpPkgs} from '@roots/bud-support'

/**
 * @todo less lazy typings
 */
export const externals = (
  {_context, request},
  callback: CallableFunction,
) =>
  wpPkgs.isProvided(request)
    ? callback(null, wpPkgs.transform(request).window)
    : callback()
