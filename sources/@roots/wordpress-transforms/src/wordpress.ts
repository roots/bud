import type {RequestMap} from '@roots/wordpress-transforms'

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
  [`lodash`, [`lodash`, `lodash`]],
  [`react-dom`, [`ReactDOM`, `react-dom`]],
  [
    `react-refresh/runtime`,
    [`ReactRefreshRuntime`, `wp-react-refresh-runtime`],
  ],
  [`react`, [`React`, `react`]],
])

export const isLibrary = (request: string): boolean =>
  requestMap.has(normalize(request))

export const isOmitted = (request: string): boolean =>
  omitted.includes(normalize(request))

export const getGlobal = (request: string): string => {
  const result = requestMap.get(normalize(request))
  if (!result?.[0]) throw new Error(`No global found for ${request}`)
  return result[0]
}

export const getScriptDependencyHandle = (request: string): string => {
  const result = requestMap.get(normalize(request))
  if (!result?.[1])
    throw new Error(`No script dependency handle found for ${request}`)
  return result[1]
}

export const isProvided = (request: string): boolean => {
  if (isOmitted(request)) return false
  if (isWordPressRequest(request)) return true
  if (isLibrary(request)) return true
  return false
}

export const isWordPressRequest = (request: string): boolean =>
  request.includes(`@wordpress`) && !omitted.includes(request)

export const normalize = (request: string): string => {
  if (request.includes(`@babel/runtime/regenerator`))
    request = `@babel/runtime/regenerator`

  if (request.includes(`react-refresh/runtime`))
    request = `react-refresh/runtime`

  if (request === `lodash-es`) request = `lodash`

  return request
}
