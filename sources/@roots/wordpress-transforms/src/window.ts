import {
  getGlobal,
  isLibrary,
  isProvided,
  isWordPressRequest,
} from '@roots/wordpress-transforms/wordpress'

/**
 * Transform source request to wordpress provided window variable
 *
 * @param request requested resource
 */
export const transform = (
  request: string,
): Array<string> | string | undefined => {
  if (!isProvided(request)) return

  if (isLibrary(request)) return getGlobal(request)

  if (isWordPressRequest(request))
    return [
      `wp`,
      request
        .replace(/^@wordpress\/(.*)$/, `$1`)
        .replace(/-(.)/g, (_, g) => g.toUpperCase()),
    ]
}
