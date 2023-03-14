/**
 * Client options
 */
let data: Options = {
  timeout: 2000,
  reload: true,
  name: `@roots/bud-client`,
  debug: true,
  log: true,
  indicator: true,
  overlay: true,
  path: `/bud/hot`,
}

/**
 * Get client option
 */
const get = (name?: string, key?: string) =>
  key ? data[name][key] : data[name]

/**
 * Set client data based on URL parameters
 */
const setFromParameters = (query: string): Options => {
  let parsedParams: Partial<Options> = {}

  new window.URLSearchParams(query).forEach((value, key) => {
    parsedParams[key] =
      value === `true` ? true : value === `false` ? false : value
  })

  data[parsedParams.name] = {...data, ...parsedParams}

  return data[parsedParams.name]
}

export {data, get, setFromParameters}
