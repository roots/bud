import {
  getHandle,
  isMapped,
  isProvided,
  isWordPressRequest,
} from '@roots/wordpress-transforms/requests'

/**
 * Transform source request to enqueue_scripts handle
 *
 * @param request requested resource
 */
export const transform = (request: string): string | undefined => {
  if (!isProvided(request)) return

  if (isWordPressRequest(request))
    return [
      `wp`,
      request.replace(/^@wordpress\/(.*)$/, (_m, g) => g),
    ].join(`-`)

  if (isMapped(request)) return getHandle(request)
}
