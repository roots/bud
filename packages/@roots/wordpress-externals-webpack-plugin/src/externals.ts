import {wpPkgs} from '@roots/bud-support'

/**
 * Externals plugin
 *
 * @internalRemarks
 * #todo - Bad typing
 *
 * @public
 */
export const externals = (
  {_context, request},
  callback: CallableFunction,
) =>
  wpPkgs.isProvided(request)
    ? callback(null, wpPkgs.transform(request).window)
    : callback()
