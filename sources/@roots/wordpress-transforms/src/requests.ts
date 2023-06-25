type Handle = string
type Global = string
type RequestMap = Map<string, [Global, Handle]>

/**
 * Packages in the `@wordpress` namespace which are not provided
 */
export const omitted = [`@wordpress/icons`, `@wordpress/interface`]

/**
 * Map of request strings to WordPress window variables and enqueue_scripts handles
 */
export const requestMap: RequestMap = new Map([
  [`@babel/runtime/regenerator`, [`regeneratorRuntime`, `wp-polyfill`]],
  [`jquery`, [`jQuery`, `jquery`]],
  [`lodash-es`, [`lodash`, `lodash`]],
  [`lodash`, [`lodash`, `lodash`]],
  [`react-dom`, [`ReactDOM`, `react-dom`]],
  [
    `react-refresh/runtime`,
    [`ReactRefreshRuntime`, `wp-react-refresh-runtime`],
  ],
  [`react`, [`React`, `react`]],
])

export const isMapped = (request: string): boolean =>
  requestMap.has(normalize(request))

export const isOmitted = (request: string): boolean =>
  omitted.includes(normalize(request))

export const getGlobal = (request: string): string =>
  requestMap.get(normalize(request))[0]

export const getHandle = (request: string): string =>
  requestMap.get(normalize(request))[1]

export const isProvided = (request: string): boolean => {
  if (isOmitted(request)) return false
  if (isWordPressRequest(request)) return true
  if (isMapped(request)) return true
  return false
}

export const isWordPressRequest = (request: string): boolean =>
  request.includes(`@wordpress`)

export const normalize = (request: string): string => {
  if (request.includes(`react-refresh/runtime`))
    request = `react-refresh/runtime`

  return request
}
