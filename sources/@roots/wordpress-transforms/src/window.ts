import {
  getGlobal,
  isMapped,
  isProvided,
  isWordPressRequest,
} from '@roots/wordpress-transforms/requests'

/**
 * Transform source request to wordpress provided window variable
 *
 * @param request requested resource
 */
export const transform = (
  request: string,
): Array<string> | string | undefined => {
  if (!isProvided(request)) return

  if (isWordPressRequest(request))
    return [
      `wp`,
      request
        .replace(/^@wordpress\/(.*)$/, `$1`)
        .replace(/-(.)/g, (_, g) => g.toUpperCase()),
    ]

  if (isMapped(request)) return getGlobal(request)
}
