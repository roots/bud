/**
 * Client options
 */
let data: Options = {
  debug: true,
  indicator: true,
  log: true,
  name: `@roots/bud-client`,
  overlay: true,
  path: `/bud/hot`,
  reload: true,
  timeout: 2000,
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
