/**
 * Client options
 * @public
 */
let data: Options = {
  timeout: 20 * 1000,
  reload: true,
  name: `default`,
  debug: true,
  log: true,
  path: `/__bud/hmr`,
  indicator: true,
  overlay: true,
}

/**
 * Set client option
 * @public
 */
const set = (overrides: Options) => {
  data = {...data, ...overrides}
}

/**
 * Get client option
 * @public
 */
const get = (key?: string) => (key ? data[key] : data)

/**
 * Set client options based on URL parameters
 */
const setFromParameters = (query: string): void =>
  new window.URLSearchParams(query).forEach((value, key) => {
    data[key] = value === `true` ? true : value === `false` ? false : value
  })

export {data, get, setFromParameters, set}
