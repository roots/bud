/**
 * Client options
 * @public
 */
let data: Record<string, Options> = {
  [`default`]: {
    timeout: 20 * 1000,
    reload: true,
    name: `default`,
    debug: true,
    log: true,
    path: `/__bud/hmr`,
    indicator: true,
    overlay: true,
  },
}

/**
 * Get client option
 * @public
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

  data[parsedParams.name] = {...data.default, ...parsedParams}

  return data[parsedParams.name]
}

export {data, get, setFromParameters}
